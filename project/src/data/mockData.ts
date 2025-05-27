import { Course, Student, Faculty } from '../types';

// Mock courses
export const courses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    description: 'A foundational course covering the basics of computer science and programming.',
    instructor: 'Dr. Alan Turing',
    instructorId: '101',
    credits: 3,
    schedule: [
      {
        day: 'Monday',
        startTime: '10:00',
        endTime: '11:30',
        location: 'Room A101'
      },
      {
        day: 'Wednesday',
        startTime: '10:00',
        endTime: '11:30',
        location: 'Room A101'
      }
    ]
  },
  {
    id: '2',
    code: 'MATH201',
    name: 'Calculus II',
    description: 'Advanced calculus concepts including integration techniques and applications.',
    instructor: 'Dr. Katherine Johnson',
    instructorId: '102',
    credits: 4,
    schedule: [
      {
        day: 'Tuesday',
        startTime: '13:00',
        endTime: '14:30',
        location: 'Room B205'
      },
      {
        day: 'Thursday',
        startTime: '13:00',
        endTime: '14:30',
        location: 'Room B205'
      }
    ]
  },
  {
    id: '3',
    code: 'ENG102',
    name: 'Academic Writing',
    description: 'Developing skills for effective academic writing and research.',
    instructor: 'Prof. Jane Austen',
    instructorId: '103',
    credits: 3,
    schedule: [
      {
        day: 'Monday',
        startTime: '14:00',
        endTime: '15:30',
        location: 'Room C310'
      },
      {
        day: 'Friday',
        startTime: '14:00',
        endTime: '15:30',
        location: 'Room C310'
      }
    ]
  },
  {
    id: '4',
    code: 'PHYS101',
    name: 'Physics I: Mechanics',
    description: 'Introduction to classical mechanics, motion, and energy.',
    instructor: 'Dr. Richard Feynman',
    instructorId: '104',
    credits: 4,
    schedule: [
      {
        day: 'Tuesday',
        startTime: '09:00',
        endTime: '10:30',
        location: 'Room D102'
      },
      {
        day: 'Thursday',
        startTime: '09:00',
        endTime: '10:30',
        location: 'Room D102'
      }
    ]
  }
];

// Mock students
export const students: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@university.edu',
    role: 'student',
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    enrolledCourses: [courses[0], courses[1]],
    progress: {
      '1': 75,
      '2': 60
    }
  }
];

// Mock faculty
export const faculty: Faculty[] = [
  {
    id: '101',
    name: 'Dr. Alan Turing',
    email: 'turing@university.edu',
    role: 'faculty',
    profilePicture: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=600',
    department: 'Computer Science',
    teachingCourses: [courses[0]]
  }
];

// Default credentials for demo purposes
export const defaultCredentials = {
  student: {
    email: 'john@university.edu',
    password: 'student123'
  },
  faculty: {
    email: 'turing@university.edu',
    password: 'faculty123'
  }
};