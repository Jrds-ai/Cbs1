'use client';

import { useAuth } from '@/components/auth-provider';
import { Book, Plus, Search, Filter, MoreVertical, Clock, Download } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Library() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const books = [
    { id: 1, title: 'The Magic Crayon', date: '2 days ago', pages: 12, status: 'Completed', image: 'https://picsum.photos/seed/book1/400/300' },
    { id: 2, title: 'Space Adventures', date: '5 days ago', pages: 16, status: 'In Progress', image: 'https://picsum.photos/seed/book2/400/300' },
    { id: 3, title: 'Underwater World', date: '1 week ago', pages: 10, status: 'Completed', image: 'https://picsum.photos/seed/book3/400/300' },
  ];

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">My Library</h1>
          <p className="text-slate-500 dark:text-pink-200/60 text-sm">Your magical collection</p>
        </div>
        <Link href="/create/step-1" className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          <Plus className="w-6 h-6" />
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search your books..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      <div className="space-y-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={book.image} 
                  alt={book.title} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute top-4 right-4">
                  <button className="size-10 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md flex items-center justify-center text-slate-900 dark:text-white shadow-lg">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${book.status === 'Completed' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                    {book.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{book.title}</h3>
                  <div className="flex items-center gap-1 text-slate-400 dark:text-pink-200/40">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase">{book.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-pink-200/60">{book.pages} Pages</span>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-pink-400 font-bold text-sm hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors">
                      Open
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center text-center">
            <div className="size-20 rounded-3xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-300 dark:text-white/10 mb-4">
              <Book className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No books found</h3>
            <p className="text-slate-500 dark:text-pink-200/60 max-w-[200px]">Start your first creation to see it here!</p>
          </div>
        )}
      </div>
    </div>
  );
}