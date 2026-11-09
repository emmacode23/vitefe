import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function EmergencyButton() {
  const { triggerEmergency } = useAppStore();

  return (
    <div className="fixed bottom-4 left-0 right-0 max-w-md mx-auto px-4 z-40 pointer-events-none">
      <div className="pointer-events-auto">
        <button
          onClick={triggerEmergency}
          className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-extrabold text-base sm:text-lg py-3.5 px-6 rounded-2xl shadow-sos flex items-center justify-center space-x-3 active:scale-98 transition-transform border border-red-400/40 relative overflow-hidden animate-pulse-ring"
        >
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-black tracking-wider text-white bg-red-700 px-1.5 py-0.5 rounded">SOS</span>
          </div>
          <span className="tracking-wide">Urgence Immédiate</span>
          <AlertCircle className="w-5 h-5 ml-auto text-white/90" />
        </button>
      </div>
    </div>
  );
}
