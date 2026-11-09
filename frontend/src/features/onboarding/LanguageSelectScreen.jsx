import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

const LANG_PHRASES = {
  francais: {
    title: "Aperçu vocal : Français",
    phrase: "« Salut ! Quel dépannage te faut-il aujourd'hui ? »"
  },
  nouchi: {
    title: "Aperçu vocal : Nouchi",
    phrase: "« Y'a fohi ! Quel grotto ou quel môgô tu cherches ? »"
  },
  baoule: {
    title: "Aperçu vocal : Baoulé",
    phrase: "« N’zue kpli ! N’zué man wo ? N’dé bô o wo léo ? »"
  },
  dioula: {
    title: "Aperçu vocal : Dioula",
    phrase: "« I ni sogoma ! Mun be i bolo bi dɛmɛ sira la ? »"
  },
  bete: {
    title: "Aperçu vocal : Bété",
    phrase: "« Ahowa ! N’goli mou lélé ahoua gbagba ? »"
  },
  english: {
    title: "Audio Preview: English",
    phrase: "“Hello! What service or emergency do you need right now?”"
  },
  arabic: {
    title: "معاينة صوتية: العربية",
    phrase: "« أهلاً بك! ما هي الخدمة أو الطوارئ التي تحتاجها اليوم؟ »"
  },
  chinese: {
    title: "语音预览：中文",
    phrase: "“您好！您今天需要什么上门维修或应急服务？”"
  },
  russian: {
    title: "Голосовой образец: Русский",
    phrase: "« Здравствуйте! Какая помощь или услуга вам требуется сегодня? »"
  }
};

const IVOIRIAN_LANGUAGES = [
  {
    key: 'nouchi',
    name: 'Nouchi',
    flag: '🇨🇮',
    badge: 'Populaire',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    desc: "L'argot d'Abidjan « On est ensemble ! »",
    flagBg: 'bg-secondary-fixed-dim/30'
  },
  {
    key: 'baoule',
    name: 'Baoulé',
    flag: '🇨🇮',
    desc: "Langue akan du centre & lagunes",
    flagBg: 'bg-primary-fixed/40'
  },
  {
    key: 'dioula',
    name: 'Dioula',
    flag: '🇨🇮',
    desc: "N'ko / Phonétique commerciale",
    flagBg: 'bg-surface-variant'
  },
  {
    key: 'bete',
    name: 'Bété',
    flag: '🇨🇮',
    desc: "Langue kru du sud-ouest",
    flagBg: 'bg-secondary-fixed/30'
  }
];

const INTERNATIONAL_LANGUAGES = [
  {
    key: 'francais',
    name: 'Français',
    flag: '🇫🇷',
    badge: 'Par défaut',
    badgeClass: 'bg-primary text-on-primary',
    desc: "Langue officielle ivoirienne",
    flagBg: 'bg-primary-fixed'
  },
  {
    key: 'english',
    name: 'English',
    flag: '🇬🇧',
    desc: "Business & ECOWAS neighborhood",
    flagBg: 'bg-surface-variant'
  },
  {
    key: 'arabic',
    name: 'العربية (Arabe)',
    flag: '🇱🇧',
    desc: "Communauté commerçante",
    flagBg: 'bg-surface-variant'
  },
  {
    key: 'chinese',
    name: '中文 (Chinois)',
    flag: '🇨🇳',
    desc: "Partenaires techniques & imports",
    flagBg: 'bg-surface-variant'
  },
  {
    key: 'russian',
    name: 'Русский (Russe)',
    flag: '🇷🇺',
    desc: "Coopération & diplomatie",
    flagBg: 'bg-surface-variant'
  }
];

export default function LanguageSelectScreen({ onBack, onConfirm }) {
  const { currentLanguage, setLanguage } = useAppStore();
  const [selectedLang, setSelectedLang] = useState(currentLanguage || 'francais');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPreview = LANG_PHRASES[selectedLang] || LANG_PHRASES.francais;

  const handleSelect = (langKey) => {
    setSelectedLang(langKey);
    setLanguage(langKey);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTimeout(() => {
        setIsPlaying(false);
      }, 2400);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm(selectedLang);
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
              className="w-auto object-contain h-8" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxyl4AXElwnJH6xqTTkDvXVaGemSFBig84Cml86g8LdiBhBSXdRnnYTjiuXe6NPhbzlPs4jJNPh3vJJ9Pj0mdXUSrV2__chVbFbFW172ItqU7K11z3ZS6EqprMWVjEthohUAZMWQhwg73Yw1wHp-3l_NpL3B5IR95AyuVLAf0mOtWyClpq_pDCY-JDhcl-S8caWraTeeXS-QozLnndZ0gF6NEQloIQLACbdk4al-UZ6rfAwdL8Z1mh"
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

      {/* Contenu principal scrollable */}
      <main className="flex flex-col relative w-full pt-16 pb-safe bg-surface min-h-screen">
        <div className="flex flex-col w-full max-w-md mx-auto px-gutter pb-space-2xl space-y-space-lg">
          
          {/* Progress Stepper Tracker */}
          <div className="flex flex-col space-y-space-xs pt-space-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm shadow-sm">
                  1
                </span>
                <span className="font-label-md text-label-md uppercase tracking-wider text-surface-tint">
                  Étape 1/3
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-outline">Configuration initiale</span>
            </div>
            <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-secondary-container h-full rounded-full transition-all duration-500" 
                style={{ width: '33.33%' }}
              />
            </div>
          </div>

          {/* Comic Narrative Vignette & Greeting Card */}
          <div className="relative overflow-hidden rounded-xl bg-primary text-on-primary p-space-md shadow-md">
            <div className="flex items-start gap-space-md relative z-10">
              <div className="w-14 h-14 rounded-full bg-primary-container flex-shrink-0 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-secondary-container text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  forum
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
                  <span>Abidjan Proximité</span>
                </div>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-surface-bright">
                  Comment préférez-vous échanger&nbsp;?
                </h2>
                <p className="font-body-md text-body-md text-primary-fixed-dim">
                  Vitefê parle votre langue, à l'écrit comme à la voix&nbsp;!
                </p>
              </div>
            </div>
            {/* Action Line Decor */}
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-surface-tint/20 rounded-full blur-xl pointer-events-none"></div>
          </div>

          {/* Audio Preview Micro-Widget (Multimodal Voice First) */}
          <div className="rounded-xl bg-surface-container-low p-space-md shadow-sm flex items-center justify-between gap-space-sm" id="voice-preview-card">
            <div className="flex items-center gap-space-sm min-w-0">
              <button 
                type="button"
                onClick={handleTogglePlay}
                aria-label="Écouter l'aperçu audio" 
                className={`w-11 h-11 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm flex-shrink-0 transition-transform active:scale-95 ${isPlaying ? 'scale-105' : ''}`}
              >
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isPlaying ? 'pause' : 'volume_up'}
                </span>
              </button>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface truncate">
                  {currentPreview.title}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {currentPreview.phrase}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
              <span>Voix HD</span>
            </div>
          </div>

          {/* Language Selection Main Form */}
          <form className="space-y-space-lg" onSubmit={handleSubmit}>
            
            {/* Group 1: Langues ivoiriennes & populaires */}
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    wb_sunny
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Langues ivoiriennes &amp; populaires
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed/40 text-on-secondary-fixed-variant">
                  Local first
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {IVOIRIAN_LANGUAGES.map((lang) => {
                  const isChecked = selectedLang === lang.key;
                  return (
                    <label 
                      key={lang.key}
                      onClick={() => handleSelect(lang.key)}
                      className={`group relative flex items-center justify-between p-space-md rounded-xl cursor-pointer transition-all active:scale-[0.99] select-none ${isChecked ? 'bg-surface-container shadow-sm' : 'bg-surface-container-low hover:bg-surface-container'}`}
                    >
                      <div className="flex items-center gap-space-md">
                        <div className={`w-10 h-10 rounded-full ${lang.flagBg} flex items-center justify-center text-xl shadow-inner`}>
                          <span>{lang.flag}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-label-lg text-label-lg text-on-surface">{lang.name}</span>
                            {lang.badge && (
                              <span className={`font-label-sm text-label-sm px-1.5 py-0.2 rounded ${lang.badgeClass}`}>
                                {lang.badge}
                              </span>
                            )}
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">{lang.desc}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="selected_language" 
                          value={lang.key} 
                          checked={isChecked} 
                          onChange={() => handleSelect(lang.key)} 
                          className="sr-only" 
                        />
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shadow-sm ${isChecked ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                          <span className={`material-symbols-outlined text-on-primary text-[16px] transition-transform ${isChecked ? 'scale-100' : 'scale-0'}`}>
                            check
                          </span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Group 2: Langues internationales */}
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between px-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-surface-tint text-[20px]">public</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Langues internationales
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                  Monde &amp; Diaspora
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {INTERNATIONAL_LANGUAGES.map((lang) => {
                  const isChecked = selectedLang === lang.key;
                  return (
                    <label 
                      key={lang.key}
                      onClick={() => handleSelect(lang.key)}
                      className={`group relative flex items-center justify-between p-space-md rounded-xl cursor-pointer transition-all active:scale-[0.99] select-none ${isChecked ? 'bg-surface-container shadow-sm' : 'bg-surface-container-low hover:bg-surface-container'}`}
                    >
                      <div className="flex items-center gap-space-md">
                        <div className={`w-10 h-10 rounded-full ${lang.flagBg} flex items-center justify-center text-xl shadow-inner`}>
                          <span>{lang.flag}</span>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-label-lg text-label-lg text-on-surface">{lang.name}</span>
                            {lang.badge && (
                              <span className={`font-label-sm text-label-sm px-1.5 py-0.2 rounded ${lang.badgeClass}`}>
                                {lang.badge}
                              </span>
                            )}
                          </div>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">{lang.desc}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          name="selected_language" 
                          value={lang.key} 
                          checked={isChecked} 
                          onChange={() => handleSelect(lang.key)} 
                          className="sr-only" 
                        />
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shadow-sm ${isChecked ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                          <span className={`material-symbols-outlined text-on-primary text-[16px] transition-transform ${isChecked ? 'scale-100' : 'scale-0'}`}>
                            check
                          </span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Security & Multilingual Escrow Note */}
            <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-high text-on-surface-variant">
              <span className="material-symbols-outlined text-surface-tint text-[20px] flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              <span className="font-body-sm text-body-sm">
                Tous les contrats d'interventions et alertes SOS s'adapteront automatiquement à cette langue.
              </span>
            </div>

            {/* Persistent Bottom Flow Actions */}
            <div className="pt-space-xs space-y-space-sm">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container active:scale-[0.98] text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-space-xs shadow-md transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <span>Valider et continuer</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>
              <p className="text-center font-body-sm text-body-sm text-outline">
                Modifiable à tout moment depuis les réglages de votre profil.
              </p>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
}
