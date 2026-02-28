'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, RefreshCw, Download, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preview() {
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsGenerating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleDownload = () => {
    alert('Downloading your coloring page as PDF...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Coloring Page',
        text: 'Check out this coloring page I created with AI!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Sharing is not supported on this browser. Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-6">
        <div className="flex items-center gap-2 text-primary dark:text-pink-400 font-bold text-xs tracking-wider uppercase mb-3">
          <span className="bg-primary/10 dark:bg-primary/30 px-2.5 py-1 rounded-md text-primary dark:text-pink-300">Preview</span>
          <span>AI Generation</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3 tracking-tight text-slate-900 dark:text-white">
          {isGenerating ? 'Generating Magic...' : 'Your Masterpiece'}
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base leading-relaxed">
          {isGenerating 
            ? 'Our AI is carefully crafting your coloring page. This takes just a moment.' 
            : 'Here is your custom coloring page. Looks amazing!'}
        </p>
      </div>

      <div className="relative aspect-[3/4] w-full rounded-[40px] overflow-hidden bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-2xl">
        {isGenerating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <div className="relative size-32 mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
              <div className="absolute inset-4 rounded-full border-4 border-secondary/20 border-b-secondary animate-spin-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary animate-pulse" />
              </div>
            </div>
            <p className="text-slate-400 dark:text-pink-200/40 font-bold text-xs uppercase tracking-[0.2em] animate-pulse">Processing Pixels</p>
          </div>
        ) : (
          <div className="absolute inset-0 p-4 animate-scale-in">
            <div className="w-full h-full rounded-[28px] border-4 border-slate-900 dark:border-white bg-white overflow-hidden relative">
              <Image 
                src="https://picsum.photos/seed/coloring/800/1200" 
                alt="Coloring Page Preview" 
                fill
                className="object-cover grayscale contrast-150 brightness-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
            </div>
          </div>
        )}
      </div>

      {!isGenerating && (
        <div className="mt-8 grid grid-cols-3 gap-4 animate-fade-in">
          <button 
            onClick={handleRegenerate}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="size-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white shadow-sm group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
              <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50">Regenerate</span>
          </button>
          <button 
            onClick={handleDownload}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="size-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white shadow-sm group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
              <Download className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50">Download</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="size-14 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-white shadow-sm group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
              <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50">Share</span>
          </button>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full z-30">
        <div className="h-16 w-full bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        <div className="bg-background-light/80 dark:bg-background-dark/80 border-t border-slate-200 dark:border-white/5 p-6 safe-area-bottom backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full flex items-center gap-4">
            <Link href="/create/step-4" className="px-6 py-4 rounded-xl font-bold text-slate-500 dark:text-pink-200/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm uppercase tracking-wide">
              Back
            </Link>
            <Link href="/create/review" className={`group flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${isGenerating ? 'opacity-50 pointer-events-none' : ''}`}>
              <span>Review Book</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}