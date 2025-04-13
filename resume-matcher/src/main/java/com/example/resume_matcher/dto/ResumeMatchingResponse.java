package com.example.resume_matcher.dto;

import java.util.List;

public class ResumeMatchingResponse {
    private double matchingScore;
    private String summary;
    private List<String> strengths;
    private List<String> weaknesses;
    private double fitPercentage;
    private List<String> extractedSkills;
    private List<String> extractedExperience;
    private List<String> relevantKeywords;

    public double getMatchingScore() {
        return matchingScore;
    }

    public void setMatchingScore(double matchingScore) {
        this.matchingScore = matchingScore;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(List<String> weaknesses) {
        this.weaknesses = weaknesses;
    }

    public double getFitPercentage() {
        return fitPercentage;
    }

    public void setFitPercentage(double fitPercentage) {
        this.fitPercentage = fitPercentage;
    }

    public List<String> getExtractedSkills() {
        return extractedSkills;
    }

    public void setExtractedSkills(List<String> extractedSkills) {
        this.extractedSkills = extractedSkills;
    }

    public List<String> getExtractedExperience() {
        return extractedExperience;
    }

    public void setExtractedExperience(List<String> extractedExperience) {
        this.extractedExperience = extractedExperience;
    }

    public List<String> getRelevantKeywords() {
        return relevantKeywords;
    }

    public void setRelevantKeywords(List<String> relevantKeywords) {
        this.relevantKeywords = relevantKeywords;
    }
}