package com.example.resume_matcher.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI resumeMatcherOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Resume Matcher API")
                        .description("API for matching resumes to job descriptions using Ollama")
                        .version("1.0"));
    }
}