'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sparkles, PartyPopper, TrendingUp, Lightbulb, ArrowRight, AlertCircle } from 'lucide-react';

export default function Step2() {
  const router = useRouter();
  const [audienceType, setAudienceType] = useState('magical_gift');
  const [error, setError] = useState('');

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!audienceType) {
      setError('Please select an audience type to continue.');
      return;
    }
    // Save to localStorage for flow branching
    localStorage.setItem('coloring_book_audience', audienceType);
    
    if (audienceType === 'marketing_power') {
      router.push('/templates');
    } else {
      router.push('/create/step-3');
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-8">
        <div className="flex items-center gap-2 text-primary dark:text-pink-400 font-bold text-xs tracking-wider uppercase mb-4">
          <span className="bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 px-2.5 py-1 rounded-md text-primary dark:text-pink-300">Step 2</span>
          <span>Audience</span>
        </div>
        <h1 className="text-[32px] font-bold leading-tight mb-3 tracking-tight text-slate-900 dark:text-white">
          Who&apos;s this awesome gift for?
        </h1>
        <p className="text-slate-500 dark:text-pink-200/60 text-base leading-relaxed">
          Tell us about the lucky recipient so we can tailor the experience perfectly.
        </p>
      </div>

      <div className="space-y-4">
        <label className="cursor-pointer group relative block">
          <input 
            type="radio" 
            name="audience_type" 
            value="magical_gift" 
            className="peer sr-only card-radio" 
            checked={audienceType === 'magical_gift'} 
            onChange={(e) => {
              setAudienceType(e.target.value);
              setError('');
            }}
          />
          <div className="relative overflow-hidden flex flex-row items-center gap-4 rounded-3xl bg-white dark:bg-card-dark p-4 border-2 border-transparent transition-all duration-300 hover:bg-pink-50 dark:hover:bg-[#4d1f3a] shadow-sm peer-checked:border-primary peer-checked:bg-pink-50 dark:peer-checked:bg-[#4d1f3a]">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-100/50 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-300 shadow-inner">
              <Sparkles className="w-8 h-8 font-light" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="font-bold text-lg text-slate-900 dark:text-white mb-1">Magical Gift</span>
              <p className="text-sm text-slate-500 dark:text-pink-200/50 leading-snug">Perfect for a single person. Make them the hero.</p>
            </div>
            <div className="size-6 rounded-full border-2 border-slate-200 dark:border-white/10 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all shrink-0 mr-1">
              <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all"></div>
            </div>
          </div>
        </label>

        <label className="cursor-pointer group relative block">
          <input 
            type="radio" 
            name="audience_type" 
            value="special_event" 
            className="peer sr-only card-radio" 
            checked={audienceType === 'special_event'} 
            onChange={(e) => {
              setAudienceType(e.target.value);
              setError('');
            }}
          />
          <div className="relative overflow-hidden flex flex-row items-center gap-4 rounded-3xl bg-white dark:bg-card-dark p-4 border-2 border-transparent transition-all duration-300 hover:bg-pink-50 dark:hover:bg-[#4d1f3a] shadow-sm peer-checked:border-primary peer-checked:bg-pink-50 dark:peer-checked:bg-[#4d1f3a]">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-amber-100/50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300 shadow-inner">
              <PartyPopper className="w-8 h-8 font-light" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="font-bold text-lg text-slate-900 dark:text-white mb-1">Special Event</span>
              <p className="text-sm text-slate-500 dark:text-pink-200/50 leading-snug">Weddings, birthdays, or parties. Customize for a group.</p>
            </div>
            <div className="size-6 rounded-full border-2 border-slate-200 dark:border-white/10 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all shrink-0 mr-1">
              <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all"></div>
            </div>
          </div>
        </label>

        <label className="cursor-pointer group relative block">
          <input 
            type="radio" 
            name="audience_type" 
            value="marketing_power" 
            className="peer sr-only card-radio" 
            checked={audienceType === 'marketing_power'} 
            onChange={(e) => {
              setAudienceType(e.target.value);
              setError('');
            }}
          />
          <div className="relative overflow-hidden flex flex-row items-center gap-4 rounded-3xl bg-white dark:bg-card-dark p-4 border-2 border-transparent transition-all duration-300 hover:bg-pink-50 dark:hover:bg-[#4d1f3a] shadow-sm peer-checked:border-primary peer-checked:bg-pink-50 dark:peer-checked:bg-[#4d1f3a]">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-cyan-100/50 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-300 shadow-inner">
              <TrendingUp className="w-8 h-8 font-light" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="font-bold text-lg text-slate-900 dark:text-white mb-1">Marketing Power</span>
              <p className="text-sm text-slate-500 dark:text-pink-200/50 leading-snug">For businesses. Promote your brand with fun.</p>
            </div>
            <div className="size-6 rounded-full border-2 border-slate-200 dark:border-white/10 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all shrink-0 mr-1">
              <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all"></div>
            </div>
          </div>
        </label>
      </div>

      {error && <p className="text-sm text-red-500 mt-4 ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {error}</p>}

      <div className="mt-8">
        <div className="relative rounded-2xl bg-white/50 dark:bg-white/5 border border-primary/5 dark:border-white/5 p-4 flex items-center gap-4 backdrop-blur-sm">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Not sure yet?</h3>
            <p className="text-xs text-slate-500 dark:text-pink-200/60 leading-tight mt-0.5">Don&apos;t worry, you can change this anytime in settings.</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-30">
        <div className="h-20 w-full bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        <div className="bg-background-light/90 dark:bg-background-dark/90 border-t border-slate-200 dark:border-white/5 px-6 py-5 safe-area-bottom backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full flex items-center gap-4">
            <Link href="/create/step-1" className="px-6 py-3.5 rounded-xl font-bold text-slate-500 dark:text-pink-200/50 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm uppercase tracking-wide">
              Back
            </Link>
            <button 
              onClick={handleContinue}
              className="group flex-1 bg-primary hover:bg-primary-light text-white font-bold text-lg py-3.5 px-8 rounded-2xl shadow-xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
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
