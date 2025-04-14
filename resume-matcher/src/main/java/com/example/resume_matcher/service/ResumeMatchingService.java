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
        You are an expert AI Resume Matcher with a critical eye for detail.
         Analyze the following resume and job description with precision, always compare the 
         resume only with job description , it should match based on its semantics keyword only
         if there are no or less matches please return a bad score always both are text
         
        If the job description starts with none or resume is not given
        give 0 and return there is no match
        
        RESUME:
        %s
        
        JOB DESCRIPTION:
        %s
        
        Your task is to perform an extremely detailed and critical evaluation:
        
        Rule 1. Assign a matching score from 0.0 to 1.0:
           - 0.0-0.2: If the job description is "none" or not given
           - 0.3-0.4: good skills, minimal alignment
           - 0.5-0.6: very good match with some relevant skills but significant gaps
           - 0.7-0.8: perfect match with most key requirements met
           - 0.9-1.0: Exceptional match with nearly all requirements met
        
        Rule 2. Provide a detailed fitPercentage (0-100) that matches your score multiplied by 100
        
        Rule 3. Create a comprehensive analysis including:
           - An honest summary highlighting match quality
           - Specific strengths where the candidate meets requirements
           - Clear weaknesses and gaps between the candidate and job requirements
           - Precise skills extracted from the resume
           - Relevant experience items from the resume
           - Keywords found in both documents
       
        
        Format your response as a valid JSON object with the following structure:
        {
            "matchingScore": [0.0-1.0 value],
            "summary": "Detailed assessment...",
            "strengths": ["Strength 1", "Strength 2"...],
            "weaknesses": ["Weakness 1", "Weakness 2"...],
            "fitPercentage": [0-100 value],
            "extractedSkills": ["Skill 1", "Skill 2"...],
            "extractedExperience": ["Experience 1", "Experience 2"...],
            "relevantKeywords": ["Keyword 1", "Keyword 2"...]
        }
        
        Your response must only contain the JSON object and nothing else.
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