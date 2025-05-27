import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';
import { Student, Faculty } from '../../types';
import { User, Mail, Phone, MapPin, Building, BookOpen, Calendar, GraduationCap } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Type guards
  const isStudent = (user: any): user is Student => user?.role === 'student';
  const isFaculty = (user: any): user is Faculty => user?.role === 'faculty';
  
  if (!user) return null;
  
  const handleSaveChanges = () => {
    // In a real app, this would call an API to update user data
    setIsEditing(false);
    alert('Profile updated successfully!');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="mt-1 text-gray-600">
            Manage your account information
          </p>
        </div>
        {!isEditing && (
          <div className="mt-4 md:mt-0">
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={user.profilePicture || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    alt={user.name}
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </button>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600 capitalize">{user.role}</p>
                
                <div className="mt-6 w-full space-y-3">
                  <div className="flex items-center text-gray-600">
                    <Mail size={16} className="mr-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone size={16} className="mr-2" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span>San Francisco, CA</span>
                  </div>
                  
                  {isFaculty(user) && (
                    <div className="flex items-center text-gray-600">
                      <Building size={16} className="mr-2" />
                      <span>{user.department} Department</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {isStudent(user) && (
            <Card className="mt-6">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-800">Academic Information</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center">
                      <GraduationCap size={16} className="mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Student ID</span>
                    </div>
                    <p className="ml-6 text-gray-600">ST-{user.id.substring(0, 6)}</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <BookOpen size={16} className="mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Program</span>
                    </div>
                    <p className="ml-6 text-gray-600">Bachelor of Science in Computer Science</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Enrollment Year</span>
                    </div>
                    <p className="ml-6 text-gray-600">2023</p>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Academic Advisor</span>
                    </div>
                    <p className="ml-6 text-gray-600">Dr. James Peterson</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">
                {isEditing ? 'Edit Profile Information' : 'Profile Information'}
              </h3>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      defaultValue={user.name}
                      id="fullName"
                    />
                    <Input
                      label="Email"
                      type="email"
                      defaultValue={user.email}
                      id="email"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      defaultValue="+1 (555) 123-4567"
                      id="phone"
                    />
                    <Input
                      label="Location"
                      defaultValue="San Francisco, CA"
                      id="location"
                    />
                  </div>
                  
                  {isFaculty(user) && (
                    <Input
                      label="Department"
                      defaultValue={user.department}
                      id="department"
                    />
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">About Me</h4>
                    <p className="mt-1 text-gray-800">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                      <p className="mt-1 text-gray-800">{user.name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Email</h4>
                      <p className="mt-1 text-gray-800">{user.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                      <p className="mt-1 text-gray-800">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Location</h4>
                      <p className="mt-1 text-gray-800">San Francisco, CA</p>
                    </div>
                    
                    {isFaculty(user) && (
                      <>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Department</h4>
                          <p className="mt-1 text-gray-800">{user.department}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Office</h4>
                          <p className="mt-1 text-gray-800">Building A, Room 302</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {isFaculty(user) && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Office Hours</h4>
                      <div className="mt-1 space-y-1">
                        <p className="text-gray-800">Monday: 2:00 PM - 4:00 PM</p>
                        <p className="text-gray-800">Wednesday: 10:00 AM - 12:00 PM</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">Account Settings</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-gray-600">Update your password regularly to keep your account secure</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Notification Preferences</h4>
                      <p className="text-sm text-gray-600">Manage how and when you receive notifications</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable</Button>
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

export default ProfilePage;