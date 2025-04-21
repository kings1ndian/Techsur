import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

function Analytics() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    resumes: [],
    jobDescriptions: [],
    // Add more data fields as needed
  });
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    // Fetch analytics data when component mounts
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Fetch resumes
        const resumesResponse = await fetch('http://localhost:8080/api/resume-matching/resumes');
        
        // Fetch job descriptions
        const jobDescriptionsResponse = await fetch('http://localhost:8080/api/resume-matching/job-descriptions');
        
        if (!resumesResponse.ok || !jobDescriptionsResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const resumes = await resumesResponse.json();
        const jobDescriptions = await jobDescriptionsResponse.json();
        
        setData({
          resumes,
          jobDescriptions,
        });
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Prepare data for charts
  const prepareScoreDistributionData = () => {
    // This would usually come from your backend with real data
    // For now we'll generate some sample data
    const scoreRanges = [
      { name: '0-20%', count: 2 },
      { name: '21-40%', count: 5 },
      { name: '41-60%', count: 8 },
      { name: '61-80%', count: 12 },
      { name: '81-100%', count: 6 }
    ];
    return scoreRanges;
  };
  
  const prepareSkillsData = () => {
    // This would come from your backend with real data
    // For now we'll generate some sample data
    return [
      { name: 'JavaScript', value: 15 },
      { name: 'React', value: 12 },
      { name: 'Node.js', value: 8 },
      { name: 'Java', value: 10 },
      { name: 'Python', value: 7 }
    ];
  };
  
  const prepareTimeSeriesData = () => {
    // Generate sample time-series data for resume uploads
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      name: month,
      uploads: Math.floor(Math.random() * 10) + 1
    }));
  };

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
            <h1 className="text-lg font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-1 text-xs text-gray-600">
              View insights from your resume matching activities
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-2 mb-4">
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

          {isLoading ? (
            <div className="flex justify-center py-12">
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-blue-500">
                      <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-900">Total Resumes</h2>
                      <p className="text-2xl font-semibold">{data.resumes.length || 0}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-green-500">
                      <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-900">Job Descriptions</h2>
                      <p className="text-2xl font-semibold">{data.jobDescriptions.length || 0}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-purple-500">
                      <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-sm font-medium text-gray-900">Avg. Match Score</h2>
                      <p className="text-2xl font-semibold">72%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Charts row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Match Score Distribution Chart */}
                <div className="bg-white shadow rounded-lg p-4">
                  <h2 className="text-sm font-medium text-gray-900 mb-4">Match Score Distribution</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={prepareScoreDistributionData()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={10} />
                        <YAxis fontSize={10} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#3B82F6" name="Number of Resumes" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Top Skills Chart */}
                <div className="bg-white shadow rounded-lg p-4">
                  <h2 className="text-sm font-medium text-gray-900 mb-4">Top Skills Found</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prepareSkillsData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {prepareSkillsData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Activity Over Time Chart */}
              <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-sm font-medium text-gray-900 mb-4">Resume Uploads Over Time</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={prepareTimeSeriesData()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="uploads" fill="#10B981" name="Resume Uploads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h2 className="text-sm font-medium text-gray-900">Recent Activities</h2>
                </div>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Description</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Score</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.resumes.length > 0 ? (
                          data.resumes.slice(0, 5).map((resume, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">{resume.filename}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">Job Description {index + 1}</td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {Math.floor(Math.random() * 30) + 70}%
                                </span>
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">{new Date(resume.uploadedAt).toLocaleDateString()}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="px-4 py-2 text-center text-xs text-gray-500">No data available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

export default Analytics;
