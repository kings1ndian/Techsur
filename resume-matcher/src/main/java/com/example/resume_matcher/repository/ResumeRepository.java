package com.example.resume_matcher.repository;

import com.example.resume_matcher.model.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
}