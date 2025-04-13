package com.example.resume_matcher.controller;

import com.example.resume_matcher.dto.ResumeMatchingRequest;
import com.example.resume_matcher.dto.ResumeMatchingResponse;
import com.example.resume_matcher.service.ResumeMatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/resume-matching")
public class ResumeMatchingController {

    @Autowired
    private ResumeMatchingService resumeMatchingService;

    @PostMapping
    public ResponseEntity<ResumeMatchingResponse> matchResume(@RequestBody ResumeMatchingRequest request) {
        ResumeMatchingResponse response = resumeMatchingService.matchResumeToJob(request);
        return ResponseEntity.ok(response);
    }
}