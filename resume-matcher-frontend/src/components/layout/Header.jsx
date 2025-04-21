import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ sidebarOpen, setSidebarOpen, user }) {
  const [menuOpen, setMenuOpen] = useState(false); // Add state for menu visibility
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-3 sm:px-4 lg:px-5">
        <div className="flex items-center justify-between h-12">
          {/* Header: Left side */}
          <div className="flex">
            {/* Mobile menu button if needed */}
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* User menu */}
            <div className="relative inline-flex">
              <button 
                onClick={() => setMenuOpen(!menuOpen)} 
                className="inline-flex justify-center items-center group"
              >
                <div className="flex items-center truncate">
                  <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
                    {user?.username || 'User'}
                  </span>
                  <svg className="w-3 h-3 ml-1 fill-current text-gray-400" viewBox="0 0 12 12">
                    <path d="M5.9 11.4L0.7 6.2C0.4 5.9 0.4 5.4 0.7 5.1C1 4.8 1.5 4.8 1.8 5.1L6 9.3L10.2 5.1C10.5 4.8 11 4.8 11.3 5.1C11.6 5.4 11.6 5.9 11.3 6.2L6.1 11.4C5.8 11.7 5.3 11.7 5.9 11.4Z" />
                  </svg>
                </div>
              </button>
              
              {/* Important: Make this menu visible when clicked */}
              {menuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg py-1 w-48">
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
