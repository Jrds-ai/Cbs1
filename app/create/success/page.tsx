'use client';

import Link from 'next/link';
import { CheckCircle, Home, Book, Download, Share2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function OrderSuccess() {
  const handleDownload = () => {
    alert('Downloading your magical coloring book PDF...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My AI Coloring Book',
        text: 'Look at this coloring book I created with AI!',
        url: window.location.origin,
      }).catch(console.error);
    } else {
      alert('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-md mx-auto w-full animate-fade-in">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className="size-32 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8 relative"
      >
        <CheckCircle className="w-16 h-16" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl"
        ></motion.div>
      </motion.div>

      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 text-center tracking-tight">Order Placed!</h1>
      <p className="text-slate-500 dark:text-pink-200/70 text-center mb-10 leading-relaxed">
        Your magical coloring book is being prepared. We&apos;ll notify you as soon as it&apos;s ready for shipping!
      </p>

      <div className="w-full space-y-4 mb-12">
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-5 flex items-center gap-4 shadow-sm">
          <div className="size-14 rounded-2xl bg-primary/10 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-pink-400 shrink-0">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white">Digital Copy Ready</h3>
            <p className="text-xs text-slate-500 dark:text-pink-200/60">You can download the PDF version now.</p>
          </div>
          <button 
            onClick={handleDownload}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-5 flex items-center gap-4 shadow-sm">
          <div className="size-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Share2 className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white">Share the Magic</h3>
            <p className="text-xs text-slate-500 dark:text-pink-200/60">Let your friends see your creation.</p>
          </div>
          <button 
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <Link href="/" className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all group">
          <Home className="w-8 h-8 text-slate-400 dark:text-pink-200/30 mb-3 group-hover:text-primary transition-colors" />
          <span className="text-sm font-bold text-slate-700 dark:text-white">Home</span>
        </Link>
        <Link href="/library" className="flex flex-col items-center justify-center p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all group">
          <Book className="w-8 h-8 text-slate-400 dark:text-pink-200/30 mb-3 group-hover:text-primary transition-colors" />
          <span className="text-sm font-bold text-slate-700 dark:text-white">Library</span>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-pink-200/20 mb-2">Order ID</p>
        <p className="text-sm font-mono text-slate-500 dark:text-pink-200/40">#CB-9823-X12</p>
      </div>
    </div>
  );
}