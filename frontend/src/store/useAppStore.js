import { create } from 'zustand';

export const LANGUAGES = [
  { id: 'dioula', label: 'Dioula', group: 'ivoirien' },
  { id: 'baoule', label: 'Baoulé', group: 'ivoirien' },
  { id: 'bete', label: 'Bété', group: 'ivoirien' },
  { id: 'nouchi', label: 'Nouchi', group: 'ivoirien' },
  { id: 'fr', label: 'Français', group: 'international' },
  { id: 'en', label: 'English', group: 'international' },
  { id: 'ar', label: 'العربية', group: 'international' },
  { id: 'zh', label: '中文', group: 'international' },
  { id: 'ru', label: 'Русский', group: 'international' },
];

export const useAppStore = create((set) => ({
  // Langue sélectionnée
  currentLanguage: 'fr',
  setLanguage: (langId) => set({ currentLanguage: langId }),

  // Écran d'onboarding vu
  hasCompletedOnboarding: false,
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),

  // État vocal
  isRecordingVoice: false,
  setIsRecordingVoice: (status) => set({ isRecordingVoice: status }),

  // SOS Urgence
  isEmergencyActive: false,
  triggerEmergency: () => set({ isEmergencyActive: true }),
  cancelEmergency: () => set({ isEmergencyActive: false }),

  // Mission en cours (pour le suivi GPS & code OTP)
  currentMission: null,
  setCurrentMission: (mission) => set({ currentMission: mission }),
}));
