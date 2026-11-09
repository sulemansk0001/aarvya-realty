import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'buyer' | 'owner' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_KEY = 'aarvya_realty_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_KEY);
      }
    } catch (e) {
      console.warn('Failed to update auth in localStorage', e);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    // Attempt backend login first if API is available
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (data.token) localStorage.setItem('aarvya_token', data.token);
        return { success: true };
      }
    } catch {
      // Backend not running, use demo client credentials
    }

    // Demo authentication fallback
    if (password.length >= 6) {
      const demoUser: User = {
        id: 'usr-1',
        name: email.split('@')[0].toUpperCase(),
        email,
        phone: '+91 84464 16101',
        role: email.includes('admin') ? 'admin' : 'buyer',
      };
      setUser(demoUser);
      return { success: true };
    }
    return { success: false, message: 'Password must be at least 6 characters.' };
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        if (data.token) localStorage.setItem('aarvya_token', data.token);
        return { success: true };
      }
    } catch {
      // Fallback
    }

    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: 'usr-' + Date.now(),
        name,
        email,
        phone,
        role: 'buyer',
      };
      setUser(newUser);
      return { success: true };
    }
    return { success: false, message: 'Please provide all details with a 6+ character password.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aarvya_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
