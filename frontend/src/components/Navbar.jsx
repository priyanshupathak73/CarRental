import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CarFront, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <CarFront className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Car Rental</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/cars" className="text-gray-700 hover:text-blue-600 font-medium">Browse Cars</Link>
            
            {user ? (
              <>
                <Link to={user.role === 'admin' ? "/dashboard" : "/my-bookings"} className="text-gray-700 hover:text-blue-600 font-medium">
                  {user.role === 'admin' ? 'Dashboard' : 'My Bookings'}
                </Link>
                <div className="flex items-center space-x-4 ml-4">
                  <div className="flex items-center space-x-1 text-gray-700">
                    <UserIcon className="h-5 w-5" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
