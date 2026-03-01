'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight, BookOpen, Layers, Palette, Image as ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Review() {
  const [audience, setAudience] = useState<string | null>(null);

  useEffect(() => {
    // Use Promise to avoid synchronous setState in effect warning
    Promise.resolve().then(() => {
      setAudience(localStorage.getItem('coloring_book_audience'));
    });
  }, []);

  const getAudienceLabel = (type: string | null) => {
    switch (type) {
      case 'magical_gift': return 'Magical Gift';
      case 'special_event': return 'Special Event';
      case 'marketing_power': return 'Marketing Power';
      default: return 'For Kids';
    }
  };

  const steps = [
    { label: 'Basic Info', value: 'The Magic Crayon', icon: <BookOpen className="w-4 h-4" />, href: '/create/step-1' },
    { label: 'Audience', value: getAudienceLabel(audience), icon: <Layers className="w-4 h-4" />, href: '/create/step-2' },
    { label: 'Art Style', value: 'Playful Cartoon', icon: <Palette className="w-4 h-4" />, href: '/create/step-3' },
    { label: 'Photo Source', value: 'Uploaded Photo', icon: <ImageIcon className="w-4 h-4" />, href: '/create/step-4' },
  ];

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-8">
        <div className="flex items-center gap-2 text-primary dark:text-pink-400 font-bold text-xs tracking-wider uppercase mb-3">
          <span className="bg-primary/10 dark:bg-primary/30 px-2.5 py-1 rounded-md text-primary dark:text-pink-300">Final Review</span>
          <span>Almost Done</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3 tracking-tight text-slate-900 dark:text-white">
          Review Your Book
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base leading-relaxed">
          Take a quick look before we finalize your magical creation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-pink-200/30 mb-6">Configuration</h3>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-pink-200/40 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-pink-200/30">{step.label}</p>
                    <p className="font-bold text-slate-900 dark:text-white">{step.value}</p>
                  </div>
                </div>
                <Link href={step.href} className="text-xs font-bold text-primary dark:text-pink-400 hover:underline">Edit</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-pink-200/30 mb-4">Book Preview</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {[1, 2, 3].map((i) => (
              <div key={i} className="size-24 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 shrink-0 overflow-hidden relative group cursor-pointer">
                <Image 
                  src={`https://picsum.photos/seed/page${i}/200/300`} 
                  alt="Page" 
                  fill
                  className="object-cover grayscale group-hover:scale-110 transition-transform" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
            <div className="size-24 rounded-2xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 shrink-0 flex items-center justify-center text-slate-400 dark:text-pink-200/20">
              <span className="text-[10px] font-bold uppercase">+8 More</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-[32px] bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            <Check className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">Ready for print!</h4>
            <p className="text-xs text-slate-500 dark:text-pink-200/60">Your book meets all quality standards.</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-30">
        <div className="h-16 w-full bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        <div className="bg-background-light/80 dark:bg-background-dark/80 border-t border-slate-200 dark:border-white/5 p-6 safe-area-bottom backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full flex items-center gap-4">
            <Link href="/create/preview" className="px-6 py-4 rounded-xl font-bold text-slate-500 dark:text-pink-200/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm uppercase tracking-wide">
              Back
            </Link>
            <Link href={audience === 'marketing_power' ? '/templates' : '/create/checkout'} className="group flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-center">
              <span>{audience === 'marketing_power' ? 'Choose Template' : 'Go to Checkout'}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}