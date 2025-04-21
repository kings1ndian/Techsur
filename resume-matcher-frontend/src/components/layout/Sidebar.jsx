// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-gray-800 text-white`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Resume Matcher</h1>
        <button 
          onClick={() => setSidebarOpen(false)} 
          className="text-gray-400 hover:text-white lg:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="py-4">
        <ul className="space-y-2 px-3">
          <li>
            <NavLink 
              to="/dashboard" 
              end
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`
              }
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/resume-analysis" 
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`
              }
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume Analysis
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/dashboard/analytics" 
              className={({ isActive }) => 
                `flex items-center px-4 py-2 rounded-lg ${isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'}`
              }
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Analytics
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar; 
