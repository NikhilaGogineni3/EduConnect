import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { GraduationCap, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  role: 'student' | 'faculty';
}

const AuthLayout = ({ children, title, subtitle, role }: AuthLayoutProps) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          {role === 'student' ? (
            <GraduationCap className="h-12 w-12 text-blue-600" />
          ) : (
            <BookOpen className="h-12 w-12 text-teal-600" />
          )}
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {role === 'student' 
              ? 'Are you a faculty member?' 
              : 'Are you a student?'}
            {' '}
            <a 
              href={role === 'student' ? '/login/faculty' : '/login/student'} 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {role === 'student' 
                ? 'Login as faculty' 
                : 'Login as student'}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;