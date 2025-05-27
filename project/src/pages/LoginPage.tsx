import { useParams } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { role = 'student' } = useParams<{ role: 'student' | 'faculty' }>();
  const isStudent = role === 'student';
  
  const title = isStudent ? 'Student Login' : 'Faculty Login';
  const subtitle = isStudent 
    ? 'Access your courses, timetable, and progress' 
    : 'Manage your courses and student information';
  
  return (
    <AuthLayout title={title} subtitle={subtitle} role={role as 'student' | 'faculty'}>
      <LoginForm role={role as 'student' | 'faculty'} />
    </AuthLayout>
  );
};

export default LoginPage;