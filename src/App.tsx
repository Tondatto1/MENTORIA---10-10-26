import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { HeaderCountdown } from './components/HeaderCountdown';
import { LeadForm } from './components/LeadForm';
import { ConfirmationScreen } from './components/ConfirmationScreen';
import { Lead } from './types';
import ceruttiPhoto from './assets/images/cerutti_foto.png';
import ceruttiWebp from './assets/images/cerutti_foto.webp';
import logoImg from './assets/images/logo_branca.png';

export default function App() {
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const OFFICIAL_WHATSAPP_URL = 'https://chat.whatsapp.com/GMOV1AuBcOyBEN0NBlC1xG';

  const [whatsappGroupUrl] = useState<string>(() => {
    const stored = localStorage.getItem('agro_whatsapp_group_url');
    if (!stored || stored.includes('invite/mentoria-comercial-agro')) {
      return OFFICIAL_WHATSAPP_URL;
    }
    return stored;
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('agro_mentoria_current_user');
      if (savedUser) {
        setCurrentLead(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLeadSuccess = (lead: Lead) => {
    setCurrentLead(lead);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetRegistration = () => {
    localStorage.removeItem('agro_mentoria_current_user');
    setCurrentLead(null);
  };

  const handleGoHome = () => {
    setCurrentLead(null);
    localStorage.removeItem('agro_mentoria_current_user');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToForm = () => {
    const element = document.getElementById('formulario-inscricao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#023522] via-[#085a3a] via-45% to-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-[#22c55e] selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Background Lighting & Inspired Circular Tech/Agro Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top Radial Green Flare */}
        <div className="absolute -top-32 -left-32 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] bg-[#22c55e]/25 rounded-full blur-[120px] sm:blur-[140px]" />
        
        {/* Central Luminous Portal Rings */}
        <div className="hidden lg:block absolute top-12 right-2 xl:right-10 w-[640px] h-[640px] rounded-full border border-emerald-400/25 opacity-70 animate-pulse pointer-events-none" />
        <div className="hidden lg:block absolute top-20 right-10 xl:right-20 w-[520px] h-[520px] rounded-full border-2 border-emerald-300/40 opacity-80 pointer-events-none" />
        <div className="hidden lg:block absolute top-32 right-16 xl:right-28 w-[400px] h-[400px] rounded-full border border-emerald-400/20 pointer-events-none" />
        <div className="absolute top-16 right-0 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-emerald-400/20 sm:bg-emerald-400/25 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />
        
        {/* Ambient bottom white glow for smooth blending */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* TOP HEADER: Logo apenas no Desktop/Tablet; No Mobile exibe APENAS o Cronômetro centralizado */}
      <header className="relative z-30 w-full border-b border-emerald-700/40 bg-emerald-950/80 backdrop-blur-md sticky top-0 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Brand Logo Oficial - OCULTO NO MOBILE (sm:flex), VISÍVEL A PARTIR DE TABLET/DESKTOP */}
          <button
            type="button"
            onClick={handleGoHome}
            className="hidden sm:flex items-center group cursor-pointer text-left bg-transparent border-0 p-0 focus:outline-none transition-transform duration-200 hover:scale-[1.03]"
            title="Voltar para a página inicial"
          >
            <img
              src={logoImg}
              alt="Agrovendedor - Marcelo Cerutti"
              className="h-9 sm:h-11 md:h-12 w-auto max-w-[190px] sm:max-w-[240px] object-contain drop-shadow-sm brightness-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/logo - letra branca - transp.png';
              }}
            />
          </button>

          {/* CRONÔMETRO NO HEADER: CENTRALIZADO E PROTAGONISTA NO MOBILE, ALINHADO À DIREITA NO DESKTOP */}
          <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end">
            <HeaderCountdown />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-12">
        {currentLead ? (
          /* Confirmation Screen after registration */
          <div className="py-4 sm:py-10 animate-fade-in">
            <ConfirmationScreen
              lead={currentLead}
              onReset={handleResetRegistration}
              whatsappGroupUrl={whatsappGroupUrl}
            />
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-16">
            
            {/* PRIMEIRA DOBRA: Estruturação Otimizada para Mobile e Desktop */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-1 sm:pt-4">
              
              {/* Left Column: Headline, Mentoria Info, Destaque Data/Hora, Botão QUERO PARTICIPAR */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-white text-center sm:text-left">
                
                {/* Authority Eyebrow: Destaque e alto contraste para MENTORIA FECHADA ONLINE */}
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="px-4 py-1.5 rounded-full bg-[#22c55e] text-slate-950 text-xs sm:text-sm font-black uppercase tracking-wider shadow-xl shadow-emerald-950/70 border-2 border-emerald-300 flex items-center gap-2 transform transition-transform hover:scale-105">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
                    </span>
                    MENTORIA FECHADA ONLINE
                  </span>
                  <span className="text-emerald-400/60 hidden sm:inline">·</span>
                  <span className="text-emerald-200 text-xs font-bold hidden sm:flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#22c55e]" />
                    Performance Comercial no Agro
                  </span>
                </div>

                {/* 1. HEADLINE: "VENDE mais!" na continuação direta, escalável e fluida no mobile */}
                <div>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] sm:leading-[1.15] text-white">
                    Se você conhece mais,{' '}
                    <span className="inline-block bg-[#22c55e] text-slate-950 px-2.5 py-0.5 sm:px-4 sm:py-1 rounded-lg sm:rounded-xl shadow-xl shadow-emerald-950/60 uppercase tracking-tight align-middle transform -rotate-1 hover:rotate-0 transition-transform whitespace-nowrap mt-1 sm:mt-0">
                      VENDE mais!
                    </span>
                  </h1>
                </div>

                {/* Subheadline fluida e legível */}
                <div>
                  <p className="text-sm sm:text-base lg:text-lg text-emerald-100/95 leading-relaxed font-normal max-w-xl mx-auto sm:mx-0">
                    Conheça os grandes perfis de negociadores do Agro e entenda o que você pode extrair de cada um para ampliar seu repertório comercial.
                  </p>
                </div>

                {/* DESTAQUE DA DATA E HORÁRIO */}
                <div className="bg-emerald-950/90 border-2 border-emerald-400/70 rounded-2xl p-3.5 sm:p-5 shadow-2xl shadow-emerald-950/50 backdrop-blur-md transition-all duration-300 hover:border-[#22c55e]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-[#22c55e] text-slate-950 flex items-center justify-center font-black shadow-md shrink-0">
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-300 block">
                          Data & Horário do Encontro
                        </span>
                        <div className="text-xl sm:text-3xl font-black text-white tracking-tight">
                          10/10 • 08h
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <div className="bg-emerald-900/80 border border-emerald-400/40 px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-emerald-200 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#22c55e] shrink-0" />
                        <span>Horário de Brasília</span>
                        <span className="text-emerald-400">·</span>
                        <span className="text-[#22c55e] font-black uppercase">AO VIVO</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* BOTÃO NA PRIMEIRA DOBRA: QUERO PARTICIPAR */}
                <div className="pt-1 sm:pt-2">
                  <button
                    onClick={handleScrollToForm}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 sm:py-4.5 px-8 sm:px-10 rounded-xl text-slate-950 font-black text-base sm:text-xl tracking-wider uppercase bg-[#22c55e] hover:bg-[#16a34a] active:bg-[#15803d] shadow-2xl shadow-emerald-950/80 transition-all duration-200 transform hover:-translate-y-1 active:scale-[0.98] cursor-pointer pulse-glow"
                  >
                    <span>QUERO PARTICIPAR</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3] shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>

              </div>

              {/* Right Column: FOTO DO ESPECIALISTA DENTRO DE MOLDURA CIRCULAR RESPONSIVA */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[300px] sm:min-h-[420px] lg:min-h-[480px]">
                
                {/* Visual Frame with Circular Halo & Glow */}
                <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-[440px] aspect-square flex items-center justify-center">
                  
                  {/* Circular halo rings with smooth light rotation and pulse */}
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-400/40 animate-pulse pointer-events-none" />
                  <div className="absolute -inset-3 sm:-inset-5 rounded-full border-2 border-dashed border-emerald-300/35 spin-slow pointer-events-none" />
                  <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-600/35 via-emerald-400/20 to-transparent blur-2xl pointer-events-none" />

                  {/* MOLDURA CIRCULAR RESPONSIVA: PERFEITAMENTE PROPORCIONAL NO MOBILE */}
                  <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-92 md:h-92 lg:w-[400px] lg:h-[400px] max-w-[85vw] max-h-[85vw] rounded-full overflow-hidden border-4 border-[#22c55e] shadow-[0_20px_50px_rgba(0,0,0,0.7)] bg-gradient-to-b from-[#0a4d32] via-[#043320] to-[#011c11] flex items-center justify-center float-slow transform-gpu">
                    <picture>
                      <source srcSet={ceruttiWebp} type="image/webp" />
                      <img
                        src={ceruttiPhoto}
                        alt="Marcelo De Cerutti - Especialista em Negociação Agro"
                        className="w-full h-full object-cover object-top scale-110 translate-y-3 drop-shadow-xl"
                        loading="eager"
                        decoding="async"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/cerutti_foto.png';
                        }}
                      />
                    </picture>
                  </div>
                </div>

                {/* Nome do Especialista - Moderno, Executivo e Bem Construído */}
                <div className="mt-4 text-center z-20 max-w-[92vw]">
                  <div className="inline-block bg-slate-950/85 backdrop-blur-md border border-emerald-400/40 px-4 sm:px-6 py-2.5 rounded-2xl shadow-2xl shadow-emerald-950/70 transition-all duration-300 hover:border-[#22c55e] hover:scale-[1.02]">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#22c55e] block mb-0.5">
                      MENTOR DO ENCONTRO
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-white tracking-tight leading-none">
                      Marcelo De Cerutti
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 mt-1.5 pt-1.5 border-t border-emerald-800/50 text-[10px] sm:text-[11px] font-semibold text-emerald-200/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                      <span>Especialista em vendas no Agro</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SEGUNDA DOBRA: ANCORAGEM EM COMPONENTE BRANCO + FORMULÁRIO */}
            <section id="formulario-inscricao" className="scroll-mt-24 pt-2 sm:pt-6 max-w-2xl mx-auto">
              
              {/* ANCORAGEM EM COMPONENTE BRANCO: 100% RESPONSIVO PARA MOBILE */}
              <div className="text-center mb-4 sm:mb-6 px-1">
                <div className="bg-white rounded-2xl sm:rounded-full py-2.5 sm:py-3.5 px-4 sm:px-8 shadow-xl shadow-slate-950/20 border-2 border-[#22c55e] inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 transition-all duration-200 hover:shadow-2xl max-w-full">
                  {/* Valor da ancoragem um pouco menor */}
                  <span className="text-slate-700 font-extrabold line-through decoration-rose-600 decoration-2 text-sm sm:text-base md:text-lg tracking-tight whitespace-nowrap">
                    De R$ 1.497,00
                  </span>
                  
                  <span className="text-slate-300 font-bold hidden sm:inline">·</span>

                  {/* VOCÊ NÃO PAGA NADA maior, super destacado e com alto contraste */}
                  <div className="bg-[#22c55e] text-slate-950 px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl sm:rounded-full shadow-md flex items-center gap-1.5 font-black">
                    <span className="text-[11px] sm:text-xs text-slate-900 font-black uppercase tracking-wider opacity-90">
                      NESTA EDIÇÃO:
                    </span>
                    <span className="text-base sm:text-lg md:text-xl font-black text-slate-950 uppercase tracking-tight">
                      VOCÊ NÃO PAGA NADA
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Component */}
              <div className="transition-all duration-300">
                <LeadForm onSubmitSuccess={handleLeadSuccess} />
              </div>
            </section>

          </div>
        )}
      </main>

      {/* Quiet Minimalist Footer */}
      <footer className="relative z-20 w-full border-t border-slate-200/80 bg-white/90 backdrop-blur-md py-4 px-4 text-center text-xs text-slate-600">
        <div className="max-w-6xl mx-auto flex items-center justify-center text-center">
          <div>
            © {new Date().getFullYear()} Mentoria Comercial Agro com Marcelo De Cerutti. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Botão Flutuante de WhatsApp (Canto Inferior Direito: 67 99819-0294) */}
      <a
        href="https://wa.me/5567998190294?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20a%20Mentoria%20Comercial%20Agro."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 group flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa4f] text-white p-3.5 sm:p-4 rounded-full shadow-2xl shadow-emerald-950/40 transition-all duration-300 hover:scale-110 active:scale-95 pulse-glow"
        aria-label="Fale conosco no WhatsApp (67 99819-0294)"
        title="Dúvidas? Fale no WhatsApp (67 99819-0294)"
      >
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white shrink-0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        <span className="hidden md:inline-block max-w-0 overflow-hidden whitespace-nowrap font-bold text-xs group-hover:max-w-xs transition-all duration-300 pr-0 group-hover:pr-1">
          Dúvidas? Fale no WhatsApp
        </span>
      </a>
    </div>
  );
}
