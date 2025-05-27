import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import ProgressChart from '../../components/dashboard/ProgressChart';
import { Student } from '../../types';

const ProgressPage = () => {
  const { user } = useAuth();
  
  if (!user || user.role !== 'student') {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
        <p className="mt-2 text-gray-600">
          This feature is only available for students.
        </p>
      </div>
    );
  }
  
  const student = user as Student;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
        <p className="mt-1 text-gray-600">
          Monitor your academic progress across all courses
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart 
            progress={student.progress} 
            courses={student.enrolledCourses.map(c => ({ id: c.id, name: c.name, code: c.code }))} 
          />
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 15l-2-6 2 6zM5 5.5A1.5 1.5 0 1 0 8 5.5V7h.5A1.5 1.5 0 1 0 10 5.5"></path>
                      <path d="M16 5.5A1.5 1.5 0 1 1 19 5.5V14a2 2 0 0 1-2 2H13.5"></path>
                      <path d="M8 7v1a5 5 0 0 0 5 5h.5"></path>
                      <path d="M21 16.6c-.3.6-.9 1-1.5 1-1.7 0-3.1-1.3-3-3 .1-1.6 1.4-2.9 3-3 .6 0 1.2.4 1.5 1"></path>
                      <path d="M21 2l-9 4.5M12 6.5 3 2"></path>
                      <path d="M3 22V2"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Course Completion</h3>
                    <p className="text-sm text-gray-600">Completed 2 courses with a grade of B or better</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-100 text-green-600 rounded-full p-3 mr-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 13V2l8 4-8 4"></path>
                      <path d="M20.55 10.23A9 9 0 1 1 8 4.94"></path>
                      <path d="M8 10a5 5 0 1 0 8.9 2.02"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Perfect Attendance</h3>
                    <p className="text-sm text-gray-600">Attended all classes for 4 consecutive weeks</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-purple-100 text-purple-600 rounded-full p-3 mr-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.75 1 4.55a2.601 2.601 0 0 1 .3 1.2v2"></path>
                      <path d="M4.8 10a2.5 2.5 0 0 1 3-3"></path>
                      <path d="M13 17.8c.5 0 .9.1 1.4.1 2 0 4.1-.7 5.9-2 1-.8 1.7-1.8 1.7-3.2 0-1-.5-1.9-1.3-2.7"></path>
                      <path d="M13 10a5.5 5.5 0 0 1 5 0"></path>
                      <path d="M13 14c1 .1 2 .1 3 0"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Assignment Excellence</h3>
                    <p className="text-sm text-gray-600">Received top marks on 5 consecutive assignments</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {student.enrolledCourses.map((course, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium">{course.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {course.code} • Current Progress: {student.progress[course.id]}%
                </p>
                <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      student.progress[course.id] < 30 ? 'bg-red-500' :
                      student.progress[course.id] < 70 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${student.progress[course.id]}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Last activity: Completed Module {Math.floor(student.progress[course.id] / 10)} on {new Date().toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;