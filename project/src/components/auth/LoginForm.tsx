import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { defaultCredentials } from '../../data/mockData';

interface LoginFormProps {
  role: 'student' | 'faculty';
}

const LoginForm: React.FC<LoginFormProps> = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    const success = await login(email, password, role);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleDemoLogin = async () => {
    const demoCredentials = role === 'student' 
      ? defaultCredentials.student 
      : defaultCredentials.faculty;
    
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    
    const success = await login(demoCredentials.email, demoCredentials.password, role);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Demo login failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}
        
        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={`Enter your ${role} email`}
          autoComplete="email"
        />
        
        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link to={`/signup/${role}`} className="font-medium text-blue-600 hover:text-blue-500">
              Create new account
            </Link>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Forgot password?
            </a>
          </div>
        </div>
        
        <div className="pt-2">
          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or
            </span>
          </div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          fullWidth
          onClick={handleDemoLogin}
          disabled={isLoading}
        >
          Use Demo {role === 'student' ? 'Student' : 'Faculty'} Account
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;