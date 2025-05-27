import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface ProgressChartProps {
  progress: Record<string, number>;
  courses: {
    id: string;
    name: string;
    code: string;
  }[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progress, courses }) => {
  const overallProgress = Object.values(progress).reduce((acc, curr) => acc + curr, 0) / 
                          Object.values(progress).length;

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Course Progress Overview</h2>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <h3 className="text-lg font-medium">Overall Progress</h3>
            <span className="text-blue-600 font-semibold">{Math.round(overallProgress)}%</span>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(progress).map(([courseId, percentage]) => {
            const course = courses.find(c => c.id === courseId);
            if (!course) return null;
            
            return (
              <div key={courseId}>
                <div className="flex justify-between mb-1">
                  <div>
                    <span className="text-sm font-medium text-gray-700">{course.name}</span>
                    <span className="ml-2 text-xs text-gray-500">{course.code}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{percentage}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentage < 30 ? 'bg-red-500' :
                      percentage < 70 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;