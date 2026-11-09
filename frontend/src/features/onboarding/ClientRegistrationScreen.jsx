import React, { useState } from 'react';

export default function ClientRegistrationScreen({ onBack, onSuccess, onGoToLogin }) {
  const [fullName, setFullName] = useState('Aminata Touré');
  const [phone, setPhone] = useState('07 89 45 12 00');
  const [commune, setCommune] = useState('cocody');
  const [password, setPassword] = useState('AbidjanSecur2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['4', '5', '5', '6']);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', subtitle: '' });

  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 10);
    let formatted = '';
    for (let i = 0; i < raw.length; i++) {
      if (i > 0 && i % 2 === 0) formatted += ' ';
      formatted += raw[i];
    }
    setPhone(formatted);
  };

  const handleOtpChange = (index, value) => {
    const val = value.substring(value.length - 1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
  };

  const handleFinalize = () => {
    if (onSuccess) {
      onSuccess({ fullName, phone, commune, role: 'client' });
    }
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen">
      
      {/* Header fixe */}
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
              alt="Logo Vitefê" 
              className="h-7 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCayfTxvNDmiBROkW6yUf4pUWZ_jVlD50FdpWW6S5TPQmNf0iDISBv7a11-f1wYJhdjJluMD4B2N9oXjLRacrWB1K0kYVMaWQpHEbkwKyNGBNq0OAwRGXTYCOLFJDkSw1MCkYAlm9CSebAxTwalCL-gumyeFkq2womIgce4PfVn2QGtVRf2h7JNi77sC3qHGqkaYPmnh5V--HfZ6GMQjVub3veTbUhihGkmfq1iyB8NvEgPsvn5XbYI"
            />
            <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate max-w-[160px]">
              Inscription
            </h1>
          </div>
          <div className="flex items-center gap-space-sm">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <div className="px-gutter pb-space-2xl flex flex-col gap-space-lg w-full max-w-lg mx-auto">
            
            {/* Visual Story Banner: BD Ivoirienne Vibe */}
            <div className="relative overflow-hidden rounded-xl bg-primary-container text-on-primary p-space-md shadow-md flex items-center gap-space-md mt-2">
              <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-primary/40 flex items-center justify-center">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Illustration Client Vitefê"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWd8Rqr3uZUHJX_QIdP_Rhdrsr9KOU4NKUmvOnyhZ-tUHR0nDd7wXSZcGrH0Bc4hHItunxlNww1ovQDvItZ1XOcb5NxCWyd0HtjBJfQL7O1Ef09O64amS1Uh0qU2B1yMMcWhJQY69ngVnFMj0kWKcOMhpi1olIfk0F_S_WzDCrisHNE69DVQ-WigK1qyfaBjKWUJtMZ5z6nYPj7V98s0haPZNFzyWaKfSCfJ6XxTw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 to-transparent"></div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-space-xs mb-1">
                  <span className="bg-secondary text-on-secondary px-2 py-0.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
                    Étape 3 / 3
                  </span>
                  <span className="text-on-primary-container font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">shield</span> Sécurisé
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md leading-tight text-on-primary font-bold">
                  Bienvenue dans la famille Vitefê
                </h2>
                <p className="font-body-sm text-body-sm text-on-primary-container mt-0.5 line-clamp-2">
                  Vos coordonnées pour commander des services en toute sérénité à Abidjan.
                </p>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="flex items-center gap-2 px-1">
              <div className="h-1.5 flex-1 rounded-full bg-primary-fixed-dim"></div>
              <div className="h-1.5 flex-1 rounded-full bg-primary-fixed-dim"></div>
              <div className="h-1.5 flex-1 rounded-full bg-secondary-container"></div>
              <span className="font-label-sm text-label-sm text-secondary font-bold">100% prêt</span>
            </div>

            {/* Main Registration Card */}
            <form className="flex flex-col gap-space-md bg-surface-container-low rounded-xl p-space-md shadow-sm" onSubmit={(e) => { e.preventDefault(); handleFinalize(); }}>
              
              {/* Field 1: Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5" htmlFor="fullName">
                  <span className="material-symbols-outlined text-primary text-[18px]">badge</span>
                  Nom complet
                </label>
                <div className="relative flex items-center">
                  <input 
                    className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg py-3 px-space-md outline-none focus:bg-surface-container-lowest focus:ring-0 transition-all placeholder:text-outline shadow-sm" 
                    id="fullName" 
                    placeholder="ex: Aminata Touré" 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <span className="absolute right-3 text-surface-tint material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
              </div>

              {/* Field 2: Phone with Operator Support */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between" htmlFor="phoneInput">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">smartphone</span>
                    Numéro de téléphone
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Wave / MoMo acceptés
                  </span>
                </label>
                <div className="flex gap-2">
                  <div className="shrink-0 bg-surface-container-high px-3 py-3 rounded-lg flex items-center gap-1.5 text-on-surface font-label-lg text-label-lg shadow-sm">
                    <span className="text-base leading-none">🇨🇮</span>
                    <span>+225</span>
                  </div>
                  <div className="relative flex-1">
                    <input 
                      className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg py-3 px-space-md outline-none shadow-sm placeholder:text-outline" 
                      id="phoneInput" 
                      placeholder="07 00 12 34 56" 
                      type="tel" 
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>

                {/* Operator Badges for trust */}
                <div className="flex items-center gap-space-xs mt-1 px-1">
                  <span className="font-label-sm text-label-sm text-outline">Compatible séquestre :</span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">Wave</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">Orange</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm font-bold">MTN</span>
                    <span className="px-2 py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-label-sm font-bold">Moov</span>
                  </div>
                </div>
              </div>

              {/* Field 3: Abidjan Communes Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-label-lg text-on-surface flex items-center gap-1.5" htmlFor="communeSelect">
                  <span className="material-symbols-outlined text-primary text-[18px]">location_on</span>
                  Commune de résidence à Abidjan
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg py-3 pl-space-md pr-10 outline-none shadow-sm appearance-none" 
                    id="communeSelect"
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                  >
                    <option value="cocody">Cocody (Angré, Riviera, Deux-Plateaux)</option>
                    <option value="yopougon">Yopougon (Siporex, Niangon, Selmer)</option>
                    <option value="marcory">Marcory (Zone 4, Biétry, Anoumabo)</option>
                    <option value="plateau">Le Plateau (Centre des affaires)</option>
                    <option value="koumassi">Koumassi (Remblais, Inch'Allah)</option>
                    <option value="treichville">Treichville (Arras, Avenue 8)</option>
                    <option value="abobo">Abobo (Gare, Samaké, PK18)</option>
                    <option value="adjame">Adjamé (220 Logements, Liberté)</option>
                    <option value="portbouet">Port-Bouët (Vridi, Gonzagueville)</option>
                    <option value="bingerville">Bingerville</option>
                    <option value="songon">Songon</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Field 4: Password with Visibility Toggle */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between" htmlFor="passwordInput">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                    Mot de passe sécurisé
                  </span>
                  <span className="font-label-sm text-label-sm text-surface-tint font-bold">Sécurisé 8+ car.</span>
                </label>
                <div className="relative flex items-center">
                  <input 
                    className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md rounded-lg py-3 pl-space-md pr-12 outline-none shadow-sm" 
                    id="passwordInput" 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    aria-label="Afficher ou masquer mot de passe" 
                    className="absolute right-2 p-2 text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center rounded-full" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Field 5: SMS OTP Verification Simulator */}
              <div className="bg-surface-container rounded-lg p-space-md flex flex-col gap-space-sm mt-1 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-ping"></span>
                    <span className="font-label-lg text-label-lg text-on-surface font-bold">Vérification SMS Rapide</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded-full">
                    Simulation Démo
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  SMS automatique envoyé au <span className="font-bold text-on-surface">+225 {phone}</span>
                </p>
                {/* 4-digit OTP Box */}
                <div className="flex items-center justify-center gap-space-sm py-1">
                  {otp.map((digit, idx) => (
                    <input 
                      key={idx}
                      className="w-12 h-13 text-center font-headline-md text-headline-md rounded-lg bg-surface-container-lowest text-primary shadow-sm outline-none focus:bg-surface-bright" 
                      maxLength={1} 
                      type="text" 
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-body-sm font-body-sm pt-1">
                  <span className="text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-surface-tint">sms</span>
                    Code reçu en 4s
                  </span>
                  <button 
                    type="button"
                    className="text-secondary font-label-md text-label-md underline hover:text-on-secondary-container"
                    onClick={() => alert("Nouveau code SMS démo envoyé : 4556")}
                  >
                    Renvoyer le code
                  </button>
                </div>
              </div>

              {/* Field 6: Terms and Privacy Checkbox */}
              <label className="flex items-start gap-space-sm cursor-pointer select-none mt-1">
                <input 
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded text-primary focus:ring-0 accent-primary cursor-pointer" 
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                  J'accepte les <span className="text-primary font-bold underline">conditions d'utilisation</span> de Vitefê et la protection garantie de mes données personnelles à Abidjan.
                </span>
              </label>

              {/* Primary Action CTA Button */}
              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm rounded-full py-4 px-space-lg flex items-center justify-center gap-space-sm shadow-md transition-all active:scale-[0.99] mt-2"
              >
                <span>Finaliser mon inscription</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>

              {/* Fast Login Link */}
              <div className="flex items-center justify-center text-center mt-1">
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Déjà inscrit ? 
                  <button 
                    type="button"
                    onClick={onGoToLogin}
                    className="font-label-lg text-label-lg text-primary underline hover:text-primary-container ml-1"
                  >
                    Connectez-vous ici
                  </button>
                </span>
              </div>
            </form>

            {/* Escrow & Security Trust Strip */}
            <div className="bg-secondary-fixed/50 rounded-xl p-space-md flex items-center gap-space-md shadow-sm">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-label-lg text-label-lg text-on-secondary-container font-bold">
                  Protection Séquestre Vitefê Active
                </h4>
                <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant leading-tight mt-0.5">
                  Vos fonds sont bloqués en sécurité jusqu'à votre validation finale par code OTP à l'artisan.
                </p>
              </div>
            </div>

            {/* Quick Multilingual Selector Reminder */}
            <div className="flex items-center justify-center gap-2 text-center pb-2">
              <span className="font-label-sm text-label-sm text-outline">Langue préférée :</span>
              <span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded-full text-on-surface font-semibold">Français</span>
              <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant">Nouchi</span>
              <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant">Baoulé</span>
              <span className="font-label-sm text-label-sm bg-surface-container px-2 py-0.5 rounded-full text-on-surface-variant">Dioula</span>
            </div>

          </div>
        </div>
      </main>

      {/* Notification Banner Toast */}
      <div 
        className={`fixed bottom-6 left-4 right-4 max-w-sm mx-auto bg-primary text-on-primary p-4 rounded-xl shadow-xl flex items-center gap-3 transition-all duration-300 z-50 ${
          toast.show ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check
          </span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-label-lg text-label-lg leading-tight">{toast.message}</span>
          <span className="font-body-sm text-body-sm text-primary-fixed leading-tight mt-0.5">{toast.subtitle}</span>
        </div>
      </div>

    </div>
  );
}
