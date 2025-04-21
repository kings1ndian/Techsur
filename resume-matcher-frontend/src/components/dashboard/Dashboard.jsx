import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        return parsed.username;
      } catch (e) {
        return 'User';
      }
    }
    return 'User';
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
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
                <Link to="/dashboard" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium">
                  Dashboard
                </Link>
                <Link to="/dashboard/resume-analysis" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium">
                  Resume Analysis
                </Link>
                <Link to="/dashboard/analytics" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-xs font-medium">
                  Analytics
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-600 mr-2">{username}</span>
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
        <div className="px-3 py-4 sm:px-0">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900">Welcome, {username}</h1>
            <p className="mt-1 text-xs text-gray-600">
              Get started by analyzing a resume or viewing your analytics
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg" style={{maxWidth: '280px'}}>
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-2" style={{width: '32px', height: '32px'}}>
                    <svg className="text-white" style={{width: '20px', height: '20px'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base leading-6 font-medium text-gray-900">Resume Analysis</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Upload a resume and match it against job descriptions
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/dashboard/resume-analysis"
                    className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
                  >
                    Analyze Resume
                    <svg className="ml-1 -mr-0.5" style={{width: '12px', height: '12px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg" style={{maxWidth: '280px'}}>
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-2" style={{width: '32px', height: '32px'}}>
                    <svg className="text-white" style={{width: '20px', height: '20px'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base leading-6 font-medium text-gray-900">Analytics</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      View insights and statistics from your resume matches
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to="/dashboard/analytics"
                    className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-green-500"
                  >
                    View Analytics
                    <svg className="ml-1 -mr-0.5" style={{width: '12px', height: '12px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg" style={{maxWidth: '280px'}}>
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-2" style={{width: '32px', height: '32px'}}>
                    <svg className="text-white" style={{width: '20px', height: '20px'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base leading-6 font-medium text-gray-900">Account Settings</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Manage your account and preferences
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    className="inline-flex items-center px-3 py-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-purple-500"
                    onClick={() => alert('Settings coming soon!')}
                  >
                    View Settings
                    <svg className="ml-1 -mr-0.5" style={{width: '12px', height: '12px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white shadow sm:rounded-lg">
            <div className="px-3 py-4 sm:p-4">
              <h2 className="text-base font-medium text-gray-900">Recent Activity</h2>
              <div className="mt-3">
                <div className="flex justify-center items-center h-16 text-gray-500 text-xs">
                  <p>No recent activity. Start by analyzing a resume!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
