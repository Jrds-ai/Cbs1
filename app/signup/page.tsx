'use client';

import { useState } from 'react';
import { useAuth } from '@/components/auth-provider';
import Link from 'next/link';
import { BookOpen, ArrowRight, AlertCircle } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const { signup, loginWithGoogle } = useAuth();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      signup(email, name);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md flex flex-col items-center animate-fade-in">
        <div className="size-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-xl shadow-primary/30 mb-8 relative overflow-hidden">
          <BookOpen className="w-10 h-10 relative z-10" />
          <div className="absolute -right-4 -top-4 w-12 h-12 bg-accent-yellow rounded-full blur-md opacity-60"></div>
          <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-accent-blue rounded-full blur-md opacity-60"></div>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 text-center">Coloring Book Studio</h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-center mb-8">Join the magic and start creating.</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4" noValidate>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
              }}
              className={`w-full bg-white dark:bg-white/5 border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all`}
              placeholder="Jane Doe"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
              }}
              className={`w-full bg-white dark:bg-white/5 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: undefined }));
              }}
              className={`w-full bg-white dark:bg-white/5 border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.password}</p>}
          </div>
          
          <button type="submit" className="w-full group bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6">
            <span>Sign Up</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="w-full my-6 flex items-center gap-4">
          <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-white/30">Or continue with</span>
          <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
        </div>

        <button 
          onClick={loginWithGoogle}
          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-bold text-base py-4 px-8 rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>Google</span>
        </button>

        <p className="mt-8 text-slate-500 dark:text-pink-200/60 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-primary dark:text-pink-400 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
