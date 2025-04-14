package com.example.resume_matcher.repository;

import com.example.resume_matcher.model.MatchResult;
import com.example.resume_matcher.model.Resume;
import com.example.resume_matcher.model.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MatchResultRepository extends JpaRepository<MatchResult, Long> {
    List<MatchResult> findByResume(Resume resume);
    List<MatchResult> findByJobDescription(JobDescription jobDescription);
}