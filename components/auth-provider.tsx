'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  signup: (email: string, name: string) => void;
  loginWithGoogle: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    Promise.resolve().then(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          // Ignore parse errors
        }
      }
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (mounted && !user && pathname !== '/login' && pathname !== '/signup') {
      router.push('/login');
    }
  }, [user, pathname, router, mounted]);

  const login = (email: string, name: string) => {
    const newUser = { email, name };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/');
  };

  const signup = (email: string, name: string) => {
    const newUser = { email, name };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/');
  };

  const loginWithGoogle = () => {
    const newUser = { email: 'google@example.com', name: 'Google User' };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
