import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { TimeSlot } from '../../types';

interface TimetableProps {
  schedule: TimeSlot[];
}

const Timetable: React.FC<TimetableProps> = ({ schedule }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM
  
  // Group schedule by day
  const scheduleByDay: Record<string, TimeSlot[]> = {};
  days.forEach(day => {
    scheduleByDay[day] = schedule.filter(slot => slot.day === day);
  });
  
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Weekly Schedule</h2>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-2 font-medium text-gray-500 text-sm">Time</div>
            {days.map(day => (
              <div key={day} className="p-2 font-medium text-gray-700 text-center">
                {day}
              </div>
            ))}
          </div>
          <div className="divide-y divide-gray-200">
            {hours.map(hour => {
              const timeStart = `${hour}:00`;
              const timeEnd = `${hour + 1}:00`;
              const timeDisplay = `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'PM' : 'AM'}`;
              
              return (
                <div key={hour} className="grid grid-cols-8 min-h-[60px]">
                  <div className="p-2 text-sm text-gray-500 flex items-center">
                    {timeDisplay}
                  </div>
                  
                  {days.map(day => {
                    const classesInThisHour = scheduleByDay[day].filter(slot => {
                      const slotStartHour = parseInt(slot.startTime.split(':')[0]);
                      const slotEndHour = parseInt(slot.endTime.split(':')[0]);
                      
                      return (slotStartHour <= hour && slotEndHour > hour) || 
                             (slotStartHour === hour);
                    });
                    
                    return (
                      <div key={day} className="p-1 border-l border-gray-100">
                        {classesInThisHour.map((slot, i) => (
                          <div 
                            key={i}
                            className="bg-blue-100 text-blue-800 text-xs p-1 rounded mb-1 overflow-hidden"
                          >
                            <div className="font-medium">{slot.location}</div>
                            <div>{slot.startTime} - {slot.endTime}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timetable;