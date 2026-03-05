'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Filter, Star, Heart, ArrowRight } from 'lucide-react';

export default function Templates() {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col antialiased selection:bg-primary selection:text-white">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center p-2 -ml-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold tracking-tight">Coloring Book Studio</h1>
          <button className="flex items-center justify-center p-2 -mr-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Filter className="w-6 h-6" />
          </button>
        </div>
        {/* Progress Steps */}
        <div className="flex w-full flex-row items-center justify-center gap-3 pb-4 pt-1">
          <div className="h-2 w-2 rounded-full bg-primary/40"></div>
          <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-primary/40"></div>
          <div className="h-2 w-2 rounded-full bg-primary/40"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 pb-24 overflow-y-auto no-scrollbar max-w-5xl mx-auto w-full">
        {/* Intro */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold leading-tight mb-2">Choose a Marketing Template</h2>
          <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
            Select a professional design to customize with your brand logo and messaging.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2">
          <button className="flex-none px-4 py-2 bg-primary text-white rounded-full text-sm font-medium shadow-lg shadow-primary/20">All Templates</button>
          <button className="flex-none px-4 py-2 bg-white dark:bg-[#2f1524] border border-slate-200 dark:border-white/10 rounded-full text-sm font-medium hover:border-primary/50 transition-colors">Real Estate</button>
          <button className="flex-none px-4 py-2 bg-white dark:bg-[#2f1524] border border-slate-200 dark:border-white/10 rounded-full text-sm font-medium hover:border-primary/50 transition-colors">Medical</button>
          <button className="flex-none px-4 py-2 bg-white dark:bg-[#2f1524] border border-slate-200 dark:border-white/10 rounded-full text-sm font-medium hover:border-primary/50 transition-colors">Corporate</button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Real Estate */}
          <Link href="/brand" onClick={() => localStorage.setItem('coloring_book_template', 'real_estate')} className="group relative bg-white dark:bg-[#2f1524] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer block">
            <div className="relative aspect-[4/5] bg-slate-100 dark:bg-black/20 overflow-hidden">
              <Image
                alt="Modern house sketch coloring page"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                src="https://picsum.photos/seed/house/800/1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                Popular
              </div>
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-dashed border-primary/60 bg-white/80 dark:bg-black/60 rounded-full flex items-center justify-center text-center p-2">
                <span className="text-[10px] font-bold text-primary uppercase leading-tight">Your Logo Here</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg mb-1">Real Estate Open House</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Perfect for agents & handouts</p>
                </div>
                <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors" onClick={(e) => e.preventDefault()}>
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <button className="w-full mt-2 bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white text-slate-900 dark:text-white font-medium py-2.5 rounded-lg transition-all text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
                Use Template
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Link>

          {/* Card 2: Dentist */}
          <Link href="/brand" onClick={() => localStorage.setItem('coloring_book_template', 'dentist')} className="group relative bg-white dark:bg-[#2f1524] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer block">
            <div className="relative aspect-[4/5] bg-slate-100 dark:bg-black/20 overflow-hidden">
              <Image
                alt="Cute tooth character coloring page"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                src="https://picsum.photos/seed/tooth/800/1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-dashed border-primary/60 bg-white/80 dark:bg-black/60 rounded-full flex items-center justify-center text-center p-2">
                <span className="text-[10px] font-bold text-primary uppercase leading-tight">Your Logo Here</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg mb-1">Dentist Patient Gift</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Kid-friendly waiting room art</p>
                </div>
                <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors" onClick={(e) => e.preventDefault()}>
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <button className="w-full mt-2 bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white text-slate-900 dark:text-white font-medium py-2.5 rounded-lg transition-all text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
                Use Template
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Link>

          {/* Card 3: Corporate Branding */}
          <Link href="/brand" onClick={() => localStorage.setItem('coloring_book_template', 'corporate')} className="group relative bg-white dark:bg-[#2f1524] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer block">
            <div className="relative aspect-[4/5] bg-slate-100 dark:bg-black/20 overflow-hidden">
              <Image
                alt="Abstract geometric corporate pattern"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                src="https://picsum.photos/seed/corporate/800/1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded font-medium">
                New
              </div>
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-dashed border-primary/60 bg-white/80 dark:bg-black/60 rounded-full flex items-center justify-center text-center p-2">
                <span className="text-[10px] font-bold text-primary uppercase leading-tight">Your Logo Here</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg mb-1">Corporate Swag</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Stress relief for employees</p>
                </div>
                <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors" onClick={(e) => e.preventDefault()}>
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <button className="w-full mt-2 bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white text-slate-900 dark:text-white font-medium py-2.5 rounded-lg transition-all text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
                Use Template
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Link>

          {/* Card 4: Restaurant */}
          <Link href="/brand" onClick={() => localStorage.setItem('coloring_book_template', 'restaurant')} className="group relative bg-white dark:bg-[#2f1524] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all cursor-pointer block">
            <div className="relative aspect-[4/5] bg-slate-100 dark:bg-black/20 overflow-hidden">
              <Image
                alt="Food doodles coloring page"
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                src="https://picsum.photos/seed/food/800/1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-dashed border-primary/60 bg-white/80 dark:bg-black/60 rounded-full flex items-center justify-center text-center p-2">
                <span className="text-[10px] font-bold text-primary uppercase leading-tight">Your Logo Here</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg mb-1">Restaurant Menu</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Interactive kids menu design</p>
                </div>
                <button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors" onClick={(e) => e.preventDefault()}>
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <button className="w-full mt-2 bg-slate-100 dark:bg-white/5 hover:bg-primary hover:text-white text-slate-900 dark:text-white font-medium py-2.5 rounded-lg transition-all text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white">
                Use Template
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
