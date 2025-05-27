import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { Search, Plus, X } from 'lucide-react';
import CourseCard from '../../components/dashboard/CourseCard';
import { Course, Student, Faculty } from '../../types';
import { courses as allCourses } from '../../data/mockData';

const CoursesPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  
  // Type guards
  const isStudent = (user: any): user is Student => user?.role === 'student';
  const isFaculty = (user: any): user is Faculty => user?.role === 'faculty';
  
  if (!user) return null;
  
  // Get courses based on user role
  const userCourses = isStudent(user) 
    ? user.enrolledCourses 
    : isFaculty(user) 
      ? user.teachingCourses 
      : [];
  
  // Filter available courses for enrollment (for students)
  const availableCourses = isStudent(user)
    ? allCourses.filter(course => !userCourses.some(uc => uc.id === course.id))
    : [];
  
  // Filter courses based on search query
  const filteredCourses = userCourses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleRemoveCourse = (courseId: string) => {
    if (isStudent(user)) {
      // In a real app, this would call an API to unenroll
      user.enrolledCourses = user.enrolledCourses.filter(course => course.id !== courseId);
      alert(`Successfully removed from course!`);
    }
  };
  
  const handleAddCourse = (course: Course) => {
    if (isStudent(user)) {
      // In a real app, this would call an API to enroll
      user.enrolledCourses.push(course);
      setShowAddCourseModal(false);
      alert(`Successfully enrolled in ${course.name}!`);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="mt-1 text-gray-600">
            {isStudent(user) 
              ? 'Manage your enrolled courses'
              : 'Manage your teaching assignments'}
          </p>
        </div>
        
        {isStudent(user) && (
          <div className="mt-4 md:mt-0">
            <Button onClick={() => setShowAddCourseModal(true)}>
              <Plus size={16} className="mr-2" />
              Add Course
            </Button>
          </div>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {isStudent(user) ? 'Your Enrolled Courses' : 'Your Teaching Assignments'}
            </h2>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  progress={isStudent(user) ? user.progress[course.id] : undefined}
                  onRemove={isStudent(user) ? handleRemoveCourse : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchQuery
                  ? 'No courses match your search criteria.'
                  : isStudent(user)
                    ? 'You are not enrolled in any courses yet.'
                    : 'You are not teaching any courses yet.'}
              </p>
              {isStudent(user) && !searchQuery && (
                <Button 
                  onClick={() => setShowAddCourseModal(true)}
                  className="mt-3"
                >
                  Browse Available Courses
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {showAddCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Available Courses</h2>
              <button 
                onClick={() => setShowAddCourseModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              {availableCourses.length > 0 ? (
                <div className="space-y-4">
                  {availableCourses.map(course => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold">{course.name}</h3>
                          <p className="text-sm text-gray-600">{course.code} • {course.credits} Credits</p>
                          <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                        </div>
                        <Button onClick={() => handleAddCourse(course)} size="sm">
                          Enroll
                        </Button>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{course.description}</p>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Schedule: </span>
                        {course.schedule.map((slot, i) => (
                          <span key={i}>
                            {slot.day} {slot.startTime}-{slot.endTime}
                            {i < course.schedule.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">
                  You're already enrolled in all available courses.
                </p>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <Button variant="outline" onClick={() => setShowAddCourseModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;