import { useState } from 'react';
import resumeService from '../services/resumeService';

function ResumeUpload({ setMatchResult, setIsLoading }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!file) {
  //     setError('Please select a resume file');
  //     return;
  //   }
    
  //   if (!jobDescription) {
  //     setError('Please enter a job description');
  //     return;
  //   }
    
  //   setIsLoading(true);
  //   setError('');
    
  //   try {
  //     // For demo purposes, simulating API call
  //     setTimeout(() => {
  //       const demoResult = {
  //         matchingScore: 0.85,
  //         fitPercentage: 85,
  //         summary: "The candidate is a strong match for the position with relevant experience in required technologies.",
  //         strengths: ["Strong technical skills", "Relevant experience", "Cultural fit"],
  //         weaknesses: ["Missing some specific experience", "Could improve communication skills"],
  //         extractedSkills: ["JavaScript", "React", "Node.js", "TypeScript", "AWS"],
  //         relevantKeywords: ["frontend", "development", "software engineer", "JavaScript"]
  //       };
        
  //       setMatchResult(demoResult);
  //       setIsLoading(false);
  //     }, 2000);
      
  //     // Actual API call (commented out for now)
  //     // const response = await resumeService.uploadResume(file, jobDescription);
  //     // setMatchResult(response.data);
  //   } catch (err) {
  //     console.error(err);
  //     setError('Failed to process resume. Please try again.');
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!file) {
    setError('Please select a resume file');
    return;
  }
  
  if (!jobDescription) {
    setError('Please enter a job description');
    return;
  }
  
  setIsLoading(true);
  setError('');
  
  try {
    const response = await resumeService.uploadResume(file, jobDescription);
    setMatchResult(response);
  } catch (err) {
    console.error(err);
    setError('Failed to process resume. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Resume (PDF)
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Job Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="5"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter the job description here..."
          ></textarea>
        </div>
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Analyze Resume
        </button>
      </form>
    </div>
  );
}

export default ResumeUpload;
