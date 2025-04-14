import { useState } from 'react';
import resumeService from '../services/resumeService';

function JobDescription({ setMatchResult, setIsLoading }) {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!resumeText) {
  //     setError('Please enter resume text');
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
  //         matchingScore: 0.75,
  //         fitPercentage: 75,
  //         summary: "The candidate shows promise but lacks some key qualifications.",
  //         strengths: ["Good technical foundation", "Some relevant experience"],
  //         weaknesses: ["Limited experience with required technologies", "No indication of team leadership"],
  //         extractedSkills: ["JavaScript", "HTML", "CSS", "Basic React"],
  //         relevantKeywords: ["frontend", "junior", "web development"]
  //       };
        
  //       setMatchResult(demoResult);
  //       setIsLoading(false);
  //     }, 2000);
      
  //     // Actual API call (commented out for now)
  //     // const response = await resumeService.matchResume(resumeText, jobDescription);
  //     // setMatchResult(response.data);
  //   } catch (err) {
  //     console.error(err);
  //     setError('Failed to process resume. Please try again.');
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!resumeText) {
    setError('Please enter resume text');
    return;
  }
  
  if (!jobDescription) {
    setError('Please enter a job description');
    return;
  }
  
  setIsLoading(true);
  setError('');
  
  try {
    const response = await resumeService.matchResume(resumeText, jobDescription);
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
      <h2 className="text-xl font-bold mb-4">Text Input</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Resume Text
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="6"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste the resume text here..."
          ></textarea>
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
          Analyze Match
        </button>
      </form>
    </div>
  );
}

export default JobDescription;
