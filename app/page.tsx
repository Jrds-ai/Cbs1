'use client';

import { useAuth } from '@/components/auth-provider';
import Link from 'next/link';
import { Brush, ArrowRight, Rocket, PawPrint, Castle, Lightbulb } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex-1 flex flex-col px-6 pb-32 max-w-md mx-auto w-full pt-6 animate-fade-in">
      <div className="pb-8">
        <h1 className="text-3xl font-bold leading-tight mb-2 tracking-tight text-slate-900 dark:text-white">
          Hello, {user.name}! <span className="inline-block animate-bounce">👋</span>
        </h1>
        <p className="text-slate-500 dark:text-pink-200/70 text-base leading-relaxed">
          Ready to create some magic today?
        </p>
      </div>

      <Link href="/create/step-1" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-6 text-white shadow-xl shadow-primary/20 mb-8 group cursor-pointer transition-transform hover:scale-[1.01] block">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-yellow/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col h-full justify-between gap-6">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <Brush className="w-8 h-8" />
            </div>
            <span className="bg-white/20 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">New</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Create New Book</h2>
            <p className="text-white/80 text-sm mb-4">Turn your ideas into a beautiful custom coloring book in minutes.</p>
            <div className="w-full bg-white text-primary font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 group-hover:bg-pink-50 transition-colors">
              <span>Start Your Masterpiece</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Projects</h3>
        <Link href="/library" className="text-primary dark:text-pink-400 text-sm font-semibold hover:opacity-80 transition-opacity">See All</Link>
      </div>

      <div className="space-y-4">
        <ProjectCard 
          icon={<Rocket className="w-8 h-8" />}
          color="from-indigo-500 to-purple-600"
          status="In Progress"
          statusColor="text-accent-blue bg-accent-blue/10"
          time="2h ago"
          title="Space Adventure"
          subtitle="For: Leo's 5th Birthday"
        />
        <ProjectCard 
          icon={<PawPrint className="w-8 h-8" />}
          color="from-emerald-400 to-teal-600"
          status="Completed"
          statusColor="text-green-500 bg-green-500/10"
          time="1d ago"
          title="Forest Animals"
          subtitle="For: Kindergarten Class"
        />
        <ProjectCard 
          icon={<Castle className="w-8 h-8" />}
          color="from-rose-400 to-orange-500"
          status="Draft"
          statusColor="text-accent-yellow bg-accent-yellow/10"
          time="3d ago"
          title="Princess Tales"
          subtitle="For: Sarah"
        />
      </div>

      <div className="mt-8 rounded-3xl relative overflow-hidden p-[2px] bg-gradient-to-r from-accent-blue via-primary to-accent-yellow shadow-lg shadow-primary/10 dark:shadow-none">
        <div className="relative rounded-[22px] bg-white/95 dark:bg-[#3d0023]/95 backdrop-blur-sm p-5 flex items-center gap-4">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Pro Tip</h3>
            <p className="text-sm text-slate-500 dark:text-pink-200/70 leading-tight mt-1">Detailed descriptions help AI generate better images.</p>
          </div>
          <div className="absolute -right-6 -top-6 size-24 bg-primary/20 rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ icon, color, status, statusColor, time, title, subtitle }: any) {
  return (
    <Link href="/create/preview" className="group relative block">
      <div className="relative overflow-hidden flex flex-row gap-4 rounded-3xl bg-white dark:bg-white/5 p-4 border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 cursor-pointer">
        <div className={`size-20 shrink-0 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md`}>
          {icon}
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${statusColor}`}>{status}</span>
            <span className="text-xs text-slate-400 dark:text-pink-200/40">{time}</span>
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white truncate text-lg group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-sm text-slate-500 dark:text-pink-200/60 truncate">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
