import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'corporate' | 'user';
  originalRole?: 'admin' | 'corporate';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, isCorporate?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  impersonate: (userId: string, originalRole: 'admin' | 'corporate') => Promise<void>;
  endImpersonation: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session on mount
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Simulated API call to check session
      const session = localStorage.getItem('session');
      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, isCorporate: boolean = false) => {
    try {
      // Simulated API call
      const mockUser: User = {
        id: '1',
        name: isCorporate ? 'Kurumsal Kullanıcı' : 'Test User',
        email,
        role: isCorporate ? 'corporate' : 'admin'
      };
      
      setUser(mockUser);
      localStorage.setItem('session', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear session
      setUser(null);
      localStorage.removeItem('session');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const impersonate = async (userId: string, originalRole: 'admin' | 'corporate') => {
    try {
      // Simulated API call
      const impersonatedUser: User = {
        id: userId,
        name: 'Impersonated User',
        email: 'user@example.com',
        role: 'user',
        originalRole
      };
      
      setUser(impersonatedUser);
      localStorage.setItem('session', JSON.stringify(impersonatedUser));
    } catch (error) {
      console.error('Impersonation failed:', error);
      throw error;
    }
  };

  const endImpersonation = async () => {
    try {
      if (user?.originalRole) {
        // Restore original user
        const originalUser: User = {
          id: '1',
          name: 'Original User',
          email: 'admin@example.com',
          role: user.originalRole
        };
        
        setUser(originalUser);
        localStorage.setItem('session', JSON.stringify(originalUser));
      }
    } catch (error) {
      console.error('End impersonation failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login,
      logout,
      impersonate,
      endImpersonation
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}