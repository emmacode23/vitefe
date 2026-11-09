import React from 'react';
import { Mic, Search, Radio } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export default function VoiceSearchBar({ onSearch }) {
  const { isRecordingVoice, setIsRecordingVoice } = useAppStore();

  const handleMicToggle = () => {
    setIsRecordingVoice(!isRecordingVoice);
  };

  return (
    <div className="relative w-full">
      <div className={`
        flex items-center bg-white rounded-full p-1.5 pl-4 shadow-md border transition-all
        ${isRecordingVoice ? 'border-red-500 ring-2 ring-red-200' : 'border-gray-200'}
      `}>
        <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
        
        <input
          type="text"
          placeholder={isRecordingVoice ? "Écoute en cours (Nouchi, Dioula, Français...)" : "Dis-moi ce qu'il te faut..."}
          className="w-full bg-transparent text-sm font-medium text-gray-800 placeholder-gray-400 outline-none"
          onKeyDown={(e) => e.key === 'Enter' && onSearch && onSearch(e.target.value)}
        />

        <button
          onClick={handleMicToggle}
          title="Recherche Vocale Multilingue"
          className={`
            w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-sm
            ${isRecordingVoice 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-gradient-to-tr from-amber-500 to-red-500 text-white hover:brightness-105'}
          `}
        >
          {isRecordingVoice ? (
            <Radio className="w-5 h-5 animate-spin" />
          ) : (
            <Mic className="w-5 h-5 stroke-[2.2]" />
          )}
        </button>
      </div>

      {isRecordingVoice && (
        <div className="mt-2 text-center text-xs font-semibold text-red-600 bg-red-50 py-1.5 px-3 rounded-full animate-fade-in border border-red-200/60">
          🎙️ Parlez maintenant : l'IA comprend le Nouchi, Dioula, Baoulé, Français...
        </div>
      )}
    </div>
  );
}
