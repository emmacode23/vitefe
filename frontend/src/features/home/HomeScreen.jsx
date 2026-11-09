import React, { useState } from 'react';

export default function HomeScreen({ onStartExperience, onLogin }) {
  const [showVoiceToast, setShowVoiceToast] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);

  const handleStartExperience = () => {
    // Feedback haptique sur appareils mobiles compatibles
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(30);
    }
    setBtnPressed(true);
    setTimeout(() => setBtnPressed(false), 150);

    if (onStartExperience) {
      onStartExperience();
    } else {
      alert("Bienvenue sur Vitefê ! Lancement de l'expérience d'urgence & de dépannage.");
    }
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      alert("Connexion : Entrez votre numéro de téléphone pour recevoir le code SMS OTP.");
    }
  };

  return (
    <main className="flex flex-col relative w-full pt-safe pb-safe bg-surface min-h-screen">
      <div className="flex flex-col w-full max-w-md mx-auto px-margin pb-space-2xl space-y-space-lg select-none">
        
        {/* Brand Header with Comic Emblem */}
        <header className="flex items-center justify-between pt-space-xs">
          <div className="flex items-center space-x-space-sm">
            <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-md shadow-primary/20 overflow-hidden shrink-0 border border-outline-variant/30">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCayfTxvNDmiBROkW6yUf4pUWZ_jVlD50FdpWW6S5TPQmNf0iDISBv7a11-f1wYJhdjJluMD4B2N9oXjLRacrWB1K0kYVMaWQpHEbkwKyNGBNq0OAwRGXTYCOLFJDkSw1MCkYAlm9CSebAxTwalCL-gumyeFkq2womIgce4PfVn2QGtVRf2h7JNi77sC3qHGqkaYPmnh5V--HfZ6GMQjVub3veTbUhihGkmfq1iyB8NvEgPsvn5XbYI" 
                alt="Vitefê Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-headline-md text-headline-md tracking-tight text-primary">Vitefê</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                  Abidjan
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                Votre fidèle partenaire du quotidien
              </p>
            </div>
          </div>

          {/* Audio Greeting / Nouchi Pill */}
          <button 
            onClick={() => setShowVoiceToast(!showVoiceToast)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-surface-container-high text-primary hover:bg-surface-variant transition-colors shadow-sm active:scale-95"
            id="voice-toast-btn"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">record_voice_over</span>
            <span className="font-label-sm text-label-sm text-on-surface">Y'a drap ?</span>
          </button>
        </header>

        {/* Interactive Voice Toast Popover */}
        {showVoiceToast && (
          <div className="rounded-xl bg-primary-container text-on-primary-container p-space-md shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
                <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
              </div>
              <div className="flex-1">
                <p className="font-label-lg text-label-lg text-on-primary font-bold">On est calé pour toi 24h/7 !</p>
                <p className="font-body-sm text-body-sm text-primary-fixed-dim mt-0.5">
                  Un robinet pété à Yopougon ou besoin de pharmacie à Cocody ? Dis seulement !
                </p>
              </div>
              <button 
                onClick={() => setShowVoiceToast(false)}
                className="text-primary-fixed-dim hover:text-on-primary p-1"
                aria-label="Fermer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Hero Comic Panel Vignette */}
        <section className="relative rounded-2xl bg-surface-container overflow-hidden shadow-md">
          {/* Visual BD Strip Background Scene */}
          <div 
            className="relative w-full h-64 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB-IsDGO0k-ozIGhesxTiotX0KrptVaLK6ErhQdaSH4Yh94gLCyyB8tdJIyPt9UolH6Tmsw8hO_x0lcZSj_aCLNz2i_TyfRlSN_SAWTYRKPmxrUlmr-bnOF4DtPkmdRe1yugBo_Oz8BUd2kKkaoiSMTGs1h9s6CZlcAoz_71v5gqn0mzCheeoGWvFZF5wyGx35eaefZfPUeuok6vrQ1_bHEp_cVJJG1AB0yTunxV-U')" 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent"></div>
            
            {/* Live Comic Dialogue Floating Badges */}
            <div className="absolute top-3 left-3 max-w-[190px] bg-surface-container-lowest text-on-surface p-2.5 rounded-xl rounded-tl-none shadow-lg">
              <div className="flex items-center space-x-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wide">3 min chrono</span>
              </div>
              <p className="font-label-md text-label-md leading-tight text-on-surface font-semibold">
                « Le technicien est déjà en route chez toi ! »
              </p>
            </div>

            <div className="absolute bottom-16 right-3 max-w-[210px] bg-secondary-container text-on-secondary-container p-2.5 rounded-xl rounded-br-none shadow-lg">
              <div className="flex items-center space-x-1.5 mb-0.5">
                <span className="material-symbols-outlined text-[16px] text-on-secondary-container">shield_lock</span>
                <span className="font-label-sm text-label-sm font-bold">Séquestre Sécurisé</span>
              </div>
              <p className="font-label-md text-label-md leading-tight font-semibold">
                « Paye via Wave & Orange Money seulement après satisfaction ! »
              </p>
            </div>

            {/* Live GPS Activity Indicator */}
            <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-surface-tint"></span>
              <span className="font-label-sm text-label-sm text-on-surface font-bold">342 Pros en action aujourd'hui</span>
            </div>
          </div>
        </section>

        {/* Narrative Intro & Welcome Statement */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[14px]">local_convenience_store</span>
            <span>Le réseau d'entraide d'Abidjan</span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-extrabold text-on-surface tracking-tight">
            Tous tes services d'urgence, <span className="text-primary underline decoration-secondary decoration-wavy decoration-2">Vite fait, bien fait !</span>
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            De Yopougon à Bingerville, trouve en quelques secondes des artisans certifiés, soignants et dépanneurs sous protection financière intégrale.
          </p>
        </div>

        {/* The 3 Core Pillars (Illustrated Bento Comic Cells) */}
        <section className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">La promesse Vitefê</span>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Fiable à 100%</span>
          </div>

          {/* Pillar 1: Dépannage & Santé Express */}
          <div className="flex items-start space-x-space-md p-space-md rounded-2xl bg-surface-container-low shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                medical_services
              </span>
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-label-lg text-label-lg font-bold text-on-surface">Urgence & Dépannage 24/7</h3>
                <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
                  SOS
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                Plomberie en fuite, coupure d'électricité, pharmacie de garde ou infirmier à domicile dispatchés en un clin d’œil.
              </p>
            </div>
          </div>

          {/* Pillar 2: Pros vérifiés dans tous les quartiers */}
          <div className="flex items-start space-x-space-md p-space-md rounded-2xl bg-surface-container-low shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-label-lg text-label-lg font-bold text-on-surface">Pros Vérifiés & Notés</h3>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                  KYC Validé
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                Identité contrôlée et avis réels certifiés à Cocody, Marcory, Plateau, Yopougon, Treichville et Riviera.
              </p>
              <div className="flex items-center space-x-1.5 pt-1 text-secondary">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold ml-1">4.9/5 moyenne</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Séquestre & Mobile Money */}
          <div className="flex items-start space-x-space-md p-space-md rounded-2xl bg-surface-container-low shadow-sm">
            <div className="w-14 h-14 rounded-xl bg-surface-variant text-on-surface flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[30px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                lock_open
              </span>
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-label-lg text-label-lg font-bold text-on-surface">Paiement sous Séquestre</h3>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold">
                  Zéro Arnaque
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Ton argent reste bloqué en sécurité. Le prestataire n'est payé que lorsque tu valides avec ton code OTP de fin de mission !
              </p>
              
              {/* Mobile money logos banner */}
              <div className="flex items-center space-x-2 pt-1.5">
                <span className="px-2 py-1 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm font-bold text-[#1b73e8]">
                  Wave
                </span>
                <span className="px-2 py-1 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm font-bold text-[#f16e00]">
                  Orange Money
                </span>
                <span className="px-2 py-1 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm font-bold text-[#ffcc00]">
                  MTN MoMo
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Commune Ticker Strip */}
        <section className="rounded-xl bg-surface-container p-space-sm space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
              Actif dans vos communes
            </span>
            <span className="material-symbols-outlined text-[14px] text-surface-tint">near_me</span>
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-nowrap scrollbar-none">
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-sm">📍 Cocody</span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-sm">📍 Yopougon</span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-sm">📍 Marcory</span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-sm">📍 Koumassi</span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-sm">📍 Plateau</span>
            <span className="px-2.5 py-1 rounded-full bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-sm">📍 Riviera</span>
          </div>
        </section>

        {/* Trust Indicator Avatar Cluster */}
        <div className="flex items-center justify-center space-x-3 py-1">
          <div className="flex -space-x-2 overflow-hidden">
            <div 
              className="w-8 h-8 rounded-full bg-cover bg-center shadow-md ring-2 ring-white" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDuxaXRDIsFFgvV2OVMm9Kuenq7OyJ0IxZj87Qyhv9CXjUOPbVyFQuVpaWtCA08tgo4KtpnaZKk-P5v_9PmHSKEwKQUZtmAtkRIBKqI8gv5zc2ky702OC8qjlTU7BuqN14pRgeYZszdSAatk3hTQH7zqqMGKnPiUTGpr01vP6ne9LgdQC1OnR1W1RiPF4zTtXt5FWDZjoqfU89kSjlIAFLg0lpAd9Kid89ePQGCfQc')" }}
            />
            <div 
              className="w-8 h-8 rounded-full bg-cover bg-center shadow-md ring-2 ring-white" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWBL4OSB11dhg2n0y9fVNO7PtEOGamAS79idbD80bgnD1N3ivCPM5vBwLnONNRpPB4-8v3hj5Pd-vE9XaoaglVhBaqjGyesNUArrWEiY-7TnnJm_yTiFXLpPnk_t3uOQ4IUc5NtxV1MZxIA9a4RzCQUNpC4Qw021COUgRi1iF6gjVKvCcHyGAIRqRRrPuUcbaPkNfaLLpy-20h4d07qfMNNdCwlb3dMmeINniu6RA')" }}
            />
            <div 
              className="w-8 h-8 rounded-full bg-cover bg-center shadow-md ring-2 ring-white" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBa2CEm_WCcY8YPzwDcew9f3VwUeJ464qX8yaHm8ImBAP2sM9edIE9f_390l1vduIMqccvrlh5LayRhrHlDmG-GCmFa_-M9uFm9_6EZCvBbX2lSBqLc2304vP-BCj8ZGgtcpKKs_HK6dQCkATQdkexK-hqe5Ofy5uGRscJJ7-Kq50N4prTo3BrsJ6qJvw_1jlSD9xcg0EHsIXQV-TfV4gXtG4mGkJa-5nbkhd0sePA')" }}
            />
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">
            Rejoignez plus de <strong className="text-on-surface font-bold">18 000 Abidjanais</strong> sereins
          </p>
        </div>

        {/* Primary Action Dock */}
        <div className="flex flex-col space-y-space-sm pt-space-xs">
          {/* Main Call to Action Button */}
          <button 
            onClick={handleStartExperience}
            className={`w-full h-14 rounded-full bg-primary hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center space-x-2 shadow-lg shadow-primary/25 text-on-primary ${btnPressed ? 'scale-95' : ''}`}
            id="start-experience-btn"
          >
            <span className="font-label-lg text-label-lg font-bold">Commencer l'expérience</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          {/* Secondary Login Option */}
          <div className="flex items-center justify-center pt-1">
            <button 
              onClick={handleLogin}
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary font-semibold transition-colors flex items-center space-x-1 py-2 active:scale-95" 
              id="login-link-btn"
            >
              <span>Déjà un compte ?</span>
              <span className="text-primary font-bold underline decoration-1 underline-offset-4">Se connecter</span>
            </button>
          </div>
        </div>

        {/* Bottom Visual Security Seal */}
        <footer className="pt-space-xs flex items-center justify-center space-x-4 text-outline font-label-sm text-label-sm">
          <div className="flex items-center space-x-1">
            <span className="material-symbols-outlined text-[15px]">lock</span>
            <span>Cryptage SSL 256-bit</span>
          </div>
          <span className="inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
          <div className="flex items-center space-x-1">
            <span className="material-symbols-outlined text-[15px]">verified</span>
            <span>Conforme ARTCI</span>
          </div>
        </footer>

      </div>
    </main>
  );
}
