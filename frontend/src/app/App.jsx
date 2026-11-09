import React, { useState } from 'react';
import HomeScreen from '../features/home/HomeScreen';
import LanguageSelectScreen from '../features/onboarding/LanguageSelectScreen';
import RoleSelectScreen from '../features/onboarding/RoleSelectScreen';
import ClientRegistrationScreen from '../features/onboarding/ClientRegistrationScreen';
import ArtisanRegistrationScreen from '../features/onboarding/ArtisanRegistrationScreen';
import LoginScreen from '../features/auth/LoginScreen';
import DashboardScreen from '../features/dashboard/DashboardScreen';

export default function App() {
  const [currentView, setCurrentView] = useState('welcome'); 
  // 'welcome' | 'language-select' | 'role-select' | 'register-client' | 'register-artisan' | 'login' | 'dashboard'
  
  const [currentUser, setCurrentUser] = useState({
    name: 'Aminata',
    fullName: 'Aminata Touré',
    commune: 'Abidjan, Cocody Blockhauss',
    role: 'client'
  });

  const handleStartExperience = () => {
    // Redirige vers l'écran de sélection de langue (Étape 1/3)
    setCurrentView('language-select');
  };

  const handleBackToHome = () => {
    setCurrentView('welcome');
  };

  const handleLanguageConfirmed = (selectedLanguage) => {
    console.log('Langue sélectionnée :', selectedLanguage);
    setCurrentView('role-select');
  };

  const handleRoleConfirmed = (role) => {
    console.log('Rôle sélectionné :', role);
    if (role === 'client') {
      setCurrentView('register-client');
    } else {
      setCurrentView('register-artisan');
    }
  };

  const handleRegistrationSuccess = (userData) => {
    console.log('Inscription réussie :', userData);
    setCurrentUser((prev) => ({
      ...prev,
      ...userData,
      name: userData.fullName ? userData.fullName.split(' ')[0] : (userData.proName ? userData.proName.split(' ')[0] : 'Aminata')
    }));
    // Redirige directement vers le tableau de bord
    setCurrentView('dashboard');
  };

  const handleLogin = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = (userData) => {
    console.log('Connexion réussie :', userData);
    setCurrentUser((prev) => ({
      ...prev,
      ...userData,
      name: 'Aminata',
      commune: 'Abidjan, Cocody Blockhauss'
    }));
    // Redirige directement vers le tableau de bord de l'application
    setCurrentView('dashboard');
  };

  const handleRegisterClient = () => {
    setCurrentView('language-select');
  };

  const handleRegisterArtisan = () => {
    setCurrentView('register-artisan');
  };

  const handleLogout = () => {
    setCurrentView('welcome');
  };

  const handleSelectService = (serviceId) => {
    alert(`Service "${serviceId.toUpperCase()}" ouvert :\nRecherche des professionnels accrédités les plus proches sous 3 minutes chrono à Abidjan.`);
  };

  const handleTriggerSOS = () => {
    alert("🚨 URGENCE 3-MINUTES DÉCLENCHÉE :\nVos coordonnées GPS sont transmises aux services d'intervention prioritaires (Secours, Pompiers, Dépanneurs d'urgence).");
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* 1. Écran d'accueil Vitefê (Home Landing) */}
      {currentView === 'welcome' && (
        <HomeScreen 
          onStartExperience={handleStartExperience}
          onLogin={handleLogin}
        />
      )}

      {/* 2. Écran Étape 1/3 : Choix de la Langue */}
      {currentView === 'language-select' && (
        <LanguageSelectScreen 
          onBack={handleBackToHome}
          onConfirm={handleLanguageConfirmed}
        />
      )}

      {/* 3. Écran Étape 2/3 : Choix du Rôle (Client vs Prestataire) */}
      {currentView === 'role-select' && (
        <RoleSelectScreen 
          onBack={() => setCurrentView('language-select')}
          onSelectRole={handleRoleConfirmed}
          onGoToLogin={handleLogin}
        />
      )}

      {/* 4A. Écran Étape 3/3 : Inscription Client Particulier */}
      {currentView === 'register-client' && (
        <ClientRegistrationScreen 
          onBack={() => setCurrentView('role-select')}
          onSuccess={handleRegistrationSuccess}
          onGoToLogin={handleLogin}
        />
      )}

      {/* 4B. Écran Étape 3/3 : Inscription Prestataire & Validation KYC */}
      {currentView === 'register-artisan' && (
        <ArtisanRegistrationScreen 
          onBack={() => setCurrentView('role-select')}
          onSuccess={handleRegistrationSuccess}
          onGoToLogin={handleLogin}
        />
      )}

      {/* 5. Écran Officiel de Connexion Vitefê */}
      {currentView === 'login' && (
        <LoginScreen 
          onBack={handleBackToHome}
          onLoginSuccess={handleLoginSuccess}
          onRegisterClient={handleRegisterClient}
          onRegisterArtisan={handleRegisterArtisan}
        />
      )}

      {/* 6. Dashboard Principal de l'Application Connectée */}
      {currentView === 'dashboard' && (
        <DashboardScreen 
          user={currentUser}
          onLogout={handleLogout}
          onSelectService={handleSelectService}
          onTriggerSOS={handleTriggerSOS}
        />
      )}
    </div>
  );
}
