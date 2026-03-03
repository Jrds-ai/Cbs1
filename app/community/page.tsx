'use client';

import { Heart, MessageCircle, Share2, Search, Filter, Sparkles, User } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Community() {
  const [activeTab, setActiveTab] = useState('trending');

  const posts = [
    {
      id: 1,
      author: 'Alice Wonder',
      avatar: 'https://i.pravatar.cc/150?u=alice',
      image: 'https://picsum.photos/seed/showcase1/600/800',
      title: 'Enchanted Forest',
      likes: 124,
      comments: 12,
      style: 'Realistic'
    },
    {
      id: 2,
      author: 'Bob Builder',
      avatar: 'https://i.pravatar.cc/150?u=bob',
      image: 'https://picsum.photos/seed/showcase2/600/800',
      title: 'Robot City',
      likes: 89,
      comments: 5,
      style: 'Cartoon'
    },
    {
      id: 3,
      author: 'Charlie Art',
      avatar: 'https://i.pravatar.cc/150?u=charlie',
      image: 'https://picsum.photos/seed/showcase3/600/800',
      title: 'Dreamy Mandalas',
      likes: 256,
      comments: 34,
      style: 'Mandala'
    }
  ];

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-6">
        <h1 className="text-3xl font-bold leading-tight mb-2 tracking-tight text-slate-900 dark:text-white">
          Showcase
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base">
          Be inspired by what others are creating.
        </p>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
        {['Trending', 'Recent', 'Following', 'Featured'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-6 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-white/5 text-slate-500 dark:text-pink-200/40 border border-slate-200 dark:border-white/10'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="hidden"></div>
        ))}

        <div className="py-20 flex flex-col items-center text-center">
          <div className="size-20 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-white/10 mb-4 shadow-inner">
            <Sparkles className="w-10 h-10 text-primary/40" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Nothing here yet</h3>
          <p className="text-slate-500 dark:text-pink-200/60 max-w-[260px] mb-8">
            Share your magical coloring books with the community to get featured!
          </p>

          <Link
            href="/library"
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-base py-4 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Share My Books</span>
            <Search className="w-4 h-4" />
          </Link>
          <div className="mt-8 p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              How to share:
            </h4>
            <ul className="text-sm text-slate-500 dark:text-pink-200/70 space-y-2 list-disc list-inside">
              <li>Go to your Library.</li>
              <li>Open a book you created.</li>
              <li>Choose viewing permissions (e.g. view, purchase, download).</li>
              <li>Click &apos;Publish to Showcase&apos;!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}