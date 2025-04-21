import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ResumeAnalysis() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  // const handleUploadSubmit = async (e) => {
  
  //   e.preventDefault();
    
  //   if (!file) {
  //     setError('Please select a resume file');
  //     return;
  //   }
    
  //   if (!jobDescription) {
  //     setError('Please enter a job description');
  //     return;
  //   }
    
  //   setIsAnalyzing(true);
  //   setError('');
    
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('jobDescription', jobDescription);
    
  //   try {
  //     console.log('Sending file:', file.name, 'size:', file.size);
  //     console.log('Job description length:', jobDescription.length);
      
  //     // Removed credentials: 'include' to fix CORS issue
  //     const response = await fetch('http://localhost:8080/api/resume-matching/upload', {
  //       method: 'POST',
  //       body: formData
  //     });
      
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error('Server error:', response.status, errorText);
  //       throw new Error(`Server error: ${response.status}. ${errorText}`);
  //     }
      
  //     const data = await response.json();
  //     console.log("API response:", data);
  //     setResult(data);
  //   } catch (err) {
  //     console.error("Error uploading resume:", err);
  //     setError('Failed to analyze resume: ' + (err.message || 'Unknown error'));
  //   } finally {
  //     setIsAnalyzing(false);
  //   }
  // };

//   const handleUploadSubmit = async (e) => {
//   e.preventDefault();
  
//   if (!file) {
//     setError('Please select a resume file');
//     return;
//   }
  
//   if (!jobDescription) {
//     setError('Please enter a job description');
//     return;
//   }
  
//   setIsAnalyzing(true);
//   setError('');
  
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('jobDescription', jobDescription);
  
//   try {
//     // Test a simple GET endpoint first to see if connectivity works
//     console.log("Testing server connection...");
//     try {
//       const testResponse = await fetch('http://localhost:8080/api/resume-matching/resumes');
//       console.log("Test connection response:", testResponse.status);
//     } catch (testErr) {
//       console.log("Test connection failed:", testErr);
//     }
    
//     // Try a different approach for the file upload
//     const response = await fetch('http://localhost:8080/api/resume-matching/upload', {
//       method: 'POST',
//       // Don't set any content type headers - browser will set it with correct boundary
//       body: formData
//     });
    
//     console.log("Response received:", response.status);
    
//     if (!response.ok) {
//       let errorMessage;
//       try {
//         const errorText = await response.text();
//         console.error('Error response text:', errorText);
//         errorMessage = errorText;
//       } catch (e) {
//         errorMessage = `HTTP error ${response.status}`;
//       }
//       throw new Error(`Server error: ${response.status}. ${errorMessage}`);
//     }
    
//     const data = await response.json();
//     console.log("API response:", data);
//     setResult(data);
//   } catch (err) {
//     console.error("Error uploading resume:", err);
//     setError('Failed to analyze resume: ' + (err.message || 'Unknown error'));
//   } finally {
//     setIsAnalyzing(false);
//   }
// };
//   const handleUploadSubmit = async (e) => {
//   e.preventDefault();
  
//   if (!file) {
//     setError('Please select a resume file');
//     return;
//   }
  
//   if (!jobDescription) {
//     setError('Please enter a job description');
//     return;
//   }
  
//   setIsAnalyzing(true);
//   setError('');
  
//   try {
//     // Create FormData with EXACT keys matching your Spring Boot controller parameters
//     const formData = new FormData();
//     formData.append('file', file); // Must match @RequestParam("file")
//     formData.append('jobDescription', jobDescription); // Must match @RequestParam("jobDescription")
    
//     console.log('Submitting file:', file.name, 'size:', file.size, 'type:', file.type);
    
//     const response = await fetch('http://localhost:8080/api/resume-matching/upload', {
//       method: 'POST',
//       // Don't set Content-Type header - browser will add it with boundary for FormData
//       body: formData
//     });
    
//     console.log('Response status:', response.status);
    
//     if (!response.ok) {
//       let errorMessage = `Server error: ${response.status}`;
//       try {
//         const errorText = await response.text();
//         console.error('Error details:', errorText);
//         if (errorText) errorMessage += `. ${errorText}`;
//       } catch (e) {
//         console.error('Could not read error response', e);
//       }
//       throw new Error(errorMessage);
//     }
    
//     const data = await response.json();
//     console.log('Success! API response:', data);
//     setResult(data);
//   } catch (err) {
//     console.error('Error details:', err);
//     setError('Failed to analyze resume: ' + err.message);
//   } finally {
//     setIsAnalyzing(false);
//   }
// };
  const handleUploadSubmit = async (e) => {
  e.preventDefault();
  
  if (!file) {
    setError('Please select a resume file');
    return;
  }
  
  if (!jobDescription) {
    setError('Please enter a job description');
    return;
  }
  
  setIsAnalyzing(true);
  setError('');
  
  try {
    // Create a new form data object
    const formData = new FormData();
    
    // Add the file with the exact parameter name expected by the backend
    formData.append('file', file);
    
    // Add the job description
    formData.append('jobDescription', jobDescription);
    
    // Log what we're sending
    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: file.size,
    });
    
    // Try sending to a different endpoint first (text-based endpoint)
    try {
      console.log('Trying text-based endpoint as fallback...');
      const textResponse = await fetch('http://localhost:8080/api/resume-matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: 'Sample resume text for testing', // Just a test
          jobDescription: jobDescription
        })
      });
      
      if (textResponse.ok) {
        console.log('Text-based endpoint works!');
      } else {
        console.log('Text-based endpoint also failed:', textResponse.status);
      }
    } catch (textErr) {
      console.log('Error with text endpoint:', textErr);
    }
    
    // Make the actual file upload request
    console.log('Making file upload request...');
    const response = await fetch('http://localhost:8080/api/resume-matching/upload', {
      method: 'POST',
      body: formData,
    });
    
    // Log the response details
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      let errorMessage;
      try {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        errorMessage = errorText;
      } catch (e) {
        errorMessage = 'Could not read error details';
      }
      throw new Error(`Server error: ${response.status}. ${errorMessage}`);
    }
    
    const data = await response.json();
    console.log('Success! Response data:', data);
    setResult(data);
    
  } catch (err) {
    console.error('Error details:', err);
    setError('Failed to analyze resume: ' + err.message);
  } finally {
    setIsAnalyzing(false);
  }
};
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    
    if (!resumeText) {
      setError('Please enter resume text');
      return;
    }
    
    if (!jobDescription) {
      setError('Please enter a job description');
      return;
    }
    
    setIsAnalyzing(true);
    setError('');
    
    try {
      console.log('Sending resume text, length:', resumeText.length);
      console.log('Job description length:', jobDescription.length);
      
      // Removed credentials: 'include' to fix CORS issue
      const response = await fetch('http://localhost:8080/api/resume-matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription: jobDescription
        })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', response.status, errorText);
        throw new Error(`Server error: ${response.status}. ${errorText}`);
      }
      
      const data = await response.json();
      console.log("API response:", data);
      setResult(data);
    } catch (err) {
      console.error("Error analyzing resume text:", err);
      setError('Failed to analyze resume: ' + (err.message || 'Unknown error'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-3 sm:px-4 lg:px-5">
          <div className="flex justify-between h-12">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-lg font-bold text-blue-600">Resume Matcher</h1>
              </div>
              <div className="hidden sm:ml-4 sm:flex sm:space-x-4">
                <Link to="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium">
                  Dashboard
                </Link>
                <Link to="/dashboard/resume-analysis" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium">
                  Resume Analysis
                </Link>
                <Link to="/dashboard/analytics" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium">
                  Analytics
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 rounded text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-full mx-auto py-4 px-3 sm:px-4 lg:px-5">
        <div className="px-2 py-3 sm:px-0">
          <div className="mb-3">
            <h1 className="text-lg font-bold text-gray-900">Resume Analysis</h1>
            <p className="mt-1 text-xs text-gray-600">
              Upload a resume and match it against a job description
            </p>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`w-1/2 py-2 px-1 text-center border-b-2 font-medium text-xs ${
                    activeTab === 'upload'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  File Upload
                </button>
                <button
                  onClick={() => setActiveTab('text')}
                  className={`w-1/2 py-2 px-1 text-center border-b-2 font-medium text-xs ${
                    activeTab === 'text'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Text Input
                </button>
              </nav>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-2 m-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-4 w-4 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs text-red-600">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4">
              {activeTab === 'upload' ? (
                <form onSubmit={handleUploadSubmit}>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-700">Resume File</label>
                    <div 
                      className="mt-1 flex justify-center px-4 pt-3 pb-4 border-2 border-gray-300 border-dashed rounded-md"
                      style={{minHeight: '100px'}}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <div className="space-y-1 text-center">
                        <svg 
                          className="mx-auto h-7 w-7 text-gray-400" 
                          stroke="currentColor" 
                          fill="none" 
                          viewBox="0 0 48 48"
                        >
                          <path 
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                          />
                        </svg>
                        <div className="flex text-xs text-gray-600">
                          <label 
                            htmlFor="file-upload" 
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              className="sr-only"
                              onChange={handleFileChange}
                              accept=".pdf,.docx,.doc"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, or DOCX up to 10MB</p>
                      </div>
                    </div>
                    {file && (
                      <p className="mt-1 text-xs text-gray-500">
                        Selected file: {file.name}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="job-description" className="block text-xs font-medium text-gray-700">
                      Job Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="job-description"
                        name="job-description"
                        rows="4"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-xs border border-gray-300 rounded-md"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center py-1.5 px-3 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </div>
                      ) : (
                        'Analyze Resume'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleTextSubmit}>
                  <div className="mb-4">
                    <label htmlFor="resume-text" className="block text-xs font-medium text-gray-700">
                      Resume Text
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="resume-text"
                        name="resume-text"
                        rows="6"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-xs border border-gray-300 rounded-md"
                        placeholder="Paste the resume content here..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="job-description-text" className="block text-xs font-medium text-gray-700">
                      Job Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="job-description-text"
                        name="job-description-text"
                        rows="4"
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-xs border border-gray-300 rounded-md"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center py-1.5 px-3 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Analyzing...
                        </div>
                      ) : (
                        'Analyze Resume'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {result && (
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-3 py-3 sm:px-4 border-b border-gray-200">
                <h3 className="text-base leading-6 font-medium text-gray-900">
                  Analysis Results
                </h3>
              </div>
              
              <div className="px-3 py-3 sm:p-4">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 relative">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#EEEEEE"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={result.matchingScore > 0.7 ? '#10B981' : result.matchingScore > 0.4 ? '#3B82F6' : '#EF4444'}
                        strokeWidth="3"
                        strokeDasharray={`${result.matchingScore * 100}, 100`}
                      />
                      <text x="18" y="20.5" className="fill-current text-gray-700 text-sm font-bold" textAnchor="middle">
                        {Math.round(result.matchingScore * 100)}%
                      </text>
                    </svg>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Summary</h4>
                  <p className="text-xs text-gray-600">{result.summary}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1 text-green-600">Strengths</h4>
                    <ul className="list-disc pl-5 space-y-0.5">
                      {result.strengths && result.strengths.map((strength, index) => (
                        <li key={index} className="text-xs text-gray-600">{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1 text-red-600">Areas for Improvement</h4>
                    <ul className="list-disc pl-5 space-y-0.5">
                      {result.weaknesses && result.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-xs text-gray-600">{weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Skills Identified</h4>
                  <div className="flex flex-wrap gap-1">
                    {result.extractedSkills && result.extractedSkills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Relevant Keywords</h4>
                  <div className="flex flex-wrap gap-1">
                    {result.relevantKeywords && result.relevantKeywords.map((keyword, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalysis;
