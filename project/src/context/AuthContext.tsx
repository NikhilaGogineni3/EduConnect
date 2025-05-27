import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { defaultCredentials, students, faculty } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'student' | 'faculty') => Promise<boolean>;
  logout: () => void;
}

const defaultAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false
};

const AuthContext = createContext<AuthContextType>({
  ...defaultAuthState,
  login: async () => false,
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  const login = async (email: string, password: string, role: 'student' | 'faculty'): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call with timeout
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        let user: User | null = null;
        
        if (role === 'student') {
          if (email === defaultCredentials.student.email && password === defaultCredentials.student.password) {
            user = students[0];
          }
        } else if (role === 'faculty') {
          if (email === defaultCredentials.faculty.email && password === defaultCredentials.faculty.password) {
            user = faculty[0];
          }
        }
        
        if (user) {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false
          });
          resolve(true);
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setAuthState(defaultAuthState);
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};