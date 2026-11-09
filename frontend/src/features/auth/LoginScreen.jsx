import React, { useState } from 'react';

export default function LoginScreen({ onBack, onLoginSuccess, onRegisterClient, onRegisterArtisan }) {
  const [activeTab, setActiveTab] = useState('sms'); // 'sms' | 'pwd'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', icon: 'check_circle' });

  // Formatage automatique du numéro ivoirien (10 chiffres : 07 00 00 00 00)
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 10);
    let formatted = '';
    for (let i = 0; i < raw.length; i++) {
      if (i > 0 && i % 2 === 0) {
        formatted += ' ';
      }
      formatted += raw[i];
    }
    setPhone(formatted);
  };

  const showNotification = (message, icon = 'check_circle') => {
    setToast({ show: true, message, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess({ phone: phone || '07 89 45 12 00', method: activeTab });
    }
  };

  const handleSendOtp = () => {
    const cleanPhone = phone.replace(/\s/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      showNotification('Renseignez d’abord votre numéro de téléphone.', 'phone_iphone');
      return;
    }
    showNotification('Un nouveau code OTP vient de vous être envoyé par SMS (+225).', 'mark_email_read');
  };

  const handleBiometric = () => {
    showNotification('Authentification biométrique autorisée (Face ID / Empreinte)...', 'fingerprint');
  };

  const handleForgotPassword = () => {
    showNotification('Instructions de récupération envoyées par SMS (+225).', 'lock_reset');
  };

  const handleClientSignUp = () => {
    if (onRegisterClient) {
      onRegisterClient();
    } else {
      showNotification('Ouverture du formulaire d’inscription Client...', 'person_add');
    }
  };

  const handleArtisanSignUp = () => {
    if (onRegisterArtisan) {
      onRegisterArtisan();
    } else {
      showNotification('Ouverture de l’espace Pro / Devenir Prestataire...', 'handyman');
    }
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen">
      
      {/* Header fixe avec bouton retour */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
        <div className="h-16 px-gutter flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-space-xs">
            <button 
              type="button"
              onClick={onBack}
              aria-label="Retour"
              className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-high transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <img 
              alt="Vitefê Logo" 
              className="h-7 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCayfTxvNDmiBROkW6yUf4pUWZ_jVlD50FdpWW6S5TPQmNf0iDISBv7a11-f1wYJhdjJluMD4B2N9oXjLRacrWB1K0kYVMaWQpHEbkwKyNGBNq0OAwRGXTYCOLFJDkSw1MCkYAlm9CSebAxTwalCL-gumyeFkq2womIgce4PfVn2QGtVRf2h7JNi77sC3qHGqkaYPmnh5V--HfZ6GMQjVub3veTbUhihGkmfq1iyB8NvEgPsvn5XbYI"
            />
            <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate max-w-[160px]">
              Connexion
            </h1>
          </div>
          <div className="flex items-center gap-space-sm"></div>
        </div>
      </header>

      {/* Corps scrollable */}
      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-md mx-auto">
          
          {/* Top Visual Emblem & Warm Greeting */}
          <section className="px-gutter pt-4 pb-2 flex flex-col items-center text-center">
            <div className="relative mb-3 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary-container/10 flex items-center justify-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-md overflow-hidden">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCayfTxvNDmiBROkW6yUf4pUWZ_jVlD50FdpWW6S5TPQmNf0iDISBv7a11-f1wYJhdjJluMD4B2N9oXjLRacrWB1K0kYVMaWQpHEbkwKyNGBNq0OAwRGXTYCOLFJDkSw1MCkYAlm9CSebAxTwalCL-gumyeFkq2womIgce4PfVn2QGtVRf2h7JNi77sC3qHGqkaYPmnh5V--HfZ6GMQjVub3veTbUhihGkmfq1iyB8NvEgPsvn5XbYI" 
                    alt="Vitefê" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Mini comic badge accent */}
              <div className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider">Abidjan</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high mb-2">
              <span className="w-2 h-2 rounded-full bg-surface-tint"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">
                Sécurisé &amp; Garanti Vitefê
              </span>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">
              Ravi de vous revoir !
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-[310px]">
              Connectez-vous à votre espace Vitefê pour gérer vos interventions et services du quotidien.
            </p>
          </section>

          {/* Login Mode Switcher (Tab Pills) */}
          <section className="px-gutter mt-3">
            <div className="bg-surface-container p-1 rounded-full flex items-center relative shadow-sm">
              <button 
                type="button"
                onClick={() => setActiveTab('sms')}
                className={`flex-1 py-2.5 rounded-full font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeTab === 'sms' 
                    ? 'bg-primary text-on-primary shadow-sm' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">sms</span>
                <span>SMS &amp; Téléphone</span>
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('pwd')}
                className={`flex-1 py-2.5 rounded-full font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  activeTab === 'pwd' 
                    ? 'bg-primary text-on-primary shadow-sm' 
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>Mot de passe</span>
              </button>
            </div>
          </section>

          {/* Main Credentials Form Card */}
          <section className="px-gutter mt-4">
            <form className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-4" onSubmit={handleLoginSubmit}>
              
              {/* Field 1: Ivorian Mobile Number */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface flex items-center justify-between" htmlFor="phone-input">
                  <span>Numéro de téléphone portable</span>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Orange / MTN / Moov</span>
                </label>
                <div className="relative flex items-center bg-surface-container-lowest rounded-lg shadow-sm">
                  {/* Indicatif Badge */}
                  <div className="flex items-center gap-1 pl-3 pr-2.5 py-3 text-on-surface select-none">
                    <span className="text-[16px] leading-none">🇨🇮</span>
                    <span className="font-label-lg text-label-lg text-primary font-bold">+225</span>
                    <span className="text-outline-variant opacity-60">|</span>
                  </div>
                  <input 
                    className="w-full bg-transparent py-3 pr-3 font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:outline-none tracking-wide" 
                    id="phone-input" 
                    inputMode="numeric" 
                    maxLength={14} 
                    value={phone}
                    onChange={handlePhoneChange} 
                    placeholder="07 00 00 00 00" 
                    type="tel"
                  />
                  <span className="material-symbols-outlined text-outline-variant pr-3 text-[20px]">phone_iphone</span>
                </div>
              </div>

              {/* Field 2A: OTP Code (Active for SMS Tab) */}
              {activeTab === 'sms' && (
                <div className="flex flex-col gap-1.5" id="otp-wrapper">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface" htmlFor="otp-input">
                      Code de vérification (OTP)
                    </label>
                    <button 
                      type="button"
                      onClick={handleSendOtp}
                      className="font-label-sm text-label-sm text-secondary font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span className="material-symbols-outlined text-[14px]">send_to_mobile</span>
                      <span>Renvoyer le code</span>
                    </button>
                  </div>
                  <div className="relative flex items-center bg-surface-container-lowest rounded-lg shadow-sm">
                    <input 
                      className="w-full bg-transparent py-3 pl-3 pr-10 font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:outline-none tracking-widest text-center" 
                      id="otp-input" 
                      inputMode="numeric" 
                      maxLength={6} 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 6))}
                      placeholder="• • • • • •" 
                      type="text"
                    />
                    <button 
                      type="button"
                      onClick={() => showNotification("Le code à 6 chiffres vous est transmis par SMS.", "info")}
                      className="absolute right-3 text-outline hover:text-primary" 
                      title="Aide code"
                    >
                      <span className="material-symbols-outlined text-[20px]">help_outline</span>
                    </button>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-surface-tint text-[14px]">info</span>
                    Code à 6 chiffres transmis instantanément par SMS.
                  </p>
                </div>
              )}

              {/* Field 2B: Standard Password (Active for Password Tab) */}
              {activeTab === 'pwd' && (
                <div className="flex flex-col gap-1.5" id="pwd-wrapper">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface" htmlFor="password-input">
                      Votre mot de passe secret
                    </label>
                  </div>
                  <div className="relative flex items-center bg-surface-container-lowest rounded-lg shadow-sm">
                    <input 
                      className="w-full bg-transparent py-3 pl-3 pr-10 font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:outline-none" 
                      id="password-input" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Entrez votre mot de passe" 
                      type={showPassword ? 'text' : 'password'}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-outline hover:text-on-surface"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password helper row */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer" 
                  />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Se souvenir de moi</span>
                </label>
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="font-label-sm text-label-sm text-secondary font-bold hover:underline"
                >
                  Oublié ?
                </button>
              </div>

              {/* Primary Action CTA Button */}
              <button 
                type="submit"
                className="w-full h-12 bg-primary text-on-primary rounded-full font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.99] transition-all mt-1"
              >
                <span>Me connecter</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              {/* Biometric Quick Access Action */}
              <button 
                type="button"
                onClick={handleBiometric}
                className="w-full py-2.5 px-4 bg-surface-container-high rounded-full font-label-md text-label-md text-on-surface flex items-center justify-center gap-2 hover:bg-surface-variant active:scale-[0.99] transition-colors"
              >
                <span className="material-symbols-outlined text-surface-tint text-[20px]">fingerprint</span>
                <span>Accès rapide biométrique (Face ID / Empreinte)</span>
              </button>
            </form>
          </section>

          {/* Escrow / Security Assurance pill */}
          <section className="px-gutter mt-4">
            <div className="bg-secondary-fixed/40 rounded-xl p-3 flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shield
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-label-md text-on-surface truncate">Séquestre &amp; KYC Activés</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Paiements protégés Wave, MTN &amp; Orange</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px] shrink-0">lock</span>
            </div>
          </section>

          {/* Friendly Comic Mascot Strip */}
          <section className="px-gutter mt-4">
            <div className="bg-surface-container rounded-xl p-3 flex items-center gap-3 shadow-sm">
              <div className="w-14 h-14 rounded-lg bg-surface-container-lowest shrink-0 overflow-hidden flex items-center justify-center">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Mascotte artisan Vitefê"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN3wQ86kW0wElH6dZo4m9CfBP1j01AFf-xJj0hPun3ujohOZeZqZD0CmX1h8GdkPlmHY5gaS20Dq8g_CW6GyL-G1IDqRoxhPustiAwGzh2Dwcw6YruNlbMQ7C83xy0dOc8DFen1LWdaIuH2GUUGRZl96pWpKSnFVYpc6Ba_ZM-70aN-A3iw1h0nfJl--rLQ6ed4c3V3ZX95AphX-EzGeiyzO05meAhQoEBVeiiGFg"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wide text-secondary font-bold">Conseil Vitefê</span>
                  <span className="material-symbols-outlined text-secondary text-[14px]">tips_and_updates</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                  "Un besoin express à Cocody, Yopougon ou Plateau ? Votre artisan qualifié arrive en 20 minutes chrono !"
                </p>
              </div>
            </div>
          </section>

          {/* Divider & Sign-Up Alternative Paths */}
          <section className="px-gutter mt-5 mb-6 flex flex-col items-center">
            <div className="w-full flex items-center gap-3 mb-4">
              <div className="h-0.5 flex-1 bg-surface-container-highest"></div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Pas encore de compte ?
              </span>
              <div className="h-0.5 flex-1 bg-surface-container-highest"></div>
            </div>

            {/* Dual Choice Sign Up: Client vs Prestataire */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Register Client Button */}
              <button 
                type="button"
                onClick={handleClientSignUp}
                className="bg-surface-container-high rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-surface-variant active:scale-[0.98] transition-all text-center shadow-sm"
              >
                <div className="w-9 h-9 rounded-full bg-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    person_add
                  </span>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-bold">Compte Client</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Pour commander</span>
              </button>

              {/* Register Artisan / Provider Button */}
              <button 
                type="button"
                onClick={handleArtisanSignUp}
                className="bg-secondary-fixed/50 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 hover:bg-secondary-fixed active:scale-[0.98] transition-all text-center shadow-sm"
              >
                <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    handyman
                  </span>
                </div>
                <span className="font-label-md text-label-md text-on-secondary-container font-bold">Devenir Prestataire</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Rejoindre le réseau</span>
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* Toast Notification Flottant */}
      <div 
        className={`fixed bottom-6 left-4 right-4 max-w-md mx-auto bg-inverse-surface text-inverse-on-surface p-3 rounded-lg shadow-xl flex items-center justify-between gap-2 transition-all duration-300 z-50 ${
          toast.show ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-inverse-primary text-[20px]">
            {toast.icon}
          </span>
          <span className="font-body-sm text-body-sm">{toast.message}</span>
        </div>
        <button 
          type="button"
          onClick={() => setToast((prev) => ({ ...prev, show: false }))}
          className="text-inverse-on-surface hover:text-white"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

    </div>
  );
}
