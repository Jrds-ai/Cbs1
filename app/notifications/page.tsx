'use client';

import { Bell, Star, Heart, MessageCircle, Package, ArrowLeft, MoreHorizontal, Check, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useNotifications, Notification } from '@/components/notification-provider';

export default function NotificationsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { notifications, markAllAsRead, clearAll } = useNotifications();

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setMenuOpen(false);
  };

  const handleClearAll = () => {
    clearAll();
    setMenuOpen(false);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-5 h-5" />;
      case 'feature':
        return <Star className="w-5 h-5" />;
      case 'social':
        return <Heart className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="size-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white shadow-sm hover:scale-105 transition-transform">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Activity</h1>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="size-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
          {menuOpen && (
            <div className="absolute top-12 right-0 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2">
              <button
                onClick={handleMarkAllAsRead}
                className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Mark all as read
              </button>
              <button
                onClick={handleClearAll}
                className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" /> Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((n: Notification) => (
            <div key={n.id} className={`relative p-5 rounded-3xl border transition-all duration-300 ${n.unread ? 'bg-white dark:bg-white/10 border-primary/20 shadow-md' : 'bg-white/50 dark:bg-white/5 border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md'}`}>
              <div className="flex gap-4">
                <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${n.color}`}>
                  {renderIcon(n.iconType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold text-base truncate ${n.unread ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-pink-200/80'}`}>{n.title}</h3>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-pink-200/30 uppercase whitespace-nowrap ml-2">{n.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-pink-200/60 leading-relaxed">{n.message}</p>
                </div>
              </div>
              {n.unread && (
                <div className="absolute top-5 right-5 size-2 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
              )}
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center text-center">
            <div className="size-20 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-white/10 mb-4">
              <Bell className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">All caught up!</h3>
            <p className="text-slate-500 dark:text-pink-200/60 max-w-[200px]">You have no new notifications right now.</p>
          </div>
        )}
      </div>

      {notifications.some((n: Notification) => n.unread) && (
        <div className="mt-12 text-center relative z-10">
          <button
            onClick={markAllAsRead}
            className="text-sm font-bold text-primary dark:text-pink-400 hover:underline transition-all active:scale-95 inline-block"
          >
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}