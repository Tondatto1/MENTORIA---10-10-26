import React, { useState } from 'react';
import { User, Phone, Mail, ArrowRight, ShieldCheck, BellOff, Users, Gift, Lock } from 'lucide-react';
import { formatPhoneNumber, isValidPhone, isValidEmail } from '../utils/phoneMask';
import { Lead } from '../types';

interface Props {
  onSubmitSuccess: (lead: Lead) => void;
}

const OFFICIAL_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbw93N6jqvSQY0dduJpLBb8DFro21ohgiTSsVlNP5FayRHXlM_KR-H3-_06V9sYaHtjvbw/exec';

export const LeadForm: React.FC<Props> = ({ onSubmitSuccess }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  const [touched, setTouched] = useState({
    name: false,
    whatsapp: false,
    email: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setWhatsapp(formatted);
  };

  const nameError = touched.name && name.trim().length < 3 ? 'Informe seu nome completo' : '';
  const phoneError = touched.whatsapp && !isValidPhone(whatsapp) ? 'Informe um WhatsApp válido com DDD' : '';
  const emailError = touched.email && !isValidEmail(email) ? 'Informe um e-mail válido' : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, whatsapp: true, email: true });

    if (name.trim().length < 3) {
      setErrorMsg('Por favor, preencha seu nome completo.');
      return;
    }
    if (!isValidPhone(whatsapp)) {
      setErrorMsg('Por favor, informe um WhatsApp válido com DDD (ex: (11) 98765-4321).');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    const newLead: Lead = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('agro_mentoria_leads') || '[]');
      existing.unshift(newLead);
      localStorage.setItem('agro_mentoria_leads', JSON.stringify(existing));
      localStorage.setItem('agro_mentoria_current_user', JSON.stringify(newLead));

      // Envia automaticamente para o Google Planilhas oficial
      const sheetsWebhook = localStorage.getItem('agro_sheets_webhook_url') || OFFICIAL_SHEETS_WEBHOOK_URL;
      if (sheetsWebhook && sheetsWebhook.startsWith('http')) {
        fetch(sheetsWebhook, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataHora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            nome: newLead.name,
            whatsapp: newLead.whatsapp,
            email: newLead.email,
          }),
        }).catch((err) => console.warn('Sheets dispatch warning:', err));
      }
    } catch {
      // ignore storage errors
    }

    // Smooth transition
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(newLead);
    }, 400);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white px-6 py-5 text-center sm:text-left border-b border-slate-800">
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
              Inscrição 100% Gratuita
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Garanta sua participação
            </h3>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 shrink-0">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Acesso seguro</span>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-6 sm:p-7 space-y-5">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Field 1: Nome */}
          <div>
            <label htmlFor="lead-name" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Nome:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="lead-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                placeholder="Seu nome completo"
                autoComplete="name"
                required
                className={`w-full pl-10 pr-4 py-3.5 text-sm sm:text-base text-slate-900 bg-white border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 shadow-xs ${
                  nameError
                    ? 'border-rose-400 focus:ring-rose-500/20'
                    : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'
                }`}
              />
            </div>
            {nameError && (
              <p className="mt-1 text-xs text-rose-600 font-medium pl-1">{nameError}</p>
            )}
          </div>

          {/* Field 2: Seu melhor email */}
          <div>
            <label htmlFor="lead-email" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Seu melhor email:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                placeholder="seu.email@exemplo.com.br"
                autoComplete="email"
                required
                className={`w-full pl-10 pr-4 py-3.5 text-sm sm:text-base text-slate-900 bg-white border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 shadow-xs ${
                  emailError
                    ? 'border-rose-400 focus:ring-rose-500/20'
                    : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'
                }`}
              />
            </div>
            {emailError && (
              <p className="mt-1 text-xs text-rose-600 font-medium pl-1">{emailError}</p>
            )}
          </div>

          {/* Field 3: Whatsapp com DDD */}
          <div>
            <label htmlFor="lead-phone" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
              Whatsapp com DDD:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="lead-phone"
                type="tel"
                value={whatsapp}
                onChange={handlePhoneChange}
                onBlur={() => setTouched((prev) => ({ ...prev, whatsapp: true }))}
                placeholder="(00) 00000-0000"
                autoComplete="tel"
                required
                className={`w-full pl-10 pr-4 py-3.5 text-sm sm:text-base text-slate-900 bg-white border rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 shadow-xs ${
                  phoneError
                    ? 'border-rose-400 focus:ring-rose-500/20'
                    : 'border-slate-300 focus:border-emerald-600 focus:ring-emerald-500/20'
                }`}
              />
            </div>
            {phoneError && (
              <p className="mt-1 text-xs text-rose-600 font-medium pl-1">{phoneError}</p>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Primary CTA Button: GARANTIR MINHA VAGA > styled like the reference */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-slate-950 font-black text-base sm:text-lg tracking-wider uppercase bg-[#22c55e] hover:bg-[#16a34a] active:bg-[#15803d] shadow-lg shadow-emerald-500/30 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Reservando vaga...</span>
                </>
              ) : (
                <>
                  <span>GARANTIR MINHA VAGA</span>
                  <ArrowRight className="w-5 h-5 stroke-[3] shrink-0" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-2">
              Seus dados estão protegidos. Não enviamos spam.
            </p>
          </div>
        </form>

        {/* REFORÇOS DE CONVERSÃO */}
        <div className="pt-5 border-t border-slate-100">
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                <BellOff className="w-3.5 h-3.5" />
              </span>
              <span className="font-semibold text-slate-800">
                Grupo silencioso
              </span>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="p-1 rounded-md bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <span>
                Você receberá apenas informações essenciais sobre a mentoria.
              </span>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="p-1 rounded-md bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                <Users className="w-3.5 h-3.5" />
              </span>
              <span>
                Mentoria exclusiva para participantes do grupo.
              </span>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="p-1 rounded-md bg-amber-50 text-amber-700 shrink-0 mt-0.5">
                <Gift className="w-3.5 h-3.5" />
              </span>
              <span>
                Quem estiver presente ao vivo receberá um presente especial.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
