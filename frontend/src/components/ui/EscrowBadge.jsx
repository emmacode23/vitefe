import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function EscrowBadge() {
  return (
    <div className="bg-emerald-950/60 backdrop-blur-md rounded-2xl p-3 border border-emerald-500/20 text-white flex items-center justify-between">
      <div className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
          <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <div className="text-xs font-bold text-emerald-100 flex items-center space-x-1">
            <span>Séquestre Garanti</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-[10px] text-emerald-300/80">Paiement bloqué jusqu'au code OTP</p>
        </div>
      </div>

      {/* Badges opérateurs */}
      <div className="flex items-center space-x-1.5">
        <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-[#1EA5E8] text-white">
          Wave
        </span>
        <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-[#FF7900] text-white">
          Orange
        </span>
        <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-[#FFCC00] text-black">
          MTN
        </span>
      </div>
    </div>
  );
}
