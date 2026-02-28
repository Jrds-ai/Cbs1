'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Camera, Upload, Image as ImageIcon, Sparkles, ArrowRight, X, AlertCircle } from 'lucide-react';

export default function Step4() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      setError('Please upload a photo to continue.');
      return;
    }
    router.push('/create/preview');
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-8">
        <div className="flex items-center gap-2 text-primary dark:text-pink-400 font-bold text-xs tracking-wider uppercase mb-3">
          <span className="bg-primary/10 dark:bg-primary/30 px-2.5 py-1 rounded-md text-primary dark:text-pink-300">Step 4</span>
          <span>Photo Upload</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3 tracking-tight text-slate-900 dark:text-white">
          Upload Your Photo
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base leading-relaxed">
          We&apos;ll transform this photo into a magical coloring page.
        </p>
      </div>

      <div className="space-y-6">
        <div 
          onClick={() => !selectedImage && fileInputRef.current?.click()}
          className={`relative aspect-square rounded-[32px] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center overflow-hidden group cursor-pointer ${selectedImage ? 'border-primary bg-white dark:bg-white/5' : 'border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-primary/50 hover:bg-pink-50/30 dark:hover:bg-primary/5'}`}
        >
          {selectedImage ? (
            <>
              <Image 
                src={selectedImage} 
                alt="Preview" 
                fill 
                className="object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                  className="size-14 rounded-full bg-white text-red-500 shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center p-8 text-center">
              <div className="size-20 rounded-3xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-pink-400 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-primary/5">
                <Upload className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Tap to upload</h3>
              <p className="text-sm text-slate-500 dark:text-pink-200/60 max-w-[200px]">High quality photos work best for AI magic.</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-pink-200/80 uppercase tracking-wide">Take Photo</span>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center gap-3">
            <div className="size-10 rounded-xl bg-fuchsia-100 dark:bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-pink-200/80 uppercase tracking-wide">Gallery</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-30">
        <div className="h-16 w-full bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        <div className="bg-background-light/80 dark:bg-background-dark/80 border-t border-slate-200 dark:border-white/5 p-6 safe-area-bottom backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full flex items-center gap-4">
            <Link href="/create/step-3" className="px-6 py-4 rounded-xl font-bold text-slate-500 dark:text-pink-200/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm uppercase tracking-wide">
              Back
            </Link>
            <button 
              onClick={handleContinue}
              className="group flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
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