import React, { useState } from 'react';

const SERVICES = [
  {
    id: 'artisans',
    title: 'Artisans',
    badge: '3-min GPS',
    badgeClass: 'bg-primary/90 text-on-primary',
    icon: 'build',
    iconColor: 'text-primary',
    desc: 'Plomberie, Électricité, Froid & Split',
    price: '2 500 CFA dès',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy9IX9-FCZlrDYPnGVFt4wuKU2vxThiv7BuzPjo35Bezu4bUSkruu5TJwMviHGTQHaC_X6tDvrKrgzZMQ6VNJKfL_oot4HQ6WwZgyYmviZl5J7hXxS9jArtSqblajBBYOsG7I1klXKVVF7h9Gp7GZSjIHn5UlRL3gVRkTLS8U6rSVQcAUPJGM3Ynq74X_o89vghcSUQAFZE1hfONu2pFYeDFswmZzymWhC7_Rbhec'
  },
  {
    id: 'sante',
    title: 'Santé',
    badge: '24h/7',
    badgeClass: 'bg-tertiary/90 text-on-tertiary',
    icon: 'local_pharmacy',
    iconColor: 'text-tertiary',
    desc: 'Pharmacies de garde, Soins infirmiers',
    price: 'Chiffré SSL',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcy9WEtkHU7-1pOROGOexs_JVu7bkQNTVwZYXhwdMmNpEZi6YBGYDLonDXyC7YsWlU3Un4yioE-ubCVOn2nfhMrYf6KpfkvPIWgEb_4jzJ0YO2CXmQk0LYqhfe5LZahJLKc79HNYUm0K4WX9Q7wh71RrYjMDCY7McvfdDXSkscjU2GLnhbtH3uCvO7cqVuRujnuiXsg-Kzb0j5Du89nODmqxs_ygSWkuRWLAWvoCs'
  },
  {
    id: 'veterinaire',
    title: 'Vétérinaire',
    badge: 'Urgences',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    icon: 'pets',
    iconColor: 'text-secondary',
    desc: 'Soins domestiques, Vaccins & Élevage',
    price: 'À Domicile',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS1MYZNezJNEKG1SqvP6CnratwIA-4JUw-u90YtgrSJMxXsMAYwnNkjgxEwQRIns1-Qghh0NbRLD0NSvFUWclXLkRvZGnwqs8mSH1V8Xvli_44ENwmjNcmwvtUOYeGhihSLwoHeBsLJ_lfdfYOuUzxtvj7MIMa9BcnXBLgAHrtVV9BUriKwZW989wJ3XjihlibKJtsnKb8nWqRK25veXxuASzFfl5xWRbxngafkdA'
  },
  {
    id: 'immobilier',
    title: 'Immobilier',
    badge: 'Bailleur KYC',
    badgeClass: 'bg-primary text-on-primary',
    icon: 'apartment',
    iconColor: 'text-primary',
    desc: "Achat, Location & Gestion d'habitat",
    price: 'Sécurisé',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBkOmrdWhp_5josBfII9f29sLTLDc2ZdUXDPZSnynJ8sMemySFga24bVHTOu6Q-eFVFYxKRP1l2r8eyvMQrjuE6NSWlNHTieziFOl7CU2LHk4LklAsB0pQvjICc9_-bjvlUskm-6WPU0r3TXl68GYkWQ-Fli8MO9rG1MPTHUYY3g8wtouf7TfT-6JkE7R96p6LRvq3-8vVsEl74PJgYolPTOrQAC4caLcEDHJM9QI'
  },
  {
    id: 'cabine',
    title: 'Cabine Ligne',
    badge: 'Instantané',
    badgeClass: 'bg-secondary text-on-secondary',
    icon: 'wifi_tethering',
    iconColor: 'text-secondary',
    desc: 'Pass Internet, Unités Orange, MTN, Moov',
    price: '0% Frais',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFBubQH7zlDwAy9evBhPiOqRNWmhgHVslmm5lAuaOhDEZVoN9NiLjWcYZLp4vWLh7FHrmpAtO4mcJRfIqjMt3fcYyYiA9l-aE5gEC4J52HAochpKzG2PpGyO8RWXQrLBVia3Bi2SIHl418vukjyZTBq93c6BfM8S6_Fmi1ZI-C2Wy4cuerNaW94wc-vDGwZRnnN24A4ZHv8UWpTCNeWDcS4IbVxmT5G83Qdfgo8c8'
  },
  {
    id: 'vente',
    title: 'Vente Express',
    badge: 'Express',
    badgeClass: 'bg-primary-container text-on-primary',
    icon: 'shopping_bag',
    iconColor: 'text-primary',
    desc: 'Quincaillerie, prises, livraison coursier',
    price: 'Suivi Live',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcAdjcdO_X7FEFdfS2_VIZcL2m2EC-Nc8cnI_rcQQuD0PajF_70K9SsydeXSjrSgcMC0v_YsBWPaA2z6x1SLH9f7OY6y--N5GJw9fKRhwlhPozK-Hgb9W1t6MWN84joemmS9vc68IAMkwMJZtkfB_PJX8sb4tbTfTh3Msq8KZ-enQVlu3rmrWEP9BoM7366abzIvKTntFwc2B5y3oQqdnMG_WPhq6RU5BvMrKYlmg'
  }
];

export default function DashboardScreen({ user, onLogout, onSelectService, onTriggerSOS }) {
  const [currentLang, setCurrentLang] = useState('FR');
  const [showLangDrawer, setShowLangDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [activeTab, setActiveTab] = useState('accueil'); // 'accueil' | 'services' | 'mes-demandes' | 'profil-utilisateur'

  const userName = user?.name || user?.fullName || 'Aminata';
  const userCommune = user?.commune || 'Abidjan, Cocody Blockhauss';

  const handleVoiceTrigger = () => {
    setIsVoiceActive(true);
    setTimeout(() => {
      setIsVoiceActive(false);
      setSearchQuery('Je cherche un réparateur de clim à Cocody');
    }, 1500);
  };

  const handleSOS = () => {
    if (onTriggerSOS) {
      onTriggerSOS();
    } else {
      alert("🚨 ALERTE SOS ACTIVÉE : Vos coordonnées GPS sont partagées en priorité absolue aux équipes d'urgence les plus proches d'Abidjan.");
    }
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen">
      
      {/* Top Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
        <div className="h-16 px-gutter flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-space-sm">
            <img 
              alt="Logo Vitefê" 
              className="h-10 w-10 object-contain rounded-full shadow-sm" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxyl4AXElwnJH6xqTTkDvXVaGemSFBig84Cml86g8LdiBhBSXdRnnYTjiuXe6NPhbzlPs4jJNPh3vJJ9Pj0mdXUSrV2__chVbFbFW172ItqU7K11z3ZS6EqprMWVjEthohUAZMWQhwg73Yw1wHp-3l_NpL3B5IR95AyuVLAf0mOtWyClpq_pDCY-JDhcl-S8caWraTeeXS-QozLnndZ0gF6NEQloIQLACbdk4al-UZ6rfAwdL8Z1mh"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">Vitefê</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Abidjan, CI</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-space-sm">
            {/* Bouton SOS Urgent */}
            <button 
              type="button"
              onClick={handleSOS}
              className="h-11 px-space-md rounded-full bg-tertiary text-on-tertiary flex items-center justify-center gap-1 shadow-[0_4px_16px_rgba(101,0,5,0.25)] hover:bg-tertiary-container transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">emergency</span>
              <span className="font-label-md text-label-md tracking-wide uppercase font-bold">SOS</span>
            </button>
            {/* Profil utilisateur / Déconnexion */}
            <button 
              type="button"
              onClick={onLogout}
              title="Mon Profil / Déconnexion"
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full pb-6 space-y-4 max-w-md mx-auto">
          
          {/* Top Greeting & Language Selector Card */}
          <div className="px-gutter pt-2">
            <div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-md relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-surface-tint opacity-20 pointer-events-none"></div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed font-bold">
                      Ven. 6 Nov. 2026
                    </span>
                  </div>
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-surface leading-tight font-extrabold">
                    Bonjour {userName},
                  </h2>
                  <div className="flex items-center gap-1 text-on-primary-container mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span className="font-body-sm text-body-sm">{userCommune}</span>
                  </div>
                </div>

                {/* Language Pill Switcher */}
                <div className="flex flex-col items-end gap-1.5">
                  <div className="bg-surface/10 backdrop-blur-md p-1 rounded-full flex items-center space-x-1">
                    <button 
                      type="button"
                      onClick={() => setCurrentLang('FR')}
                      className={`px-2.5 py-1 rounded-full text-label-sm font-label-sm shadow-sm transition-all ${
                        currentLang === 'FR' ? 'text-on-primary bg-primary' : 'text-surface-variant hover:text-on-primary'
                      }`}
                    >
                      FR
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCurrentLang('NOUCHI')}
                      className={`px-2.5 py-1 rounded-full text-label-sm font-label-sm shadow-sm transition-all ${
                        currentLang === 'NOUCHI' ? 'text-on-primary bg-primary' : 'text-surface-variant hover:text-on-primary'
                      }`}
                    >
                      Nouchi
                    </button>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowLangDrawer(!showLangDrawer)}
                    className="flex items-center gap-1 text-on-primary-container text-label-sm font-label-sm"
                  >
                    <span>+ Ivoirian</span>
                    <span className="material-symbols-outlined text-[14px]">
                      {showLangDrawer ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Extended Language Drawer */}
              {showLangDrawer && (
                <div className="mt-3 pt-3 border-t border-on-primary-container/20 flex flex-wrap gap-1.5 relative z-10 animate-fade-in">
                  {['Baoulé', 'Dioula', 'Bété', 'English', 'العربية', '中文'].map((l) => (
                    <span 
                      key={l}
                      onClick={() => { setCurrentLang(l); setShowLangDrawer(false); }}
                      className="px-2 py-0.5 rounded-full bg-surface/20 text-on-primary font-label-sm text-label-sm cursor-pointer hover:bg-surface/30 active:scale-95 transition-all"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Multimodal Voice & Text Search Bar */}
          <div className="px-gutter">
            <div className="relative flex items-center bg-surface-container-lowest rounded-full p-1.5 shadow-[0_4px_20px_rgba(19,78,52,0.08)]">
              <div className="pl-3.5 pr-2 flex items-center pointer-events-none text-primary">
                <span className="material-symbols-outlined text-[22px]">search</span>
              </div>
              <input 
                className="w-full bg-transparent text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none" 
                placeholder={currentLang === 'NOUCHI' ? "Dis-moi ton gbairai, on gère vite..." : "Dis-moi ce qu'il te faut..."} 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="button"
                onClick={handleVoiceTrigger}
                aria-label="Microphone" 
                className="relative flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-tr from-secondary-container to-secondary flex items-center justify-center text-on-secondary shadow-md active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[22px]">mic</span>
                {isVoiceActive && (
                  <span className="absolute inset-0 rounded-full bg-secondary opacity-75 animate-ping"></span>
                )}
              </button>
            </div>
          </div>

          {/* Distinctive High-Priority SOS Quick Access Banner */}
          <div className="px-gutter">
            <div className="bg-gradient-to-r from-tertiary-container via-tertiary to-error p-space-md rounded-xl text-on-tertiary flex items-center justify-between shadow-[0_8px_20px_rgba(143,0,11,0.22)] relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-on-tertiary/10 pointer-events-none"></div>
              <div className="flex items-center gap-space-sm relative z-10">
                <div className="w-10 h-10 rounded-full bg-on-tertiary/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                  <span className="material-symbols-outlined text-[24px] text-on-tertiary">emergency_home</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-sm text-headline-sm font-bold uppercase tracking-tight">SOS Urgence 3-Min</span>
                    <span className="bg-on-tertiary text-tertiary font-label-sm text-label-sm px-1.5 py-0.5 rounded-full uppercase font-bold">
                      Direct
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-tertiary-fixed opacity-95">
                    Pompiers, ambulance locale, fuite d'eau critique
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={handleSOS}
                className="flex-shrink-0 relative z-10 bg-on-tertiary text-tertiary font-label-lg text-label-lg px-space-md py-2 rounded-full shadow hover:bg-surface-container-low transition-colors font-bold active:scale-95"
              >
                Alerter
              </button>
            </div>
          </div>

          {/* Six Key Services Grid Section */}
          <div className="px-gutter">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-headline-md text-headline-md text-primary tracking-tight font-bold">Services Essentiels</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Qualité certifiée &amp; intervention rapide à Abidjan</p>
              </div>
              <span className="font-label-sm text-label-sm text-secondary uppercase bg-secondary-fixed/50 px-2 py-1 rounded-md font-bold">
                6 Domaines
              </span>
            </div>

            {/* 2-Column Responsive Service Card Matrix */}
            <div className="grid grid-cols-2 gap-space-sm">
              {SERVICES.map((svc) => (
                <div 
                  key={svc.id}
                  onClick={() => onSelectService && onSelectService(svc.id)}
                  className="bg-surface-container-lowest rounded-xl p-space-sm flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer active:scale-98"
                >
                  <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2 bg-surface-container">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      src={svc.image} 
                      alt={svc.title}
                    />
                    <span className={`absolute top-1.5 left-1.5 font-label-sm text-label-sm px-1.5 py-0.5 rounded font-bold backdrop-blur-sm ${svc.badgeClass}`}>
                      {svc.badge}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className={`material-symbols-outlined text-[18px] ${svc.iconColor}`}>
                        {svc.icon}
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                        {svc.title}
                      </h4>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {svc.desc}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 flex items-center justify-between border-t border-surface-container/40">
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      {svc.price}
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Tracker & Trust Escrow Banner */}
          <div className="px-gutter space-y-3">
            {/* Mini Live Tracking Card */}
            <div className="bg-surface-container-lowest rounded-xl p-space-sm shadow-sm flex items-center gap-space-sm border border-outline-variant/30">
              <div 
                className="w-20 h-20 rounded-lg flex-shrink-0 bg-cover bg-center relative overflow-hidden shadow-inner" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBFV76EYw-6LkJbsz0aSKVDz7yo5-G8XkInH1PDcWtUfiN2EyT-knlR2iK5KZI9E5kPMOYeKvURv8uDyNjAyqn4eylFDBY3f06wjieGPCZ_BORFEL0kFTukhTbRZgXwf10-SjLkAguAjgzM-o4xeHZDUXlWLDCvIQ8Pgu2JWmNBWaCT9eLDohsJ4do6E1-JhPzln9-mtD_JNu9svRnEoYSegb_9MysiWyrkQeUna78')" }}
              >
                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-secondary ring-4 ring-on-primary shadow-lg animate-bounce"></span>
                </div>
              </div>
              <div className="flex flex-col justify-center min-w-0 flex-1">
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-[16px]">two_wheeler</span>
                  <span className="font-label-sm text-label-sm font-bold uppercase">Kouamé en route (Plombier)</span>
                </div>
                <h4 className="font-body-md text-body-md font-semibold text-on-surface truncate">Arrivée estimée : 7 min</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-3/4"></div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap font-bold">75%</span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => alert("Appel sécurisé masqué vers Kouamé (+225 07 •• •• ••)")}
                className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform shadow-sm" 
                title="Appeler l'artisan"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
              </button>
            </div>

            {/* Escrow & Local Money Partners Banner */}
            <div className="bg-surface-container rounded-xl p-space-sm flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-container shadow-sm">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                  </span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-surface block leading-tight font-bold">
                    Séquestre Vitefê Activé
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Fonds libérés après validation
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-1 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm font-bold shadow-xs">
                  Wave
                </span>
                <span className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-xs">
                  Orange
                </span>
                <span className="px-2 py-1 rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-bold shadow-xs">
                  MTN
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-outline-variant/20">
        <div className="flex justify-around items-center h-20 px-space-xs max-w-md mx-auto">
          
          <button 
            type="button"
            onClick={() => setActiveTab('accueil')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-space-sm transition-colors ${
              activeTab === 'accueil' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">home</span>
            <span className="font-label-sm text-label-sm">Accueil</span>
          </button>

          <button 
            type="button"
            onClick={() => setActiveTab('services')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-space-sm transition-colors ${
              activeTab === 'services' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">handyman</span>
            <span className="font-label-sm text-label-sm">Services</span>
          </button>

          <button 
            type="button"
            onClick={() => setActiveTab('mes-demandes')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-space-sm transition-colors ${
              activeTab === 'mes-demandes' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">assignment</span>
            <span className="font-label-sm text-label-sm">Demandes</span>
          </button>

          <button 
            type="button"
            onClick={() => setActiveTab('profil-utilisateur')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] px-space-sm transition-colors ${
              activeTab === 'profil-utilisateur' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
            <span className="font-label-sm text-label-sm">Profil</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
