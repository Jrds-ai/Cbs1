'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Upload, Image as ImageIcon, Sparkles, ArrowRight, X, AlertCircle, Loader2 } from 'lucide-react';
import { storage } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/components/auth-provider';

export default function Step4() {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);

  useEffect(() => {
    // Load existing from localStorage
    const saved = localStorage.getItem('coloring_book_images');
    if (saved) {
      try {
        setSelectedImages(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const imgElement = document.createElement('img');
        imgElement.src = event.target?.result as string;
        imgElement.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = imgElement;
          const max_size = 1200;

          if (width > height) {
            if (width > max_size) {
              height *= max_size / width;
              width = max_size;
            }
          } else {
            if (height > max_size) {
              width *= max_size / height;
              height = max_size;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(imgElement, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        imgElement.onerror = (e) => reject(e);
      };
      reader.onerror = (e) => reject(e);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (!user) {
      setError('You must be logged in to upload images.');
      return;
    }

    setError('');
    const validFiles = files.filter(f => f.type.startsWith('image/'));

    if (validFiles.length !== files.length) {
      setError('Some files were skipped. Please upload only image files.');
    }

    setIsCompressing(true);

    try {
      const compressedImages = await Promise.all(validFiles.map(compressImage));

      // Upload directly to storage on selection to prevent localStorage overflow
      const uploadPromises = compressedImages.map(async (dataUrl, i) => {
        if (!storage) throw new Error('Storage missing');
        const imageId = `${Date.now()}_${i}`;
        const imageRef = ref(storage, `users/${user.uid}/drafts/${imageId}.jpg`);
        await uploadString(imageRef, dataUrl, 'data_url');
        return getDownloadURL(imageRef);
      });

      const newUrls = await Promise.all(uploadPromises);

      setSelectedImages(prev => {
        const newImages = [...prev, ...newUrls];
        localStorage.setItem('coloring_book_images', JSON.stringify(newImages));
        return newImages;
      });
    } catch (err) {
      console.error(err);
      setError('Error processing images. Please try again.');
    } finally {
      setIsCompressing(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setSelectedImages(prev => {
      const newImages = prev.filter((_, i) => i !== indexToRemove);
      localStorage.setItem('coloring_book_images', JSON.stringify(newImages));
      return newImages;
    });
  };

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      setError('Please upload at least one photo to continue.');
      return;
    }
    router.push('/create/step-5');
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-8">
        <div className="flex items-center gap-2 text-primary dark:text-pink-400 font-bold text-xs tracking-wider uppercase mb-3">
          <span className="bg-primary/10 dark:bg-primary/30 px-2.5 py-1 rounded-md text-primary dark:text-pink-300">Step 4</span>
          <span>Photo Upload</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3 tracking-tight text-slate-900 dark:text-white">
          Upload Your Photos
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base leading-relaxed">
          We&apos;ll transform these photos into magical coloring pages. You can select multiple!
        </p>
      </div>

      <div className="space-y-6">

        {/* Upload Button */}
        <div
          onClick={() => !isCompressing && fileInputRef.current?.click()}
          className={`relative rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 group cursor-pointer ${isCompressing ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/50 opacity-50 cursor-not-allowed' : 'border-primary/50 bg-primary/5 hover:bg-primary/10 dark:border-primary/30 dark:bg-primary/10 dark:hover:bg-primary/20'}`}
        >
          <div className="size-16 rounded-2xl bg-primary/20 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-500">
            {isCompressing ? <Loader2 className="w-8 h-8 animate-spin" /> : <Upload className="w-8 h-8" />}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            {isCompressing ? 'Uploading...' : 'Add Photos'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-pink-200/60 max-w-[200px] text-center">Tap to select one or more high quality photos.</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="hidden"
          />
        </div>

        {/* Selected Images Grid */}
        {selectedImages.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {selectedImages.map((imgSrc, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group border border-slate-200 dark:border-white/10">
                <Image
                  src={imgSrc}
                  alt={`Upload ${idx + 1}`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => removeImage(idx)}
                    className="size-10 rounded-full bg-white text-red-500 shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 animate-shake">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

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
              className={`group flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${selectedImages.length > 0 ? 'shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]' : 'opacity-50 cursor-not-allowed'}`}
              disabled={selectedImages.length === 0}
            >
              <span>Continue {selectedImages.length > 0 && `(${selectedImages.length})`}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}