import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Timetable from '../../components/dashboard/Timetable';
import { Student, Faculty, TimeSlot } from '../../types';

const TimetablePage = () => {
  const { user } = useAuth();
  
  // Type guards
  const isStudent = (user: any): user is Student => user?.role === 'student';
  const isFaculty = (user: any): user is Faculty => user?.role === 'faculty';
  
  if (!user) return null;
  
  // Get all time slots from user's courses
  const getAllTimeSlots = (): TimeSlot[] => {
    if (isStudent(user)) {
      return user.enrolledCourses.flatMap(course => 
        course.schedule.map(slot => ({
          ...slot,
          // Add course info to slot for display purposes
          courseCode: course.code,
          courseName: course.name
        }))
      );
    } else if (isFaculty(user)) {
      return user.teachingCourses.flatMap(course => 
        course.schedule.map(slot => ({
          ...slot,
          // Add course info to slot for display purposes
          courseCode: course.code,
          courseName: course.name
        }))
      );
    }
    return [];
  };
  
  const schedule = getAllTimeSlots();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Timetable</h1>
        <p className="mt-1 text-gray-600">
          View your weekly class schedule
        </p>
      </div>
      
      <Timetable schedule={schedule} />
    </div>
  );
};

export default TimetablePage;