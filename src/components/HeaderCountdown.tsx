import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { TimeLeft } from '../types';

// Target: 10 de outubro de 2026 às 08:00 BRT (UTC-3)
const TARGET_TIMESTAMP = new Date('2026-10-10T08:00:00-03:00').getTime();

export const HeaderCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const diff = TARGET_TIMESTAMP - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isPast: false,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = TARGET_TIMESTAMP - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isPast: false,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-1.5 sm:gap-3.5 bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border-2 border-[#22c55e]/90 px-2 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-xl shadow-emerald-950/60 text-white backdrop-blur-lg transition-transform hover:scale-[1.02] max-w-full">
      {/* Live Badge */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]"></span>
        </span>
        <div className="leading-tight">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#22c55e] block">
            AO VIVO 10/10 • 08H
          </span>
          <span className="text-[9px] text-emerald-200/80 font-semibold hidden md:block">
            RESTAM POUCAS VAGAS
          </span>
        </div>
      </div>

      <div className="h-6 w-px bg-emerald-700/60 mx-0.5 sm:mx-1 shrink-0" />

      {/* Countdown Digits */}
      <div className="flex items-center gap-1 sm:gap-1.5 font-mono font-black text-xs sm:text-base tabular-nums">
        <div className="bg-emerald-900/90 border border-emerald-500/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-center min-w-[28px] sm:min-w-[34px] shadow-inner">
          <span className="text-white block leading-tight">{pad(timeLeft.days)}</span>
          <span className="text-[8px] text-emerald-300 font-sans uppercase font-bold block -mt-0.5">d</span>
        </div>

        <span className="text-[#22c55e] font-bold text-xs sm:text-sm animate-pulse">:</span>

        <div className="bg-emerald-900/90 border border-emerald-500/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-center min-w-[28px] sm:min-w-[34px] shadow-inner">
          <span className="text-white block leading-tight">{pad(timeLeft.hours)}</span>
          <span className="text-[8px] text-emerald-300 font-sans uppercase font-bold block -mt-0.5">h</span>
        </div>

        <span className="text-[#22c55e] font-bold text-xs sm:text-sm animate-pulse">:</span>

        <div className="bg-emerald-900/90 border border-emerald-500/40 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-center min-w-[28px] sm:min-w-[34px] shadow-inner">
          <span className="text-white block leading-tight">{pad(timeLeft.minutes)}</span>
          <span className="text-[8px] text-emerald-300 font-sans uppercase font-bold block -mt-0.5">m</span>
        </div>

        <span className="text-[#22c55e] font-bold text-xs sm:text-sm animate-pulse">:</span>

        <div className="bg-[#22c55e] border border-emerald-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg text-center min-w-[28px] sm:min-w-[34px] shadow-md shadow-emerald-500/40">
          <span className="text-slate-950 block leading-tight font-black">{pad(timeLeft.seconds)}</span>
          <span className="text-[8px] text-slate-950 font-sans uppercase font-black block -mt-0.5">s</span>
        </div>
      </div>
    </div>
  );
};
