'use client';

import { useAuth } from '@/components/auth-provider';
import { User, Bell, Moon, Sun, LogOut, ChevronRight, Shield, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Settings() {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    Promise.resolve().then(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
  }, []);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    // Sync dark mode state if it changes externally
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-6">
        <h1 className="text-3xl font-bold leading-tight mb-2 tracking-tight text-slate-900 dark:text-white">
          Settings
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base">
          Manage your account and preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-4 flex items-center gap-4 shadow-sm">
          <div className="size-16 rounded-full bg-primary/10 dark:bg-primary/30 flex items-center justify-center border border-primary/20 shrink-0">
            <User className="w-8 h-8 text-primary dark:text-pink-200" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white truncate">{user?.name || 'Guest User'}</h2>
            <p className="text-sm text-slate-500 dark:text-pink-200/60 truncate">{user?.email || 'Not logged in'}</p>
          </div>
          <button 
            onClick={() => alert('Profile editing coming soon!')}
            className="px-4 py-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-white rounded-xl text-sm font-bold transition-colors"
          >
            Edit
          </button>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-3 ml-2">Preferences</h3>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-slate-500 dark:text-pink-200/60">Toggle app theme</p>
                </div>
              </div>
              <button 
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-primary' : 'bg-slate-200 dark:bg-white/20'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Notifications</p>
                  <p className="text-xs text-slate-500 dark:text-pink-200/60">Order updates & news</p>
                </div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-primary' : 'bg-slate-200 dark:bg-white/20'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notifications ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-3 ml-2">Account</h3>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
            <button 
              onClick={() => alert('Payment methods management coming soon!')}
              className="w-full flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Payment Methods</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            
            <button 
              onClick={() => alert('Privacy & Security settings coming soon!')}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Shield className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">Privacy & Security</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button 
          onClick={logout}
          className="w-full mt-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 font-bold text-lg py-4 px-8 rounded-2xl hover:bg-red-100 dark:hover:bg-red-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
