'use client';

import { Bell, Star, Heart, MessageCircle, Package, ArrowLeft, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped!',
      message: 'Your book "The Magic Crayon" is on its way to your doorstep.',
      time: '2 hours ago',
      icon: <Package className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300',
      unread: true
    },
    {
      id: 2,
      type: 'feature',
      title: 'New Art Style: Watercolor',
      message: 'Try our latest AI art style for a soft, dreamy look.',
      time: '1 day ago',
      icon: <Star className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300',
      unread: false
    },
    {
      id: 3,
      type: 'social',
      title: 'Your book was featured!',
      message: 'Community loved your "Space Adventures" creation.',
      time: '3 days ago',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300',
      unread: false
    }
  ];

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="size-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Activity</h1>
        </div>
        <button className="size-10 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white shadow-sm">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className={`relative p-5 rounded-3xl border transition-all duration-300 ${n.unread ? 'bg-white dark:bg-white/10 border-primary/20 shadow-md' : 'bg-white/50 dark:bg-white/5 border-slate-100 dark:border-white/5 shadow-sm'}`}>
            <div className="flex gap-4">
              <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${n.color}`}>
                {n.icon}
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
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="text-sm font-bold text-primary dark:text-pink-400 hover:underline">Mark all as read</button>
      </div>
    </div>
  );
}