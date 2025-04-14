import { useState } from 'react';
import ResumeUpload from './ResumeUpload';
import JobDescription from './JobDescription';
import MatchResult from './MatchResult';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('upload');
  const [matchResult, setMatchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Resume Matcher Dashboard</h1>
      
      <div className="flex mb-4 border-b">
        <button
          className={`py-2 px-4 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload Resume
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'text' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('text')}
        >
          Text Input
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow">
            {activeTab === 'upload' ? (
              <ResumeUpload setMatchResult={setMatchResult} setIsLoading={setIsLoading} />
            ) : (
              <JobDescription setMatchResult={setMatchResult} setIsLoading={setIsLoading} />
            )}
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Match Results</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <MatchResult result={matchResult} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
