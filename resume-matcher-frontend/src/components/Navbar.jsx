import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">Resume Matcher</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Login</Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
