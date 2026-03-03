'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import GenerativeLoader from '@/components/GenerativeLoader';
import { storage } from '@/lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/components/auth-provider';

export default function Preview() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const hasGenerated = useRef(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [bookTitle, setBookTitle] = useState<string>(''); // Default to empty string instead of null
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedCover = localStorage.getItem('coloring_book_cover_image');
    const savedTitle = localStorage.getItem('coloring_book_title');

    setCoverImage(savedCover);
    if (savedTitle) setBookTitle(savedTitle); // Update title state

    const generatePreview = async () => {
      setIsGenerating(true);
      setError(null);
      try {
        if (!user) {
          throw new Error("You must be logged in to generate a preview.");
        }
        if (!savedCover) {
          throw new Error("No cover image selected. Please go back to Step 5.");
        }

        const prompt = `This GPT acts as a creative assistant that transforms uploaded images into printable, blank coloring book pages. It uses the content and theme of the image as inspiration, applying generative fill techniques to extend the image to fit a standard 8.5"x11" paper size (specifically 800px by 1000px). The image is used for inspiration. The GPT extracts cute and fun visual elements from the image—such as characters, animals, patterns, or objects—and stylizes them into simplified, line-art style drawings suitable for coloring. It ensures all output is high contrast, clean, and ready for printing. It avoids shading, gray tones, or dense textures. If there is ambiguity in the image content, the GPT leans toward whimsical interpretations that are engaging for kids or casual coloring. The assistant can also add simple themed borders or extras like stars, hearts, or themed accessories, depending on the subject matter. If no image is provided, it requests one before proceeding. Importantly, integrate the text "${savedTitle || 'Coloring Book'}" elegantly into the design as the title of this cover page.

CRITICAL INSTRUCTION: You MUST return ONLY the raw Base64 Data URI string of the generated image (starting with 'data:image/...'). Do NOT include any conversational text, markdown formatting, or explanations whatsoever. Just the raw string.`;

        // Read admin-selected model from localStorage
        const MODELS: Record<string, { useModalities?: boolean }> = {
          'sourceful/riverflow-v2-standard-preview': { useModalities: false },
          'google/gemini-2.5-flash-image': { useModalities: true },
          'google/gemini-3.1-flash-image-preview': { useModalities: true },
          'google/gemini-3-pro-image-preview': { useModalities: true },
          'openai/gpt-5-image-mini': { useModalities: true },
          'openai/gpt-5-image': { useModalities: true },
        };
        const selectedModel = localStorage.getItem('admin_selected_model') || 'sourceful/riverflow-v2-standard-preview';
        const modelConfig = MODELS[selectedModel] || { useModalities: false };

        const res = await fetch('/api/generate-preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: savedCover,
            prompt: prompt,
            model: selectedModel,
            useModalities: modelConfig.useModalities,
          })
        });

        const data = await res.json();

        console.log("OPENROUTER RAW START: =======\n");
        console.log(data);
        console.log("OPENROUTER RAW END: =======\n");

        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to generate preview image');
        }

        // Upload the generated base64 directly to Firebase Storage before rendering
        if (!storage) throw new Error('Storage missing');
        const imageId = `cover_preview_${Date.now()}`;
        const imageRef = ref(storage, `users/${user.uid}/drafts/${imageId}.png`);

        await uploadString(imageRef, data.image, 'data_url');
        const downloadUrl = await getDownloadURL(imageRef);

        setGeneratedImage(downloadUrl);
      } catch (err: any) {
        console.error("Preview Generation Error:", err);
        setError(err.message);
      } finally {
        setIsGenerating(false);
      }
    };

    // Only run if we actually have the user object loaded, wait otherwise
    if (!loading) {
      if (user) {
        if (!hasGenerated.current) {
          hasGenerated.current = true;
          generatePreview();
        }
      } else {
        setError("You must be logged in to generate a preview.");
        setIsGenerating(false);
      }
    }
  }, [user, loading]);

  const handleContinue = () => {
    if (generatedImage) {
      localStorage.setItem('coloring_book_cover_preview', generatedImage);
    }
    router.push('/create/checkout');
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-6">
        <div className="flex items-center gap-2 text-primary dark:text-pink-400 font-bold text-xs tracking-wider uppercase mb-3">
          <span className="bg-primary/10 dark:bg-primary/30 px-2.5 py-1 rounded-md text-primary dark:text-pink-300">Step 6</span>
          <span>AI Generation</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3 tracking-tight text-slate-900 dark:text-white">
          {isGenerating ? 'Generating Magic...' : 'Your Masterpiece'}
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base leading-relaxed">
          {isGenerating
            ? 'Our AI is carefully crafting your coloring page cover. This may take up to 30 seconds.'
            : 'Here is your custom coloring page. Looks amazing!'}
        </p>
      </div>

      <div className="relative w-full max-w-[320px] mx-auto aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl shadow-primary/20 bg-slate-100 dark:bg-white/5">
        {isGenerating || !generatedImage ? (
          <GenerativeLoader
            imageUrl={coverImage || ''}
            isLoading={isGenerating}
          />
        ) : error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-red-50 dark:bg-red-900/10 animate-fade-in">
            <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-slate-900 dark:text-white font-bold mb-2">Generation Failed</p>
            <p className="text-sm text-slate-500 dark:text-pink-200/60 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-white dark:bg-white/10 rounded-xl font-bold shadow-sm hover:scale-105 transition-transform"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="absolute inset-0 p-4 animate-scale-in">
            <div className="w-full h-full rounded-[28px] border-4 border-slate-900 dark:border-white bg-white overflow-hidden relative">
              <Image
                src={generatedImage}
                alt={bookTitle || "Coloring Page Preview"}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {/* Ambient Background */}
        {!isGenerating && generatedImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 pointer-events-none -z-10" />
        )}
      </div>

      {!isGenerating && generatedImage && !error && (
        <div className="mt-8 flex flex-col gap-4 animate-slide-up">
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-4 px-6 rounded-2xl font-bold text-slate-700 dark:text-white bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Regenerate
            </button>
            <button
              onClick={handleContinue}
              className="flex-[2] py-4 px-6 rounded-2xl font-bold text-white bg-primary hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
            >
              Continue
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-center text-xs text-slate-500 dark:text-pink-200/50">
            Don't worry, you can always generate more options later!
          </p>
        </div>
      )}

      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 left-0 w-full z-30">
        <div className="h-16 w-full bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        <div className="bg-background-light/80 dark:bg-background-dark/80 border-t border-slate-200 dark:border-white/5 p-6 safe-area-bottom backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full flex items-center gap-4">
            <Link href="/create/step-5" className="px-6 py-4 rounded-xl font-bold text-slate-500 dark:text-pink-200/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm uppercase tracking-wide">
              Back
            </Link>
            <Link href="/create/checkout" className={`group flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${isGenerating || error ? 'opacity-50 pointer-events-none' : ''}`}>
              <span>Review Book</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}