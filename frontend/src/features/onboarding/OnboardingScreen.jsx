import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import LanguageSelector from './LanguageSelector';
import Button from '../../components/ui/Button';
import { Wrench, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function OnboardingScreen() {
  const { completeOnboarding } = useAppStore();

  return (
    <div className="min-h-screen bg-kita-dark text-white flex flex-col justify-between p-4 max-w-md mx-auto">
      {/* Header avec Logo Vitefê */}
      <div className="text-center pt-4 pb-2">
        <div className="inline-flex items-center space-x-2 bg-kita-darkest/60 px-4 py-2 rounded-full border border-emerald-500/20">
          <span className="text-xl font-black tracking-tight text-white">
            Vite<span className="text-gold">fê</span>
          </span>
          <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-widest">
            Abidjan
          </span>
        </div>
        <p className="text-xs text-emerald-200/80 mt-1">
          Votre partenaire d'urgence & de dépannage
        </p>
      </div>

      {/* Mini-strip BD illustré (3 vignettes de présentation) */}
      <div className="my-4 space-y-2.5">
        <div className="bg-white text-gray-900 rounded-2xl p-3 comic-border flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-wide">1. Besoin Express</span>
            <p className="text-xs font-bold leading-tight">Décris ta panne par la voix en Nouchi ou envoie une photo</p>
          </div>
        </div>

        <div className="bg-white text-gray-900 rounded-2xl p-3 comic-border flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wide">2. Règle des 3 minutes</span>
            <p className="text-xs font-bold leading-tight">L'artisan accrédité le plus proche intervient immédiatement</p>
          </div>
        </div>

        <div className="bg-white text-gray-900 rounded-2xl p-3 comic-border flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-blue-600 tracking-wide">3. Séquestre Garanti</span>
            <p className="text-xs font-bold leading-tight">L'argent est bloqué. Tu ne libères les fonds qu'après vérification</p>
          </div>
        </div>
      </div>

      {/* Sélecteur de Langue de Confort */}
      <div className="mb-4">
        <LanguageSelector />
      </div>

      {/* Bouton pour entrer dans l'application */}
      <div className="pb-4">
        <Button
          fullWidth
          size="lg"
          variant="gold"
          onClick={completeOnboarding}
          icon={ArrowRight}
        >
          Commencer sur Vitefê
        </Button>
      </div>
    </div>
  );
}
