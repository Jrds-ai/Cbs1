'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sparkles, Brush, Palette, LayoutGrid, ArrowRight, AlertCircle } from 'lucide-react';

export default function Step3() {
  const router = useRouter();
  const [artStyle, setArtStyle] = useState('cartoon');
  const [error, setError] = useState('');

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!artStyle) {
      setError('Please select an art style to continue.');
      return;
    }

    // Save to localStorage for later creation
    localStorage.setItem('coloring_book_style', artStyle);

    router.push('/create/step-4');
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-6">
        <div className="flex items-center gap-2 text-primary dark:text-pink-400 font-bold text-xs tracking-wider uppercase mb-3">
          <span className="bg-primary/10 dark:bg-primary/30 px-2.5 py-1 rounded-md text-primary dark:text-pink-300">Step 3</span>
          <span>Art Style</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3 tracking-tight text-slate-900 dark:text-white">
          Select Your Art Style
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base leading-relaxed">
          Choose the artistic vibe for your coloring book. This sets the tone for all illustrations.
        </p>
      </div>

      <div className="space-y-6">
        <StyleOption
          id="cartoon"
          icon={<Sparkles className="w-7 h-7" />}
          title="Playful Cartoon"
          description="Bold lines and simple shapes. Perfect for younger kids and fun themes."
          colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
          checked={artStyle === 'cartoon'}
          onChange={(val: string) => {
            setArtStyle(val);
            setError('');
          }}
        />
        <StyleOption
          id="realistic"
          icon={<Brush className="w-7 h-7" />}
          title="Detailed Realistic"
          description="Intricate details and lifelike proportions. Ideal for adults and nature lovers."
          colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300"
          checked={artStyle === 'realistic'}
          onChange={(val: string) => {
            setArtStyle(val);
            setError('');
          }}
        />
        <StyleOption
          id="abstract"
          icon={<Palette className="w-7 h-7" />}
          title="Whimsical Abstract"
          description="Creative patterns and dreamy scenes. Great for relaxation and mindfulness."
          colorClass="bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300"
          checked={artStyle === 'abstract'}
          onChange={(val: string) => {
            setArtStyle(val);
            setError('');
          }}
        />
        <StyleOption
          id="mandala"
          icon={<LayoutGrid className="w-7 h-7" />}
          title="Geometric Mandala"
          description="Symmetrical designs and complex geometries. The ultimate stress reliever."
          colorClass="bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300"
          checked={artStyle === 'mandala'}
          onChange={(val: string) => {
            setArtStyle(val);
            setError('');
          }}
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-4 ml-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {error}</p>}

      <div className="mt-8 rounded-3xl relative overflow-hidden p-[2px] bg-gradient-to-r from-accent-blue via-primary to-accent-yellow shadow-lg shadow-primary/10 dark:shadow-none">
        <div className="relative rounded-[22px] bg-white/95 dark:bg-[#3d0023]/95 backdrop-blur-sm p-5 flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">AI Enhanced</h3>
            <p className="text-sm text-slate-500 dark:text-pink-200/70 leading-tight mt-1">Our AI adapts the complexity of drawings based on the style you choose.</p>
          </div>
          <div className="absolute -right-6 -top-6 size-24 bg-primary/20 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-30">
        <div className="h-16 w-full bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        <div className="bg-background-light/80 dark:bg-background-dark/80 border-t border-slate-200 dark:border-white/5 p-6 safe-area-bottom backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full flex items-center gap-4">
            <Link href="/create/step-2" className="px-6 py-4 rounded-xl font-bold text-slate-500 dark:text-pink-200/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm uppercase tracking-wide">
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

function StyleOption({ id, icon, title, description, colorClass, checked, onChange }: any) {
  return (
    <label className="cursor-pointer group relative block">
      <input
        type="radio"
        name="art_style"
        value={id}
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="relative overflow-hidden flex flex-col gap-4 rounded-3xl bg-white dark:bg-white/5 p-5 border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary peer-checked:bg-pink-50/50 dark:peer-checked:bg-primary/10">
        <div className="flex items-start justify-between">
          <div className={`flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 ${colorClass}`}>
            {icon}
          </div>
          <div className="size-6 rounded-full border-2 border-slate-200 dark:border-slate-600 peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center transition-all">
            <div className="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all"></div>
          </div>
        </div>
        <div className="flex flex-col gap-1 z-10">
          <span className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors">{title}</span>
          <p className="text-sm text-slate-500 dark:text-pink-200/60 leading-snug">{description}</p>
        </div>
      </div>
    </label>
  );
}
