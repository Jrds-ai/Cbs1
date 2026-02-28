'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PenLine, ToyBrick, Brush, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

export default function Step1() {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState('');
  const [error, setError] = useState('');

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!bookTitle.trim()) {
      setError('Please enter a book title to continue.');
      return;
    }
    router.push('/create/step-2');
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-8">
        <div className="flex items-center gap-2 text-secondary dark:text-pink-400 font-bold text-xs tracking-wider uppercase mb-3">
          <span className="bg-pink-100 dark:bg-pink-500/20 px-2.5 py-1 rounded-md text-primary dark:text-pink-300">Step 1</span>
          <span>Basic Info</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3 tracking-tight text-slate-900 dark:text-white">
          Let&apos;s start with<br/>the basics
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base leading-relaxed">
          Give your coloring book a name and tell us who will be enjoying it.
        </p>
      </div>

      <div className="space-y-8">
        <div className="group">
          <label className="block text-xs font-bold text-slate-500 dark:text-pink-200/60 mb-2 uppercase tracking-wider pl-1" htmlFor="bookTitle">Book Title</label>
          <div className="relative transition-all duration-300">
            <input 
              id="bookTitle" 
              type="text" 
              value={bookTitle}
              onChange={(e) => {
                setBookTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g. The Magic Crayon" 
              className={`modern-input w-full rounded-2xl border-0 bg-white dark:bg-white/5 p-5 text-lg font-medium shadow-sm ring-1 ${error ? 'ring-red-500 focus:ring-red-500' : 'ring-slate-200 dark:ring-white/10 focus:ring-secondary dark:focus:ring-secondary'} focus:ring-2 placeholder:text-slate-300 dark:placeholder:text-pink-200/30 transition-all outline-none`} 
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-pink-200/40 pointer-events-none">
              <PenLine className="w-5 h-5" />
            </div>
          </div>
          {error && <p className="text-sm text-red-500 mt-2 ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {error}</p>}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between pl-1">
            <label className="block text-xs font-bold text-slate-500 dark:text-pink-200/60 uppercase tracking-wider">Who is it for?</label>
            <span className="text-xs text-secondary dark:text-pink-400 hover:text-primary cursor-pointer font-bold">Why does this matter?</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <label className="cursor-pointer group relative">
              <input type="radio" name="audience" className="peer sr-only" defaultChecked value="kids" />
              <div className="relative overflow-hidden flex items-center gap-4 rounded-2xl bg-white dark:bg-white/5 p-4 border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-secondary/30 dark:hover:border-secondary/30 peer-checked:border-secondary peer-checked:ring-1 peer-checked:ring-secondary peer-checked:bg-pink-50/50 dark:peer-checked:bg-secondary/20">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <ToyBrick className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-0.5 z-10 flex-1">
                  <span className="font-bold text-base text-slate-900 dark:text-white group-hover:text-secondary transition-colors">For Kids</span>
                  <span className="text-sm text-slate-500 dark:text-pink-200/60">Playful themes & simple lines</span>
                </div>
                <div className="size-6 rounded-full border-2 border-slate-200 dark:border-slate-600 peer-checked:border-secondary peer-checked:bg-secondary flex items-center justify-center transition-all">
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all"></div>
                </div>
              </div>
            </label>
            <label className="cursor-pointer group relative">
              <input type="radio" name="audience" className="peer sr-only" value="adults" />
              <div className="relative overflow-hidden flex items-center gap-4 rounded-2xl bg-white dark:bg-white/5 p-4 border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-secondary/30 dark:hover:border-secondary/30 peer-checked:border-secondary peer-checked:ring-1 peer-checked:ring-secondary peer-checked:bg-pink-50/50 dark:peer-checked:bg-secondary/20">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  <Brush className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-0.5 z-10 flex-1">
                  <span className="font-bold text-base text-slate-900 dark:text-white group-hover:text-secondary transition-colors">For Adults</span>
                  <span className="text-sm text-slate-500 dark:text-pink-200/60">Intricate designs & relaxing</span>
                </div>
                <div className="size-6 rounded-full border-2 border-slate-200 dark:border-slate-600 peer-checked:border-secondary peer-checked:bg-secondary flex items-center justify-center transition-all">
                  <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all"></div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="mt-8 rounded-3xl relative overflow-hidden p-[2px] bg-gradient-to-r from-accent-blue via-secondary to-accent-yellow shadow-lg shadow-pink-900/10 dark:shadow-none">
          <div className="relative rounded-[22px] bg-white/95 dark:bg-[#3d0023]/95 backdrop-blur-sm p-5 flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shrink-0 shadow-lg shadow-pink-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">AI Magic Included</h3>
              <p className="text-sm text-slate-500 dark:text-pink-200/70 leading-tight mt-1">We&apos;ll tailor the art style automatically.</p>
            </div>
            <div className="absolute -right-6 -top-6 size-24 bg-secondary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-30">
        <div className="h-16 w-full bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        <div className="bg-background-light/80 dark:bg-background-dark/80 border-t border-slate-200 dark:border-white/5 p-6 safe-area-bottom backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full flex items-center gap-4">
            <Link href="/" className="px-6 py-4 rounded-xl font-bold text-slate-500 dark:text-pink-200/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm uppercase tracking-wide">
              Back
            </Link>
            <button 
              onClick={handleContinue}
              className="group flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
