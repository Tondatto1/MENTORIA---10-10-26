import React, { useEffect, useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { TimeLeft } from '../types';

// Target: 10 de outubro de 2026 às 08:00 BRT (UTC-3)
const TARGET_TIMESTAMP = new Date('2026-10-10T08:00:00-03:00').getTime();

export const Countdown: React.FC = () => {
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
    <div className="w-full">
      {/* Scarcity line */}
      <div className="flex items-center justify-between gap-2 text-xs font-bold uppercase tracking-wider pb-2">
        <span className="flex items-center gap-1.5 text-emerald-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
          </span>
          Vagas limitadas
        </span>
        <span className="text-amber-300 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          Restam poucas vagas
        </span>
      </div>

      {/* Countdown Display */}
      <div className="bg-emerald-950/90 text-white rounded-xl p-3 sm:p-4 shadow-lg border border-emerald-500/30 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-800/80 text-[11px] font-semibold text-emerald-200">
          <span className="flex items-center gap-1.5 text-emerald-100">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            Início em 10/10 às 08h (Horário de Brasília)
          </span>
          <span className="text-[#22c55e] font-black tracking-wide">AO VIVO</span>
        </div>

        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-lg py-2 px-1">
            <span className="block text-xl sm:text-2xl font-bold font-mono tabular-nums text-white leading-tight">
              {pad(timeLeft.days)}
            </span>
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Dias</span>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-lg py-2 px-1">
            <span className="block text-xl sm:text-2xl font-bold font-mono tabular-nums text-white leading-tight">
              {pad(timeLeft.hours)}
            </span>
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Horas</span>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-lg py-2 px-1">
            <span className="block text-xl sm:text-2xl font-bold font-mono tabular-nums text-white leading-tight">
              {pad(timeLeft.minutes)}
            </span>
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Min</span>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-lg py-2 px-1">
            <span className="block text-xl sm:text-2xl font-bold font-mono tabular-nums text-[#22c55e] leading-tight">
              {pad(timeLeft.seconds)}
            </span>
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Seg</span>
          </div>
        </div>
      </div>
    </div>
  );
};
