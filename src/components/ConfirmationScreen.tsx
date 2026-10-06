import React from 'react';
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Lead } from '../types';

interface Props {
  lead?: Lead;
  onReset?: () => void;
  whatsappGroupUrl?: string;
}

export const ConfirmationScreen: React.FC<Props> = ({
  whatsappGroupUrl = 'https://chat.whatsapp.com/GMOV1AuBcOyBEN0NBlC1xG',
}) => {
  const handleJoinWhatsApp = () => {
    // Open in new tab or direct app
    window.open(whatsappGroupUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden text-center p-6 sm:p-8">
      {/* Icon Check */}
      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-600">
        <CheckCircle2 className="w-9 h-9" />
      </div>

      {/* Mandatory step badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-3">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        Etapa obrigatória para validar sua vaga
      </div>

      {/* Headline */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
        Cadastro realizado.
      </h2>

      {/* Main explanation text */}
      <p className="text-slate-700 text-base sm:text-lg font-medium leading-relaxed max-w-md mx-auto mb-6">
        Agora entre no grupo oficial e silencioso da mentoria para receber seu acesso e as informações essenciais.
      </p>

      {/* Primary WhatsApp Action Button */}
      <div className="space-y-3 mb-6">
        <a
          href={whatsappGroupUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleJoinWhatsApp}
          className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-slate-950 font-black text-base sm:text-lg tracking-wide uppercase bg-[#22c55e] hover:bg-[#16a34a] active:bg-[#15803d] shadow-lg shadow-emerald-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <MessageCircle className="w-6 h-6 fill-slate-950 text-[#22c55e] shrink-0" />
          <span>ENTRAR NO GRUPO DA MENTORIA</span>
          <ArrowRight className="w-5 h-5 stroke-[3] shrink-0" />
        </a>

        <p className="text-xs text-slate-500">
          Você será direcionado diretamente para o aplicativo do WhatsApp.
        </p>
      </div>

      {/* Essential reminder badge */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 text-center text-xs text-slate-700 font-semibold flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Grupo 100% silencioso e protegido</span>
      </div>
    </div>
  );
};
