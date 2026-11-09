import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export default function RoleSelectScreen({ onBack, onSelectRole, onGoToLogin }) {
  const [selectedRole, setSelectedRole] = useState('client'); // 'client' | 'artisan'
  const { currentLanguage } = useAppStore();

  const handleRoleSubmit = (role) => {
    setSelectedRole(role);
    if (onSelectRole) {
      onSelectRole(role);
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
              alt="Vitefê Logo" 
              className="h-8 w-auto object-contain rounded-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGufZH_PEHmS-yOknJME-bAjmziKoG3PLhi04KOoa3f76IKy-51QxDmRTqjWS4Waglw0-bQuLcDr9Auz3kzAlBJiTZRDOSBaHKJtELnmLvxmwOeGOQJy07aS3d8TCSY7axAg9yo_S1cqqlzONG0WdW-NpdRt0NtBYKXSVCO_iw_YKlK68d-tuiqSUsmQis52XebGS3STsz0PRceXvQZ0IwAr8KOIfSYpum7AaU2IpLJd4Nas4uwUdD"
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
        <div className="flex flex-col w-full max-w-md mx-auto px-gutter pb-space-2xl space-y-space-lg">
          
          {/* Stepper & Top Context */}
          <div className="flex flex-col space-y-space-xs pt-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm tracking-wide uppercase">
                  Étape 2 / 3
                </span>
                <span className="text-on-surface-variant font-label-md text-label-md">Profil Vitefê</span>
              </div>
              {/* Multilingual Pill Indicator */}
              <div className="flex items-center space-x-1 text-on-surface-variant text-body-sm font-body-sm bg-surface-container px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-[16px] text-primary">translate</span>
                <span className="font-label-sm text-label-sm uppercase">{currentLanguage || 'FR'} · Nouchi</span>
              </div>
            </div>
            {/* Micro Progress Tracker (Étape 2/3 -> 66.6%) */}
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-primary h-full rounded-full transition-all duration-300" style={{ width: '66.66%' }}></div>
            </div>
          </div>

          {/* Title & Subtitle Section */}
          <div className="space-y-1">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
              Que souhaitez-vous faire aujourd'hui ?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Sélectionnez votre profil pour une expérience sur-mesure à Abidjan et partout en Côte d'Ivoire.
            </p>
          </div>

          {/* Selection Cards Container */}
          <div className="flex flex-col space-y-space-md" id="profile-selector">
            
            {/* Card 1: Je suis un Client */}
            <div 
              onClick={() => setSelectedRole('client')}
              className={`group relative flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all duration-200 cursor-pointer overflow-hidden border ${
                selectedRole === 'client' ? 'border-primary/40 ring-1 ring-primary/20' : 'border-transparent'
              }`}
            >
              {/* Active Selector Indicator */}
              <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-primary transition-opacity duration-200 ${
                selectedRole === 'client' ? 'opacity-100' : 'opacity-0'
              }`}></div>

              {/* Header of Card */}
              <div className="flex items-start justify-between gap-space-sm pl-1">
                <div className="flex items-center space-x-space-sm">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      person_pin_circle
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Je suis un Client</h3>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        Particulier
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Maison, santé, dépannage express</p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  selectedRole === 'client' ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {selectedRole === 'client' && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </div>
              </div>

              {/* Comic Strip Thematic Illustration Banner */}
              <div className="my-space-md rounded-lg overflow-hidden relative shadow-sm h-36 bg-surface-container">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Illustration Client Vitefê"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaOTxWo2hf3Bc7HBQ1gv3OQnstaCZA8M6k27XA_sp8b57Qc3nEDNzWvfU2162fyRpAT0HygyVZDzHpQ3z10HN6X26agGsMAQVqagpbN9VeU7edjJGXQlYhdQBL8IA2Ha9OiDD9RmMTP586ZDmlibgG_i-tWA9o33NhONUb6azAErDuUVVX8bTKvjCJ5hw3RX1QZIJZpACPUjBdnOOo8Z8z3baw2OB37FeGzQm2Uis"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-space-sm">
                  <span className="font-label-sm text-label-sm text-on-primary tracking-wide flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-secondary-fixed">verified_user</span>
                    Protection Séquestre Wave &amp; Orange Money
                  </span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2.5 mb-space-lg pl-1 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-start space-x-2">
                  <span className="material-symbols-outlined text-[18px] text-surface-tint shrink-0 mt-0.5">build_circle</span>
                  <span>Commander un dépannage ou un artisan certifié en moins de 3 min</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="material-symbols-outlined text-[18px] text-surface-tint shrink-0 mt-0.5">local_pharmacy</span>
                  <span>Pharmacie de garde, livraison d'urgence &amp; soins à domicile</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="material-symbols-outlined text-[18px] text-surface-tint shrink-0 mt-0.5">wifi_tethering</span>
                  <span>Acheter du crédit internet, matériel ou petits services quotidiens</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">lock_person</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Paiement garanti sécurisé : les fonds ne sont libérés qu'après validation
                  </span>
                </li>
              </ul>

              {/* CTA Button */}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleSubmit('client');
                }}
                className={`w-full h-12 rounded-lg font-label-lg text-label-lg flex items-center justify-center space-x-2 shadow-sm active:scale-[0.98] transition-transform ${
                  selectedRole === 'client' 
                    ? 'bg-primary text-on-primary' 
                    : 'bg-surface-container-highest text-on-surface'
                }`}
              >
                <span>M'inscrire comme Client</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>

            {/* Card 2: Je suis un Prestataire / Artisan */}
            <div 
              onClick={() => setSelectedRole('artisan')}
              className={`group relative flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all duration-200 cursor-pointer overflow-hidden border ${
                selectedRole === 'artisan' ? 'border-secondary/40 ring-1 ring-secondary/20' : 'border-transparent'
              }`}
            >
              {/* Active Selector Indicator */}
              <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-secondary transition-opacity duration-200 ${
                selectedRole === 'artisan' ? 'opacity-100' : 'opacity-0'
              }`}></div>

              {/* Header of Card */}
              <div className="flex items-start justify-between gap-space-sm pl-1">
                <div className="flex items-center space-x-space-sm">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-container shadow-sm shrink-0">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      handyman
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">Je suis un Prestataire</h3>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                        Artisan &amp; Pro
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Plombier, électricien, soignant, livreur</p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  selectedRole === 'artisan' ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {selectedRole === 'artisan' && (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  )}
                </div>
              </div>

              {/* Comic Strip Thematic Illustration Banner */}
              <div className="my-space-md rounded-lg overflow-hidden relative shadow-sm h-36 bg-surface-container">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Illustration Prestataire Vitefê"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM11IFx0YnGk0XYqiGE3XdmGvc4pn0ofbTymzmD9DOm1nFoMH-nrs9Gy-61tUmOSO6R8UoYeoL4mXnqRR2Tv3fZeTOSZRN7kpBysqTqR_-Dc21UyrgfeY3P6RQJnW1NUILepRR3T6W50yeR4XCEbTy2Ej6hkMoQDUHcctgZcaCBmPhZuy7tUvHO182hokun9OSAKZgLb7SlWk6yD6OBEUx4sHZmf8LTXdyJVo1XJQ"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-space-sm">
                  <span className="font-label-sm text-label-sm text-on-primary tracking-wide flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-secondary-fixed">workspace_premium</span>
                    Badge Artisan Vérifié · Zéro impayé garanti
                  </span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2.5 mb-space-lg pl-1 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-start space-x-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">near_me</span>
                  <span>Recevoir des missions géolocalisées dans votre commune (Cocody, Yopougon, etc.)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">payments</span>
                  <span>Revenus garantis par séquestre et versés instantanément sur Mobile Money</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">verified</span>
                  <span>Badge KYC officiel &amp; visibilité certifiée auprès de milliers d'utilisateurs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">support_agent</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Assistance dédiée Vitefê 7j/7 avec dispatch intelligent en 3 minutes
                  </span>
                </li>
              </ul>

              {/* CTA Button */}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoleSubmit('artisan');
                }}
                className={`w-full h-12 rounded-lg font-label-lg text-label-lg flex items-center justify-center space-x-2 shadow-sm active:scale-[0.98] transition-all ${
                  selectedRole === 'artisan' 
                    ? 'bg-secondary text-on-secondary' 
                    : 'bg-surface-container-highest text-on-surface'
                }`}
              >
                <span>Devenir Prestataire Partenaire</span>
                <span className="material-symbols-outlined text-[20px]">bolt</span>
              </button>
            </div>

          </div>

          {/* Trust Banner / Escrow reassurance */}
          <div className="rounded-xl bg-surface-container p-space-md flex items-center space-x-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[22px]">security</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-label-md text-label-md text-on-surface">Vitefê Sécurise Chaque Échange</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                Compatible Wave, Orange Money, MTN MoMo &amp; Moov
              </p>
            </div>
            <span className="material-symbols-outlined text-surface-tint text-[20px]">verified</span>
          </div>

          {/* Bottom Log In Redirection */}
          <div className="flex flex-col items-center justify-center pt-space-xs pb-space-sm text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Vous avez déjà un compte ?
            </p>
            <button 
              type="button"
              onClick={onGoToLogin}
              className="mt-1 font-label-lg text-label-lg text-primary underline underline-offset-4 active:opacity-70 transition-opacity"
            >
              Se connecter
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
