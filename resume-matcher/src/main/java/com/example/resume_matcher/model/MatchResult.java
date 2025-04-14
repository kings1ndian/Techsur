package com.example.resume_matcher.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "match_results")
public class MatchResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;

    @ManyToOne
    @JoinColumn(name = "job_description_id")
    private JobDescription jobDescription;

    private double matchingScore;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @ElementCollection
    @CollectionTable(name = "match_strengths", joinColumns = @JoinColumn(name = "match_id"))
    @Column(name = "strength")
    private List<String> strengths;

    @ElementCollection
    @CollectionTable(name = "match_weaknesses", joinColumns = @JoinColumn(name = "match_id"))
    @Column(name = "weakness")
    private List<String> weaknesses;

    private double fitPercentage;

    @ElementCollection
    @CollectionTable(name = "match_skills", joinColumns = @JoinColumn(name = "match_id"))
    @Column(name = "skill")
    private List<String> extractedSkills;

    @ElementCollection
    @CollectionTable(name = "match_experience", joinColumns = @JoinColumn(name = "match_id"))
    @Column(name = "experience")
    private List<String> extractedExperience;

    @ElementCollection
    @CollectionTable(name = "match_keywords", joinColumns = @JoinColumn(name = "match_id"))
    @Column(name = "keyword")
    private List<String> relevantKeywords;

    private LocalDateTime createdAt;

    // Getters and setters
    // (omitted for brevity but should be included in your actual code)
}