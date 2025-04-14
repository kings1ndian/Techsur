package com.example.resume_matcher.controller;

import com.example.resume_matcher.dto.ResumeMatchingRequest;
import com.example.resume_matcher.dto.ResumeMatchingResponse;
import com.example.resume_matcher.model.JobDescription;
import com.example.resume_matcher.model.Resume;
import com.example.resume_matcher.repository.JobDescriptionRepository;
import com.example.resume_matcher.repository.ResumeRepository;
import com.example.resume_matcher.service.ResumeMatchingService;
import com.example.resume_matcher.service.ResumeParserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/resume-matching")
@CrossOrigin(origins = "*") // For testing purposes, restrict this in production
public class ResumeMatchingController {

    @Autowired
    private ResumeMatchingService resumeMatchingService;

    @Autowired
    private ResumeParserService resumeParserService;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private JobDescriptionRepository jobDescriptionRepository;

    @PostMapping("/upload-multiple")
    public ResponseEntity<?> uploadMultipleResumes(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("jobDescription") String jobDescriptionText,
            @RequestParam(value = "jobTitle", required = false, defaultValue = "Job Position") String jobTitle) throws IOException {

        if (files.length == 0) {
            return ResponseEntity.badRequest().body("No files uploaded");
        }

        // Save job description
        JobDescription jobDescription = new JobDescription();
        jobDescription.setTitle(jobTitle);
        jobDescription.setContent(jobDescriptionText);
        jobDescription.setCreatedAt(LocalDateTime.now());
        jobDescriptionRepository.save(jobDescription);

        // Process each resume
        List<Map<String, Object>> results = new ArrayList<>();
        Map<String, String> parsedResumes = resumeParserService.parseMultipleResumes(files);

        for (Map.Entry<String, String> entry : parsedResumes.entrySet()) {
            String filename = entry.getKey();
            String resumeText = entry.getValue();

            // Save resume
            Resume resume = new Resume();
            resume.setFilename(filename);
            resume.setContent(resumeText);
            resume.setUploadedAt(LocalDateTime.now());
            resumeRepository.save(resume);

            // Match resume to job description
            ResumeMatchingRequest request = new ResumeMatchingRequest();
            request.setResume(resumeText);
            request.setJobDescription(jobDescriptionText);

            ResumeMatchingResponse matchResponse = resumeMatchingService.matchResumeToJob(request);

            // Create result object
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("filename", filename);
            resultMap.put("resumeId", resume.getId());
            resultMap.put("matchResult", matchResponse);

            results.add(resultMap);
        }

        return ResponseEntity.ok(results);
    }

    @PostMapping("/upload")
    public ResponseEntity<ResumeMatchingResponse> matchResumeFromFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobDescription") String jobDescription) throws IOException {

        String resumeText = resumeParserService.parseResumeFromPDF(file);

        // Save resume to database
        Resume resume = new Resume();
        resume.setFilename(file.getOriginalFilename());
        resume.setContent(resumeText);
        resume.setUploadedAt(LocalDateTime.now());
        resumeRepository.save(resume);

        ResumeMatchingRequest request = new ResumeMatchingRequest();
        request.setResume(resumeText);
        request.setJobDescription(jobDescription);

        ResumeMatchingResponse response = resumeMatchingService.matchResumeToJob(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ResumeMatchingResponse> matchResume(@RequestBody ResumeMatchingRequest request) {
        ResumeMatchingResponse response = resumeMatchingService.matchResumeToJob(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/resumes")
    public ResponseEntity<List<Resume>> getAllResumes() {
        return ResponseEntity.ok(resumeRepository.findAll());
    }

    @GetMapping("/job-descriptions")
    public ResponseEntity<List<JobDescription>> getAllJobDescriptions() {
        return ResponseEntity.ok(jobDescriptionRepository.findAll());
    }
}