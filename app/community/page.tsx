'use client';

import { Heart, MessageCircle, Share2, Search, Filter, Sparkles, User } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

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
          <div key={post.id} className="group flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full overflow-hidden border-2 border-primary/20 relative">
                  <Image 
                    src={post.avatar} 
                    alt={post.author} 
                    fill 
                    className="object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{post.author}</h3>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-pink-200/30 uppercase tracking-wider">{post.style} Style</p>
                </div>
              </div>
              <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                <Filter className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h4 className="text-white font-bold text-xl mb-1">{post.title}</h4>
                <p className="text-white/70 text-sm">Created with AI Magic</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">AI Art</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 group/btn">
                  <Heart className="w-6 h-6 text-slate-400 group-hover/btn:text-red-500 transition-colors" />
                  <span className="text-sm font-bold text-slate-600 dark:text-pink-200/60">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 group/btn">
                  <MessageCircle className="w-6 h-6 text-slate-400 group-hover/btn:text-primary transition-colors" />
                  <span className="text-sm font-bold text-slate-600 dark:text-pink-200/60">{post.comments}</span>
                </button>
              </div>
              <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                <Share2 className="w-6 h-6 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}