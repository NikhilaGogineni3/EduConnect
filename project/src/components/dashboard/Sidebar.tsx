import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  PieChart, 
  User, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Timetable', path: '/dashboard/timetable', icon: Calendar },
    { name: 'Courses', path: '/dashboard/courses', icon: BookOpen },
    { name: 'Progress', path: '/dashboard/progress', icon: PieChart },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">EduConnect</h1>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-200 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      >
        <div 
          className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-200 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-600">EduConnect</h1>
          </div>
          <nav className="mt-5">
            <ul className="space-y-1 px-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center p-3 rounded-md text-sm font-medium
                        ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}
                      `}
                      onClick={closeMobileMenu}
                    >
                      <Icon size={18} className="mr-3" />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
              <li className="mt-8">
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="flex items-center w-full p-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.profilePicture || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'}
                  alt={user?.name || 'User'}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white lg:pt-5">
        <div className="px-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">EduConnect</h1>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto pt-5">
          <nav className="flex-1 px-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors
                    ${isActive(item.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={18} className="mr-3" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>
        <div className="px-3 py-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={user?.profilePicture || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'}
                alt={user?.name || 'User'}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="mt-4 flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;