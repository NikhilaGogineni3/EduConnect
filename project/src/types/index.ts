// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty';
  profilePicture?: string;
}

export interface Student extends User {
  role: 'student';
  enrolledCourses: Course[];
  progress: Record<string, number>; // courseId -> percentage
}

export interface Faculty extends User {
  role: 'faculty';
  teachingCourses: Course[];
  department: string;
}

// Course related types
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  instructor: string;
  instructorId: string;
  credits: number;
  schedule: TimeSlot[];
}

export interface TimeSlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
  location: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}