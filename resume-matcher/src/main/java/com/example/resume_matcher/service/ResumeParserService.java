package com.example.resume_matcher.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeParserService {

    /**
     * Parse a single PDF file to extract text and format it according to the template
     */
    public String parseResumeFromPDF(MultipartFile file) throws IOException {
        System.out.println("Starting to parse PDF file: " + file.getOriginalFilename());

        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            System.out.println("PDF loaded successfully. Number of pages: " + document.getNumberOfPages());

            PDFTextStripper stripper = new PDFTextStripper();
            String extractedText = stripper.getText(document);

            System.out.println("Extracted text length: " + extractedText.length());
            System.out.println("First 200 characters: " + extractedText.substring(0, Math.min(200, extractedText.length())));

            // Format the extracted text according to the template
            String formattedResume = formatResumeText(extractedText);
            return formattedResume;
        } catch (Exception e) {
            System.err.println("Error parsing PDF: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * Format extracted resume text into the specified template
     */
    private String formatResumeText(String extractedText) {
        // Initialize the formatted resume with default structure
        StringBuilder formattedResume = new StringBuilder();

        // Extract name (assuming it's at the top of the resume)
        String name = extractFirstLine(extractedText);
        formattedResume.append(name).append("\n");

        // Extract title and experience summary
        String title = extractTitle(extractedText);
        if (title != null) {
            formattedResume.append(title).append("\n");
        }

        // Extract skills
        String skills = extractSkills(extractedText);
        if (skills != null) {
            formattedResume.append("Skills: ").append(skills).append("\n");
        }

        // Extract experience
        String experience = extractExperience(extractedText);
        if (experience != null) {
            formattedResume.append("Experience:\n").append(experience);
        }

        return formattedResume.toString();
    }

    /**
     * Extract the first line from text (assumed to be the name)
     */
    private String extractFirstLine(String text) {
        String[] lines = text.split("\\n");
        for (String line : lines) {
            line = line.trim();
            if (!line.isEmpty()) {
                return line;
            }
        }
        return "Name Not Found";
    }

    /**
     * Extract title and years of experience
     */
    private String extractTitle(String text) {
        // Look for common job titles followed by experience
        Pattern pattern = Pattern.compile("(?i)(software|senior|junior|lead|full.?stack|front.?end|back.?end|developer|engineer|architect|programmer).*?([0-9]+)\\s*(?:years?|yrs?)\\s*(?:of)?\\s*experience", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            // Try to construct a title with experience summary
            return matcher.group(0);
        }

        // Fallback: look for just a job title
        Pattern titlePattern = Pattern.compile("(?i)(software|senior|junior|lead|full.?stack|front.?end|back.?end)\\s*(developer|engineer|architect|programmer)", Pattern.CASE_INSENSITIVE);
        matcher = titlePattern.matcher(text);

        if (matcher.find()) {
            return matcher.group(0);
        }

        return "Professional with experience in software development";
    }

    /**
     * Extract skills from the resume
     */
    private String extractSkills(String text) {
        // Look for skills section
        Pattern pattern = Pattern.compile("(?i)\\b(skills|technologies|technical skills|proficiencies)\\b[\\s\\:]*([^\n]*(?:\n(?!experience|education|projects)[^\n]*)*)", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            String skillsSection = matcher.group(2).trim();
            // Clean up and normalize the skills
            skillsSection = skillsSection.replaceAll("\\s+", " ")
                    .replaceAll("•|\\*|\\-|,\\s*", ", ")
                    .replaceAll("\\s*,\\s*", ", ")
                    .replaceAll("^\\s*,\\s*", "")
                    .replaceAll("\\s*,\\s*$", "");
            return skillsSection;
        }

        // Fallback: extract common programming languages and technologies
        StringBuilder skills = new StringBuilder();
        String[] commonSkills = {"Java", "Python", "C++", "JavaScript", "HTML", "CSS", "SQL",
                "React", "Angular", "Vue", "Node.js", "Spring", "Hibernate",
                "Docker", "Kubernetes", "AWS", "Azure", "Git", "REST", "GraphQL",
                "Microservices", "CI/CD", "Agile", "Scrum"};

        for (String skill : commonSkills) {
            if (text.contains(skill)) {
                if (skills.length() > 0) {
                    skills.append(", ");
                }
                skills.append(skill);
            }
        }

        return skills.length() > 0 ? skills.toString() : "Technical skills";
    }

    /**
     * Extract work experience from the resume
     */
    private String extractExperience(String text) {
        StringBuilder experience = new StringBuilder();

        // Try to find the experience section
        Pattern sectionPattern = Pattern.compile("(?i)\\b(experience|work experience|employment|work history)\\b([\\s\\S]*?)(?=\\b(education|skills|projects|certification|achievements|languages|references)\\b|$)", Pattern.CASE_INSENSITIVE);
        Matcher sectionMatcher = sectionPattern.matcher(text);

        if (sectionMatcher.find()) {
            String experienceSection = sectionMatcher.group(2).trim();

            // Now try to extract individual job entries
            Pattern jobPattern = Pattern.compile("(?i)(?:^|\\n)\\s*[-•]?\\s*(.+?)\\s*(?:at|\\@)\\s*([^\\(\\n]+)\\s*(?:\\(([0-9]{4}[-–—](?:[0-9]{4}|present|current|now))\\))?", Pattern.CASE_INSENSITIVE);
            Matcher jobMatcher = jobPattern.matcher(experienceSection);

            while (jobMatcher.find()) {
                String position = jobMatcher.group(1).trim();
                String company = jobMatcher.group(2).trim();
                String period = jobMatcher.group(3) != null ? jobMatcher.group(3).trim() : "";

                experience.append("- ").append(position).append(" at ").append(company);
                if (!period.isEmpty()) {
                    experience.append(" (").append(period).append(")");
                }
                experience.append("\n");

                // Extract responsibilities for this job (everything until the next job or the end)
                int endOfJob = experienceSection.indexOf(jobMatcher.group(0)) + jobMatcher.group(0).length();
                int nextJob = Integer.MAX_VALUE;

                Matcher nextJobMatcher = jobPattern.matcher(experienceSection);
                if (nextJobMatcher.find(endOfJob)) {
                    nextJob = nextJobMatcher.start();
                }

                if (nextJob > endOfJob) {
                    String responsibilities = experienceSection.substring(endOfJob, Math.min(nextJob, experienceSection.length())).trim();

                    // Try to extract bullet points
                    String[] bullets = responsibilities.split("(?:\\n\\s*[-•]|\\n\\n)");
                    for (String bullet : bullets) {
                        bullet = bullet.trim();
                        if (!bullet.isEmpty()) {
                            experience.append("  ").append(bullet).append("\n");
                        }
                    }
                }
            }

            // If no jobs were found using the pattern, include the raw experience section
            if (experience.length() == 0) {
                // Clean up the experience text by removing extra whitespace
                String[] lines = experienceSection.split("\\n");
                for (String line : lines) {
                    line = line.trim();
                    if (!line.isEmpty()) {
                        if (line.startsWith("-") || line.startsWith("•")) {
                            experience.append(line).append("\n");
                        } else {
                            experience.append("- ").append(line).append("\n");
                        }
                    }
                }
            }
        }

        return experience.length() > 0 ? experience.toString() : "- Professional experience details not found";
    }

    /**
     * Parse multiple PDF files and return a map of filename to formatted resume text
     */
    public Map<String, String> parseMultipleResumes(MultipartFile[] files) throws IOException {
        System.out.println("Parsing multiple resumes: " + files.length + " files received");
        Map<String, String> results = new HashMap<>();

        for (MultipartFile file : files) {
            if (file.getOriginalFilename().toLowerCase().endsWith(".pdf")) {
                System.out.println("Processing file: " + file.getOriginalFilename());
                String formattedResume = parseResumeFromPDF(file);
                results.put(file.getOriginalFilename(), formattedResume);
            } else {
                System.out.println("Skipping non-PDF file: " + file.getOriginalFilename());
            }
        }

        System.out.println("Completed parsing " + results.size() + " PDF files");
        return results;
    }
}