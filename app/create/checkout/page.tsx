'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Truck, CreditCard, User, Home, Calendar, Lock, CheckCircle, AlertCircle, Globe, Loader2 } from 'lucide-react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/components/auth-provider';

export default function Checkout() {
  const router = useRouter();
  const { user } = useAuth();
  const [showInShowcase, setShowInShowcase] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!formData.zip.trim() || !/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = 'Valid ZIP required';
      isValid = false;
    }
    if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Valid card number required';
      isValid = false;
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.expiry)) {
      newErrors.expiry = 'Invalid expiry (MM/YY)';
      isValid = false;
    }
    if (formData.cvc.length < 3) {
      newErrors.cvc = 'Invalid CVC';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!user) {
      setSubmitError('You must be logged in to complete this order.');
      return;
    }

    setIsProcessing(true);
    setSubmitError('');

    try {
      // 1. Gather data from localStorage
      const title = localStorage.getItem('coloring_book_title') || 'Magical Book';
      const audience = localStorage.getItem('coloring_book_audience') || '';
      const style = localStorage.getItem('coloring_book_style') || 'cartoon';
      const isForKids = localStorage.getItem('coloring_book_for_kids') === 'true';
      const imagesRaw = localStorage.getItem('coloring_book_images') || '[]';
      const coverPreview = localStorage.getItem('coloring_book_cover_preview') || '';
      let images: string[] = [];
      try {
        images = JSON.parse(imagesRaw);
      } catch (e) { }

      // 2. Create foundational book document
      const bookRef = await addDoc(collection(db as any, 'books'), {
        userId: user.uid,
        title,
        audience,
        style,
        isForKids,
        image: coverPreview,
        status: 'Processing',
        createdAt: serverTimestamp(),
        showInShowcase,
        shippingInfo: {
          fullName: formData.fullName,
          city: formData.city,
          zip: formData.zip
        }
      });

      // 3. Update book with image URL references directly since they were uploaded in step-4
      await updateDoc(doc(db as any, 'books', bookRef.id), {
        sourceImages: images, // 'images' array now contains valid Firebase download URLs from Step 4
        updatedAt: serverTimestamp()
      });

      // Clear processing cache
      ['coloring_book_title', 'coloring_book_audience', 'coloring_book_style', 'coloring_book_for_kids', 'coloring_book_images', 'coloring_book_cover_preview'].forEach(key => localStorage.removeItem(key));

      router.push(`/create/success?id=${bookRef.id}`);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'An error occurred while processing your order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-8 animate-fade-in">
      <div className="pb-6">
        <div className="flex items-center gap-2 text-primary dark:text-pink-400 font-bold text-xs tracking-wider uppercase mb-3">
          <span className="bg-primary/10 dark:bg-primary/30 px-2.5 py-1 rounded-md text-primary dark:text-pink-300">Checkout</span>
          <span>Final Step</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-3 tracking-tight text-slate-900 dark:text-white">
          Shipping & Payment
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base leading-relaxed">
          Where should we send your magical masterpiece?
        </p>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-5 h-5 text-primary dark:text-pink-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Shipping Details</h2>
          </div>

          <div className="space-y-4">
            <div className="input-group group">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1 transition-colors">Full Name</label>
              <div className="relative">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Jane Doe"
                  className={`w-full bg-white dark:bg-white/5 border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all modern-input`}
                />
                <User className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${errors.fullName ? 'text-red-400' : 'text-slate-400 dark:text-white/30'} transition-colors`} />
              </div>
              {errors.fullName && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
            </div>

            <div className="input-group group">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1 transition-colors">Street Address</label>
              <div className="relative">
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. 123 Magic Lane"
                  className={`w-full bg-white dark:bg-white/5 border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all modern-input`}
                />
                <Home className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${errors.address ? 'text-red-400' : 'text-slate-400 dark:text-white/30'} transition-colors`} />
              </div>
              {errors.address && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="input-group group">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1 transition-colors">City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="New York"
                  className={`w-full bg-white dark:bg-white/5 border ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all modern-input`}
                />
                {errors.city && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.city}</p>}
              </div>
              <div className="input-group group">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1 transition-colors">Zip Code</label>
                <input
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  type="text"
                  placeholder="10001"
                  className={`w-full bg-white dark:bg-white/5 border ${errors.zip ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all modern-input`}
                />
                {errors.zip && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.zip}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-white/10 w-full"></div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary dark:text-pink-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payment Method</h2>
            </div>
            <div className="flex gap-2 opacity-50">
              <div className="w-8 h-5 bg-slate-300 dark:bg-white/20 rounded"></div>
              <div className="w-8 h-5 bg-slate-300 dark:bg-white/20 rounded"></div>
            </div>
          </div>

          <div className="input-group group">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1 transition-colors">Card Number</label>
            <div className="relative">
              <input
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                type="text"
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className={`w-full bg-white dark:bg-white/5 border ${errors.cardNumber ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all modern-input font-mono tracking-wider`}
              />
              <CreditCard className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${errors.cardNumber ? 'text-red-400' : 'text-slate-400 dark:text-white/30'} transition-colors`} />
            </div>
            {errors.cardNumber && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="input-group group">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1 transition-colors">Expiry Date</label>
              <div className="relative">
                <input
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  className={`w-full bg-white dark:bg-white/5 border ${errors.expiry ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all modern-input font-mono`}
                />
                <Calendar className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${errors.expiry ? 'text-red-400' : 'text-slate-400 dark:text-white/30'} transition-colors`} />
              </div>
              {errors.expiry && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.expiry}</p>}
            </div>
            <div className="input-group group">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-pink-200/50 mb-1.5 ml-1 transition-colors">CVC</label>
              <div className="relative">
                <input
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  type="text"
                  placeholder="123"
                  maxLength={4}
                  className={`w-full bg-white dark:bg-white/5 border ${errors.cvc ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-white/10 focus:border-primary focus:ring-primary'} rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:ring-1 transition-all modern-input font-mono`}
                />
                <Lock className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${errors.cvc ? 'text-red-400' : 'text-slate-400 dark:text-white/30'} transition-colors`} />
              </div>
              {errors.cvc && <p className="text-xs text-red-500 mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.cvc}</p>}
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-200 dark:bg-white/10 w-full"></div>

        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary dark:text-pink-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Showcase</h2>
            </div>
          </div>

          <label className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 cursor-pointer hover:border-primary/50 transition-colors">
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Publish to Showcase</span>
              <span className="text-xs text-slate-500 dark:text-pink-200/60 mt-0.5">Allow others to see and be inspired by your creation</span>
            </div>
            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${showInShowcase ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}>
              <input
                type="checkbox"
                className="sr-only"
                checked={showInShowcase}
                onChange={(e) => setShowInShowcase(e.target.checked)}
              />
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showInShowcase ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
          </label>
        </div>

        <div className="rounded-3xl relative overflow-hidden p-[2px] bg-gradient-to-r from-accent-blue/30 via-primary/30 to-accent-yellow/30 shadow-lg shadow-primary/5 dark:shadow-none">
          <div className="relative rounded-[22px] bg-white/95 dark:bg-[#2a1220]/95 backdrop-blur-sm p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-500 dark:text-pink-200/70 text-sm">Hardcover Book</span>
              <span className="text-slate-900 dark:text-white font-bold">$29.99</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-500 dark:text-pink-200/70 text-sm">Express Shipping</span>
              <span className="text-slate-900 dark:text-white font-bold">$4.99</span>
            </div>
            <div className="h-px bg-slate-200 dark:bg-white/10 w-full my-3"></div>
            <div className="flex justify-between items-center">
              <span className="text-slate-900 dark:text-white font-bold text-lg">Total</span>
              <span className="text-primary dark:text-pink-400 font-bold text-xl">$34.98</span>
            </div>
          </div>
        </div>

        {submitError && (
          <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{submitError}</p>
          </div>
        )}
      </form>

      <div className="fixed bottom-0 left-0 w-full z-30">
        <div className="h-16 w-full bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
        <div className="bg-background-light/80 dark:bg-background-dark/80 border-t border-slate-200 dark:border-white/5 p-6 safe-area-bottom backdrop-blur-xl">
          <div className="max-w-md mx-auto w-full flex items-center gap-4">
            <Link href="/create/preview" className="px-6 py-4 rounded-xl font-bold text-slate-500 dark:text-pink-200/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm uppercase tracking-wide">
              Back
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`group flex-1 bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed shadow-none' : 'shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98]'}`}
            >
              {isProcessing ? (
                <>
                  <span>Processing...</span>
                  <Loader2 className="w-5 h-5 animate-spin" />
                </>
              ) : (
                <>
                  <span>Complete Order</span>
                  <CheckCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
