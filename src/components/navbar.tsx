import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUsers, FaShoppingBag } from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { GrNotes } from 'react-icons/gr';
import { FcAbout } from 'react-icons/fc';
import { IoMdPerson, IoMdLogOut } from 'react-icons/io';
import { TbPackages } from 'react-icons/tb';
import { UserAuthContext } from '../components/authcontext';
import ToggleTheme from './toggletheme';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FaShoppingBag className="h-6 w-6" /></Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FcAbout className="h-6 w-6" /></Link>
            <Link to="/myorders" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><TbPackages className="h-6 w-6" /></Link>
            {user && user?.labels?.includes('admin') && (
              <>
                <Link to="/handleproducts" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FiPackage className="h-6 w-6" /></Link>
                <Link to="/handleusers" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FaUsers className="h-6 w-6" /></Link>
                <Link to="/handleorders" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><GrNotes className="h-6 w-6" /></Link>
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
              <Link to="/me" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><IoMdPerson className="h-6 w-6" /></Link>
              <button
                onClick={() => logout()}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <IoMdLogOut className="h-6 w-6" />
              </button>
            </>
          ) : (
            <Link to="/auth" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">Login</Link>
          )}

          <ToggleTheme />

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
          >
            <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pt-4 pb-4">
          <Link to="/products" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FaShoppingBag className="inline h-5 w-5 mr-2" />Products</Link>
          <Link to="/about" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FcAbout className="inline h-5 w-5 mr-2" />About</Link>
          <Link to="/myorders" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><TbPackages className="inline h-5 w-5 mr-2" />My Orders</Link>
          
          {user && user?.labels?.includes('admin') && (
            <>
              <Link to="/handleproducts" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FiPackage className="inline h-5 w-5 mr-2" />Manage Products</Link>
              <Link to="/handleusers" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><FaUsers className="inline h-5 w-5 mr-2" />Manage Users</Link>
              <Link to="/handleorders" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"><GrNotes className="inline h-5 w-5 mr-2" />Manage Orders</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
