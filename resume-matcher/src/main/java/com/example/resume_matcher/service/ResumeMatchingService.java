package com.example.resume_matcher.service;

import com.example.resume_matcher.dto.ResumeMatchingRequest;
import com.example.resume_matcher.dto.ResumeMatchingResponse;
import com.example.resume_matcher.dto.ollama.OllamaResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResumeMatchingService {

    @Autowired
    private OllamaService ollamaService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public ResumeMatchingResponse matchResumeToJob(ResumeMatchingRequest request) {
        String prompt = buildPrompt(request.getResume(), request.getJobDescription());
        OllamaResponse ollamaResponse = ollamaService.generateResponse(prompt);

        return parseOllamaResponse(ollamaResponse.getResponse());
    }

    private String buildPrompt(String resume, String jobDescription) {
        return String.format("""
            You are an expert AI Resume Matcher. Analyze the following resume and job description:
            
            RESUME:
            %s
            
            JOB DESCRIPTION:
            %s
            
            Please provide the following in valid JSON format:
            1. A matching score from 0.0 to 1.0
            2. A brief summary of the match
            3. A list of strengths (the candidate's qualifications that match the job)
            4. A list of weaknesses (areas where the candidate may lack required qualifications)
            5. A fit percentage (0-100)
            6. A list of extracted skills from the resume
            7. A list of extracted experience items relevant to the job
            8. A list of relevant keywords found in both the resume and job description
            
            Format your response as a valid JSON object with the following structure:
            {
                "matchingScore": 0.75,
                "summary": "The candidate is a good match for...",
                "strengths": ["Strength 1", "Strength 2"...],
                "weaknesses": ["Weakness 1", "Weakness 2"...],
                "fitPercentage": 75.0,
                "extractedSkills": ["Skill 1", "Skill 2"...],
                "extractedExperience": ["Experience 1", "Experience 2"...],
                "relevantKeywords": ["Keyword 1", "Keyword 2"...]
            }
            
            Your response should only contain the JSON object and nothing else.
            """, resume, jobDescription);
    }

    private ResumeMatchingResponse parseOllamaResponse(String responseContent) {
        try {
            // First, try to parse directly
            return objectMapper.readValue(responseContent, ResumeMatchingResponse.class);
        } catch (Exception e) {
            // If direct parsing fails, try to extract JSON from the text response
            try {
                String jsonContent = extractJsonFromText(responseContent);
                return objectMapper.readValue(jsonContent, ResumeMatchingResponse.class);
            } catch (Exception ex) {
                // If all parsing attempts fail, create a fallback response
                ResumeMatchingResponse fallbackResponse = new ResumeMatchingResponse();
                fallbackResponse.setMatchingScore(0.0);
                fallbackResponse.setSummary("Failed to parse AI response. Raw response: " + responseContent);
                return fallbackResponse;
            }
        }
    }

    private String extractJsonFromText(String text) {
        int startIndex = text.indexOf('{');
        int endIndex = text.lastIndexOf('}') + 1;

        if (startIndex >= 0 && endIndex > startIndex) {
            return text.substring(startIndex, endIndex);
        }

        throw new IllegalArgumentException("No valid JSON found in the response");
    }
}