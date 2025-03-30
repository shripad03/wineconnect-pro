
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../services/api';
import { IUser } from '../api/types';

type AuthUser = Omit<IUser, 'password'>;

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<IUser, 'id' | 'createdAt'>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in (token exists)
    const token = localStorage.getItem('token');
    
    if (token) {
      setIsLoading(true);
      authApi.getCurrentUser()
        .then((userData) => {
          setUser(userData);
        })
        .catch((err) => {
          // If token is invalid, remove it
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { token, user: userData } = await authApi.login(email, password);
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<IUser, 'id' | 'createdAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { token, user: newUser } = await authApi.register(userData);
      localStorage.setItem('token', token);
      setUser(newUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
