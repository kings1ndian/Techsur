import { useState } from 'react';
import { Link } from 'react-router-dom';

function Analytics() {
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
                <Link to="/dashboard/resume-analysis" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium">
                  Resume Analysis
                </Link>
                <Link to="/dashboard/analytics" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium">
                  Analytics
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-4 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div>
                  <button 
                    type="button" 
                    className="bg-white rounded-full flex text-xs focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
                  >
                    <span className="sr-only">Open user menu</span>
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                      <span className="text-xs font-medium leading-none text-blue-700">U</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-full mx-auto py-4 px-3 sm:px-4 lg:px-5">
        <div className="px-2 py-3 sm:px-0">
          <div className="mb-3">
            <h1 className="text-lg font-bold text-gray-900">Analytics</h1>
            <p className="mt-1 text-xs text-gray-600">
              View insights from your resume matching results
            </p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-center h-40">
              <div className="text-center text-gray-500">
                <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="mt-1 text-xs">Analytics data will appear here once you've analyzed some resumes.</p>
                <Link
                  to="/dashboard/resume-analysis"
                  className="mt-3 inline-flex items-center px-2.5 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
                >
                  Analyze a Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
