import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import { Clock, Calendar, BookOpen, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from '../../components/dashboard/CourseCard';
import { Student, Faculty } from '../../types';

const HomePage = () => {
  const { user } = useAuth();
  
  // Type guards
  const isStudent = (user: any): user is Student => user?.role === 'student';
  const isFaculty = (user: any): user is Faculty => user?.role === 'faculty';
  
  if (!user) return null;

  // Get courses based on user role
  const courses = isStudent(user) 
    ? user.enrolledCourses.slice(0, 2) 
    : isFaculty(user) 
      ? user.teachingCourses.slice(0, 2) 
      : [];
  
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">
            {greeting()}, {user.name}! Welcome to your educational portal.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/dashboard/courses">
            <Button>
              {isStudent(user) ? 'View All Courses' : 'Manage Courses'}
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-l-4 border-blue-500">
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Next Class</p>
              <p className="text-xl font-semibold">10:00 AM</p>
              <p className="text-sm text-gray-600">CS101 in Room A101</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-l-4 border-green-500">
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600">Upcoming</p>
              <p className="text-xl font-semibold">2 Assignments</p>
              <p className="text-sm text-gray-600">Due this week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-l-4 border-purple-500">
          <CardContent className="flex items-center p-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600">Courses</p>
              <p className="text-xl font-semibold">
                {isStudent(user) ? user.enrolledCourses.length : isFaculty(user) ? user.teachingCourses.length : 0}
              </p>
              <p className="text-sm text-gray-600">
                {isStudent(user) ? 'Enrolled' : 'Teaching'}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {isStudent(user) && (
          <Card className="bg-amber-50 border-l-4 border-amber-500">
            <CardContent className="flex items-center p-4">
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
                <BarChart2 size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-600">Progress</p>
                <p className="text-xl font-semibold">
                  {Math.round(
                    Object.values(user.progress).reduce((sum, val) => sum + val, 0) / 
                    Object.values(user.progress).length
                  )}%
                </p>
                <p className="text-sm text-gray-600">Overall completion</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                {isStudent(user) ? 'Your Courses' : 'Courses You Teach'}
              </h2>
            </CardHeader>
            <CardContent>
              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map(course => (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      progress={isStudent(user) ? user.progress[course.id] : undefined}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {isStudent(user) 
                      ? 'You are not enrolled in any courses yet.' 
                      : 'You are not teaching any courses yet.'}
                  </p>
                  <Link to="/dashboard/courses" className="inline-block mt-3">
                    <Button>
                      {isStudent(user) ? 'Browse Courses' : 'Manage Courses'}
                    </Button>
                  </Link>
                </div>
              )}
              {courses.length > 0 && courses.length < (isStudent(user) ? user.enrolledCourses.length : isFaculty(user) ? user.teachingCourses.length : 0) && (
                <div className="mt-4 text-center">
                  <Link to="/dashboard/courses">
                    <Button variant="outline">
                      View All Courses
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-800 rounded-full p-2">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Midterm Exam</h3>
                    <p className="text-sm text-gray-600">CS101 - Tomorrow, 9:00 AM</p>
                    <p className="text-sm text-gray-600">Room B202</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-green-100 text-green-800 rounded-full p-2">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Assignment Due</h3>
                    <p className="text-sm text-gray-600">MATH201 - May 15, 11:59 PM</p>
                    <p className="text-sm text-gray-600">Chapter 5 Problems</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-purple-100 text-purple-800 rounded-full p-2">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium">Faculty Office Hours</h3>
                    <p className="text-sm text-gray-600">Wednesday, 2:00 PM - 4:00 PM</p>
                    <p className="text-sm text-gray-600">Faculty Building, Room 302</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;