package com.example.resume_matcher.service;

import com.example.resume_matcher.dto.ollama.OllamaRequest;
import com.example.resume_matcher.dto.ollama.OllamaResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OllamaService {

    @Value("${ollama.url}")
    private String ollamaUrl;

    @Value("${ollama.model}")
    private String ollamaModel;

    private final RestTemplate restTemplate = new RestTemplate();

    public OllamaResponse generateResponse(String prompt) {
        String apiUrl = ollamaUrl + "/api/generate";

        OllamaRequest request = new OllamaRequest();
        request.setModel(ollamaModel);
        request.setPrompt(prompt);

        return restTemplate.postForObject(apiUrl, request, OllamaResponse.class);
    }
}