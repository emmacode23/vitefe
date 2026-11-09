import React, { useState } from 'react';

const CRAFTS = [
  { id: 'Plomberie', label: 'Plomberie', subtitle: 'Urgences & Fuites', icon: 'plumbing' },
  { id: 'Électricité', label: 'Électricité', subtitle: 'Pannes & Câblage', icon: 'electric_bolt' },
  { id: 'Climatisation', label: 'Climatisation', subtitle: 'Froid & Entretien', icon: 'ac_unit' },
  { id: 'Soins', label: 'Soins Infirmiers', subtitle: 'Santé domicile', icon: 'medical_services' },
  { id: 'Vétérinaire', label: 'Vétérinaire', subtitle: 'Visite urbaine', icon: 'pets' },
  { id: 'Livraison', label: 'Livreur & Matériel', subtitle: 'Pièces express', icon: 'local_shipping' },
];

const WALLETS = [
  { id: 'Wave', label: 'Wave CI', subtitle: 'Instant 0%', icon: 'waves' },
  { id: 'Orange Money', label: 'Orange Money', subtitle: 'OM CI Direct', icon: 'account_balance_wallet' },
  { id: 'MTN MoMo', label: 'MTN MoMo', subtitle: 'MoMo Pro', icon: 'payments' },
  { id: 'Moov Money', label: 'Moov Money', subtitle: 'Flooz Pro', icon: 'savings' },
];

export default function ArtisanRegistrationScreen({ onBack, onSuccess, onGoToLogin }) {
  const [proName, setProName] = useState('Kouassi Aristide');
  const [selectedCraft, setSelectedCraft] = useState('Plomberie');
  const [whatsappPhone, setWhatsappPhone] = useState('07 88 12 34 56');
  const [commune, setCommune] = useState('Cocody (Angré, Riviera, Deux-Plateaux)');
  const [selectedWallet, setSelectedWallet] = useState('Wave');
  const [cniFile, setCniFile] = useState({ name: 'CNI_Kouassi_Recto_Verso.jpg', status: '2.4 Mo • Document conforme' });
  const [toolsFile, setToolsFile] = useState({ name: 'Kit_Caisse_Outils_Pro.png', status: "Validé pour l'inspection" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 10);
    let formatted = '';
    for (let i = 0; i < raw.length; i++) {
      if (i > 0 && i % 2 === 0) formatted += ' ';
      formatted += raw[i];
    }
    setWhatsappPhone(formatted);
  };

  const handleSimulateUpload = (type) => {
    if (type === 'cni') {
      setCniFile({ name: 'CNI_2026_Mise_A_Jour.pdf', status: 'Nouveau fichier chargé' });
    } else {
      setToolsFile({ name: 'Atelier_Zone4_Outillage.jpg', status: 'Nouveau fichier chargé' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSuccess) {
      onSuccess({ proName, craft: selectedCraft, phone: whatsappPhone, commune, wallet: selectedWallet, role: 'artisan' });
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeD1-aN54wxcQPZ1sdUQarJMZqvNXPVpc1x9vSs-6yv8Fn8LV4i3-pVkNSS1LFN80kh9Tkvk830FQpAeiU2Ehx_3Tl8gKXpPmm84zadJq-CD1C55BWVhY-ndKgsL2xlA4hc6nivGpfad3btEjpYmm4RuEJKLaO1eptqX7jz_0U3BON7SlP0_tS1-juYT23JGNt0wQoW38Mz3TN9IhRF_fcpTg8WYujbWIB6269upjMuTlD2mHsKr7S"
            />
            <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate max-w-[160px]">
              Inscription Téléphone
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
        <div className="flex flex-col w-full pb-8 max-w-md mx-auto">
          
          {/* Progress & Context Strip */}
          <div className="px-gutter pt-2 pb-4 flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md shadow-sm">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
                Étape 3 sur 3
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Validation &amp; KYC Rapide
              </span>
            </div>
            {/* Stepper indicator line */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="h-1.5 rounded-full bg-primary"></div>
              <div className="h-1.5 rounded-full bg-primary"></div>
              <div className="h-1.5 rounded-full bg-secondary-container"></div>
            </div>
          </div>

          {/* Comic-Strip Header Card */}
          <div className="px-gutter mb-space-md">
            <div className="bg-primary-container text-on-primary rounded-xl p-space-md shadow-md relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-surface-tint/20 blur-xl pointer-events-none"></div>
              <div className="relative z-10 flex gap-space-md items-start">
                <div className="w-14 h-14 rounded-xl bg-surface-container-lowest/10 flex items-center justify-center shrink-0">
                  <img 
                    className="w-12 h-12 object-cover rounded-lg" 
                    alt="Artisan Vitefê"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuEqGWR6dn2Tdz7pFxdSWJPwzkqZRxsQBOAR6TP-0EUmYiL88nFHQ_eyK6ehxItu9Pwz9Mz_Ufx6KguY8Ei5OWtP4kDwEO1Z3JWkmzDIErjMtXTPyQuxtSRyADVMpQnDQP9OsUfMyi_MKTrovyG2g3wU0GFdbISulH8CJfoubY7l6JdfsVQHQzM_ypYyNGY1oFbB6z1_j28z_GC1gPoS384nNXy81GhkYsD7nCSks"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1 text-secondary-fixed font-label-sm text-label-sm mb-0.5">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    <span>Abidjan Pro Réseau</span>
                  </div>
                  <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary font-bold leading-tight">
                    Développez votre activité avec Vitefê
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-primary-container mt-1">
                    Rejoignez le 1er réseau d'artisans et soignants certifiés à Abidjan.
                  </p>
                </div>
              </div>
              {/* Trust perks capsule bar */}
              <div className="mt-4 pt-3 bg-primary/40 -mx-space-md -mb-space-md px-space-md py-2.5 flex items-center justify-between text-on-primary-container text-label-sm font-label-sm">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary-fixed">lock</span>
                  Séquestre garanti
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary-fixed">near_me</span>
                  Clients proches
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary-fixed">payments</span>
                  Retraits directs
                </span>
              </div>
            </div>
          </div>

          {/* Main Registration Interactive Form */}
          <form className="px-gutter flex flex-col gap-space-lg" onSubmit={handleSubmit}>
            
            {/* Section 1: Profil Professionnel */}
            <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-sm text-label-sm font-bold">
                  1
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Identité Professionnelle
                </h3>
              </div>

              {/* Field: Full Name / Company */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface flex items-center justify-between" htmlFor="pro-name">
                  <span>Nom &amp; Prénom / Raison sociale</span>
                  <span className="text-secondary font-label-sm text-label-sm font-bold">Requis</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">badge</span>
                  <input 
                    className="w-full h-12 pl-10 pr-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none shadow-sm" 
                    id="pro-name" 
                    placeholder="Ex: Koffi Kouassi / Ivoire Climat SARL" 
                    type="text" 
                    value={proName}
                    onChange={(e) => setProName(e.target.value)}
                  />
                </div>
              </div>

              {/* Field: Métier principal */}
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                  <span>Métier principal certifié</span>
                  <span className="text-on-surface-variant font-label-sm text-label-sm">Sélection unique</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CRAFTS.map((craft) => {
                    const isSelected = selectedCraft === craft.id;
                    return (
                      <button 
                        key={craft.id}
                        type="button"
                        onClick={() => setSelectedCraft(craft.id)}
                        className={`p-3 rounded-xl shadow-sm flex items-center gap-2.5 text-left transition-all active:scale-95 ${
                          isSelected 
                            ? 'bg-primary text-on-primary ring-2 ring-primary/30' 
                            : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[22px] ${
                          isSelected ? 'text-secondary-fixed' : 'text-primary'
                        }`}>
                          {craft.icon}
                        </span>
                        <div className="min-w-0">
                          <p className="font-label-md text-label-md truncate font-bold">{craft.label}</p>
                          <p className={`font-label-sm text-label-sm ${isSelected ? 'opacity-80' : 'text-on-surface-variant'}`}>
                            {craft.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field: WhatsApp Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface flex items-center justify-between" htmlFor="phone-number">
                  <span>Numéro WhatsApp Business</span>
                  <span className="text-secondary font-label-sm text-label-sm font-bold">Dépêches par SMS/WA</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="h-12 px-3 rounded-lg bg-surface-container-high flex items-center gap-1.5 shrink-0 text-on-surface font-label-md text-label-md shadow-sm">
                    <span>🇨🇮</span>
                    <span>+225</span>
                  </div>
                  <div className="relative flex-1 flex items-center">
                    <input 
                      className="w-full h-12 px-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none shadow-sm" 
                      id="phone-number" 
                      placeholder="07 08 45 67 89" 
                      type="tel" 
                      value={whatsappPhone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>
              </div>

              {/* Field: Zone favorite d'intervention */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="commune-select">
                  Zone favorite d'intervention (Abidjan)
                </label>
                <div className="relative">
                  <select 
                    className="w-full h-12 pl-3 pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm appearance-none focus:outline-none" 
                    id="commune-select"
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                  >
                    <option value="Cocody (Angré, Riviera, Deux-Plateaux)">Cocody (Angré, Riviera, Deux-Plateaux)</option>
                    <option value="Yopougon (Maroc, Selmer, Niangon)">Yopougon (Maroc, Selmer, Niangon)</option>
                    <option value="Marcory & Zone 4">Marcory &amp; Zone 4</option>
                    <option value="Koumassi & Port-Bouët">Koumassi &amp; Port-Bouët</option>
                    <option value="Plateau & Adjamé">Plateau &amp; Adjamé</option>
                    <option value="Treichville & Attecoubé">Treichville &amp; Attecoubé</option>
                    <option value="Bingerville">Bingerville</option>
                    <option value="Grand Abidjan (Toutes communes)">Grand Abidjan (Toutes communes)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-outline pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Vérification KYC Express */}
            <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-sm text-label-sm font-bold">
                    2
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Vérification Sécurisée (KYC)
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  Sous 24h
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant -mt-1">
                Nécessaire pour activer le badge <span className="font-semibold text-primary">Artisan Certifié Vitefê</span> et débloquer les dépêches urgentes.
              </p>

              {/* KYC Upload 1: Piece d'identite */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-md text-label-md text-on-surface flex items-center justify-between">
                  <span>Pièce d'identité officielle (CNI, Passeport, Permis)</span>
                  <span className="text-primary font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span> Déjà prêt
                  </span>
                </span>
                <div 
                  className="bg-surface-container-lowest rounded-xl p-3 flex items-center gap-3 cursor-pointer shadow-sm hover:bg-surface-container transition-all"
                  onClick={() => handleSimulateUpload('cni')}
                >
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[26px]">id_card</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface truncate font-medium">{cniFile.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary"></span> {cniFile.status}
                    </p>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high shrink-0" type="button">
                    <span className="material-symbols-outlined text-[18px]">cached</span>
                  </button>
                </div>
              </div>

              {/* KYC Upload 2: Photo Atelier / Outils */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-md text-label-md text-on-surface">
                  Photo de votre matériel ou attestation professionnelle
                </span>
                <div 
                  className="bg-surface-container-lowest rounded-xl p-3 flex items-center gap-3 cursor-pointer shadow-sm hover:bg-surface-container transition-all"
                  onClick={() => handleSimulateUpload('tools')}
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[26px]">handyman</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md text-on-surface truncate font-medium">{toolsFile.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary"></span> {toolsFile.status}
                    </p>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high shrink-0" type="button">
                    <span className="material-symbols-outlined text-[18px]">cached</span>
                  </button>
                </div>
              </div>

              {/* Mini KYC visual confirmation preview card */}
              <div className="bg-surface-container-lowest rounded-xl p-3 flex items-center gap-3 shadow-sm">
                <img 
                  className="w-14 h-14 rounded-lg object-cover shrink-0" 
                  alt="Aperçu Atelier"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlZCBMkKHQQlvaBgSJd0XMISyuwZGhDfHCG-vRjErLP-UaQfiVtWhXIoKqxHVexjB1tA0fpy1BJGpIQ8LRlFLE_TaTXVnw6CAL-Ob7wMGFAyH1VSaG6bJUKRCe0rhwjpl_rIkTMfh1vaZtkeJdCwwro8fSrVc4wkyIQI-AKXcbpxihOGSoFdnFWOJh2BxIUGNITxbWxSh2v9P5Mtg9Mnp2eFeS61y70umscf9cPvM"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">Aperçu Atelier</p>
                  <p className="font-label-md text-label-md text-on-surface truncate font-bold">Kouassi Plomberie Express</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Zone : Deux-Plateaux Vallon</p>
                </div>
                <span className="material-symbols-outlined text-primary text-[22px]">check_circle</span>
              </div>
            </div>

            {/* Section 3: Modes de Versement Mobile Money */}
            <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary font-label-sm text-label-sm font-bold">
                    3
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Paiement de vos Revenus
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold">Sans Frais</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant -mt-1">
                Les montants séquestrés par le client sont automatiquement libérés sur votre compte dès la validation du code OTP de fin de tâche.
              </p>

              <div className="grid grid-cols-2 gap-2">
                {WALLETS.map((w) => {
                  const isSelected = selectedWallet === w.id;
                  return (
                    <button 
                      key={w.id}
                      type="button"
                      onClick={() => setSelectedWallet(w.id)}
                      className={`p-3 rounded-xl shadow-sm flex flex-col gap-1.5 transition-all text-left active:scale-95 ${
                        isSelected 
                          ? 'bg-primary text-on-primary' 
                          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`material-symbols-outlined text-[24px] ${isSelected ? 'text-secondary-fixed' : 'text-primary'}`}>
                          {w.icon}
                        </span>
                        <span className={`material-symbols-outlined text-[18px] ${isSelected ? 'text-white' : 'text-outline'}`}>
                          {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                        </span>
                      </div>
                      <div>
                        <p className="font-label-md text-label-md font-bold">{w.label}</p>
                        <p className={`font-label-sm text-label-sm ${isSelected ? 'opacity-80' : 'text-on-surface-variant'}`}>
                          {w.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Escrow safety reminder banner */}
              <div className="bg-surface-container-highest rounded-xl p-3 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">shield</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  <strong className="text-on-surface font-semibold">Séquestre Automatique Vitefê :</strong> Vous n'avancez plus jamais de frais sans que l'argent du client ne soit déjà consigné et bloqué.
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="flex flex-col gap-3 pt-2">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                    <span>Envoi sécurisé du dossier...</span>
                  </>
                ) : (
                  <>
                    <span>Soumettre mon dossier partenaire</span>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Déjà partenaire ? 
                  <button 
                    type="button"
                    onClick={onGoToLogin}
                    className="font-label-lg text-label-lg text-primary hover:underline ml-1 inline-flex items-center font-bold"
                  >
                    Se connecter
                    <span className="material-symbols-outlined text-[16px] ml-0.5">arrow_forward</span>
                  </button>
                </p>
              </div>
            </div>

          </form>

        </div>
      </main>

      {/* Toast Notification Popup */}
      <div 
        className={`fixed bottom-6 left-4 right-4 max-w-md mx-auto z-50 transition-all duration-300 ${
          showToast ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-primary text-on-primary rounded-xl p-4 shadow-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">task_alt</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-headline-sm text-headline-sm leading-tight text-white font-bold">Dossier reçu avec succès !</p>
            <p className="font-body-sm text-body-sm text-on-primary-container">Votre agent référent vous contacte sous 24h.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
