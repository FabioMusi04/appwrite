// Navbar.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { UserAuthContext } from '../components/authcontext';
import { FaUsers } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { GrNotes } from "react-icons/gr";
import { FcAbout } from "react-icons/fc";

const Navbar: React.FC = () => {
  const context = useContext(UserAuthContext);
  const { user, logout } = context!;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400">
            E-Commerce
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Products</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FcAbout/></Link>
            {user && user.labels.includes('admin') && (
              <>
              <Link to="/handleproducts" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FiPackage /></Link>
              <Link to="/handleusers" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FaUsers /></Link>
              <Link to="/handleorders" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><GrNotes/></Link> 
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
            <FaShoppingCart className="h-6 w-6" />
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Profile</Link>
              <button
                onClick={() => logout()}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >Log Out</button>
            </>
          ) : (
            <Link to="/auth" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Login</Link>
          )}
        </div>
        <div className="md:hidden">
          <button className="focus:outline-none">
            {/* Add a hamburger icon or similar for mobile */}
            <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
