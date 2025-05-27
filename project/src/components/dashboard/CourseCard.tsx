import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';
import { Course } from '../../types';
import { Clock, MapPin } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  progress?: number;
  onRemove?: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, progress, onRemove }) => {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg">
      <CardHeader className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{course.name}</h3>
            <Badge variant="primary" size="sm">{course.code}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {course.credits} Credits • Instructor: {course.instructor}
          </p>
        </div>
        {progress !== undefined && (
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-12 w-12">
              <svg className="h-12 w-12" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                  strokeDasharray={`${progress} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
                <text
                  x="18"
                  y="19"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#2563eb"
                  fontSize="8"
                  fontWeight="bold"
                >
                  {progress}%
                </text>
              </svg>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        <div className="space-y-2">
          {course.schedule.map((slot, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm">
              <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded w-24 text-center font-medium">
                {slot.day}
              </div>
              <div className="flex-1 flex flex-col space-y-1">
                <div className="flex items-center text-gray-600">
                  <Clock size={14} className="mr-1" />
                  {slot.startTime} - {slot.endTime}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={14} className="mr-1" />
                  {slot.location}
                </div>
              </div>
            </div>
          ))}
        </div>
        {onRemove && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => onRemove(course.id)}
              className="text-red-600 text-sm hover:text-red-800 transition-colors font-medium"
            >
              Remove from enrolled courses
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;