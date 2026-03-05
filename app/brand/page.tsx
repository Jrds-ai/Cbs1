'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, UploadCloud, Globe, Image as ImageIcon, AlertCircle, Sparkles, Loader2 } from 'lucide-react';

export default function BrandYourBook() {
  const router = useRouter();

  const [logo, setLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [cta, setCta] = useState('');

  const [errors, setErrors] = useState<{
    logo?: string;
    companyName?: string;
    websiteUrl?: string;
    cta?: string;
  }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [logoPrompt, setLogoPrompt] = useState('');
  const [showLogoPrompt, setShowLogoPrompt] = useState(false);

  const generateLogo = async () => {
    if (!logoPrompt.trim()) return;
    setIsGeneratingLogo(true);
    setErrors(prev => ({ ...prev, logo: undefined }));

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: `A professional, clean business logo for: ${logoPrompt}. Vector style, white background, high quality, vibrant colors.`,
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setLogo(`data:image/png;base64,${base64Data}`);
          setShowLogoPrompt(false);
          break;
        }
      }
    } catch (e: any) {
      console.error('Error generating logo:', e);
      setErrors(prev => ({ ...prev, logo: 'Failed to generate logo. Please try again.' }));
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrors(prev => ({ ...prev, logo: undefined }));

    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, logo: 'Please upload a valid JPG, PNG, or SVG file.' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: 'File size must be less than 5MB.' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogo(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!companyName.trim()) {
      newErrors.companyName = 'Company name is required.';
      isValid = false;
    }

    if (websiteUrl && !/^https?:\/\/.+\..+/.test(websiteUrl)) {
      newErrors.websiteUrl = 'Please enter a valid URL (e.g., https://example.com).';
      isValid = false;
    }

    if (cta.length > 60) {
      newErrors.cta = 'Call to action must be 60 characters or less.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('coloring_book_company', companyName.trim());
      localStorage.setItem('coloring_book_website', websiteUrl.trim());
      localStorage.setItem('coloring_book_cta', cta.trim());
      if (logo) localStorage.setItem('coloring_book_logo', logo);
      router.push('/create/checkout');
    }
  };

  return (
    <div className="flex-1 flex flex-col antialiased selection:bg-primary selection:text-white">
      <header className="sticky top-0 z-10 flex items-center bg-background-light dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-white/10">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-900 dark:text-white" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white mr-10">Brand Your Book</h1>
      </header>

      <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-lg mx-auto w-full gap-6">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-bold leading-tight text-slate-900 dark:text-white">Customize Your Marketing Book</h2>
          <p className="mt-2 text-base font-normal leading-normal text-slate-600 dark:text-slate-400">Add your branding details. These will be professionally printed on the back cover of your books.</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-base font-bold text-slate-900 dark:text-white">Business Logo</label>
            <button
              onClick={() => setShowLogoPrompt(!showLogoPrompt)}
              className="text-sm font-bold text-primary dark:text-pink-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-4 h-4" />
              Generate with AI
            </button>
          </div>

          {showLogoPrompt && (
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4 flex flex-col gap-3 animate-fade-in">
              <label className="text-sm font-bold text-slate-900 dark:text-white">Describe your logo</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={logoPrompt}
                  onChange={(e) => setLogoPrompt(e.target.value)}
                  placeholder="e.g. A cute tooth with a toothbrush, blue colors"
                  className="flex-1 bg-white dark:bg-[#2d1a24] border border-gray-300 dark:border-[#5a3a4b] rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  disabled={isGeneratingLogo}
                />
                <button
                  onClick={generateLogo}
                  disabled={isGeneratingLogo || !logoPrompt.trim()}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGeneratingLogo ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                  ) : (
                    'Generate'
                  )}
                </button>
              </div>
            </div>
          )}

          <div
            className={`group relative flex flex-col items-center gap-4 rounded-xl border-2 border-dashed ${errors.logo ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-primary/40 bg-[#36222d]/50 dark:bg-[#2d1a24] hover:border-primary hover:bg-primary/5'} px-6 py-10 transition-colors`}
          >
            {logo ? (
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white flex items-center justify-center p-2">
                <Image
                  src={logo}
                  alt="Logo preview"
                  fill
                  className="object-contain p-2"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/20 text-primary">
                <UploadCloud className="w-8 h-8" />
              </div>
            )}
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-base font-bold text-slate-900 dark:text-white">{logo ? 'Change logo' : 'Click to upload logo'}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">SVG, PNG, or JPG (Max 5MB)</p>
            </div>
            <input
              ref={fileInputRef}
              accept="image/jpeg, image/png, image/svg+xml"
              className="absolute inset-0 cursor-pointer opacity-0"
              type="file"
              onChange={handleLogoUpload}
            />
          </div>
          {errors.logo && (
            <p className="text-sm text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle className="w-4 h-4" /> {errors.logo}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-base font-medium text-slate-900 dark:text-white">Company Name <span className="text-red-500">*</span></span>
            <input
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (errors.companyName) setErrors(prev => ({ ...prev, companyName: undefined }));
              }}
              className={`form-input h-12 w-full rounded-lg border ${errors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-[#5a3a4b] focus:border-primary focus:ring-primary'} bg-white dark:bg-[#2d1a24] px-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:outline-none transition-all`}
              placeholder="e.g. Acme Dental Clinic"
              type="text"
            />
            {errors.companyName && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.companyName}</p>}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-base font-medium text-slate-900 dark:text-white">Website URL</span>
            <div className="relative">
              <Globe className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.websiteUrl ? 'text-red-400' : 'text-slate-400'}`} />
              <input
                value={websiteUrl}
                onChange={(e) => {
                  setWebsiteUrl(e.target.value);
                  if (errors.websiteUrl) setErrors(prev => ({ ...prev, websiteUrl: undefined }));
                }}
                className={`form-input h-12 w-full rounded-lg border ${errors.websiteUrl ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-[#5a3a4b] focus:border-primary focus:ring-primary'} bg-white dark:bg-[#2d1a24] pl-11 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:outline-none transition-all`}
                placeholder="https://www.yourbusiness.com"
                type="url"
              />
            </div>
            {errors.websiteUrl && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.websiteUrl}</p>}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-base font-medium text-slate-900 dark:text-white">Call to Action</span>
            <textarea
              value={cta}
              onChange={(e) => {
                setCta(e.target.value);
                if (errors.cta && e.target.value.length <= 60) setErrors(prev => ({ ...prev, cta: undefined }));
              }}
              className={`form-textarea w-full rounded-lg border ${errors.cta ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-[#5a3a4b] focus:border-primary focus:ring-primary'} bg-white dark:bg-[#2d1a24] p-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:outline-none resize-none h-24 transition-all`}
              placeholder="e.g. Visit us for a free checkup! Scan the QR code to book now."
            ></textarea>
            <div className="flex justify-between items-center">
              {errors.cta ? (
                <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.cta}</p>
              ) : <span></span>}
              <p className={`text-xs ${cta.length > 60 ? 'text-red-500 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                {cta.length}/60 characters
              </p>
            </div>
          </label>
        </div>

        <div className="mt-4">
          <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Preview Back Cover</h3>
          <div className="relative w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-[#2d1a24] shadow-lg border border-gray-200 dark:border-white/5 aspect-[3/4]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2d1a24] via-[#4a2e3d] to-primary/20 opacity-50"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
              <div className="mb-6 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden relative">
                  {logo ? (
                    <Image
                      src={logo}
                      alt="Logo"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <ImageIcon className="text-white/50 w-10 h-10" />
                  )}
                </div>
              </div>

              <h4 className="text-xl font-bold text-white mb-2 break-words w-full px-2">
                {companyName || 'Acme Dental Clinic'}
              </h4>
              <p className="text-sm text-white/80 mb-6 break-words w-full px-2">
                {cta || 'Visit us for a free checkup! Scan the QR code to book now.'}
              </p>

              <div className="mt-auto flex flex-col items-center gap-3 w-full">
                <div className="bg-white p-2 rounded-lg relative w-24 h-24">
                  <Image
                    alt="QR Code Placeholder"
                    fill
                    className="opacity-90 mix-blend-multiply p-2"
                    src="https://picsum.photos/100/100"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs font-medium text-white/60 tracking-wider uppercase break-all px-2">
                  {websiteUrl ? websiteUrl.replace(/^https?:\/\//, '') : 'www.yourbusiness.com'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-8"></div>
      </main>

      <div className="sticky bottom-0 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10 p-4 backdrop-blur-lg z-20">
        <div className="max-w-lg mx-auto flex gap-3">
          <button className="flex-1 rounded-xl bg-white dark:bg-[#36222d] border border-gray-300 dark:border-[#5a3a4b] h-12 text-slate-900 dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
            Preview PDF
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-xl bg-primary h-12 text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
