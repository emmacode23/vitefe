import React, { useEffect, useState } from 'react';
import HomeScreen from '../features/home/HomeScreen';
import LanguageSelectScreen from '../features/onboarding/LanguageSelectScreen';
import RoleSelectScreen from '../features/onboarding/RoleSelectScreen';
import ClientRegistrationScreen from '../features/onboarding/ClientRegistrationScreen';
import ArtisanRegistrationScreen from '../features/onboarding/ArtisanRegistrationScreen';
import LoginScreen from '../features/auth/LoginScreen';
import DashboardScreen from '../features/dashboard/DashboardScreen';
import { api, clearSession, getSessionToken } from '../api';

function getCoordinates() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve({});
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve({ latitude: coords.latitude, longitude: coords.longitude }),
      () => resolve({}),
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 5000 },
    );
  });
}

export default function App() {
  const [currentView, setCurrentView] = useState('welcome');
  // 'welcome' | 'language-select' | 'role-select' | 'register-client' | 'register-artisan' | 'login' | 'dashboard'
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let active = true;
    if (getSessionToken()) {
      api.currentUser()
        .then(({ user }) => {
          if (active) {
            setCurrentUser(user);
            setCurrentView('dashboard');
          }
        })
        .catch(clearSession);
    }
    return () => { active = false; };
  }, []);

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
    setCurrentUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogin = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setCurrentView('dashboard');
  };

  const handleRegisterClient = () => {
    setCurrentView('language-select');
  };

  const handleRegisterArtisan = () => {
    setCurrentView('register-artisan');
  };

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
    setCurrentView('welcome');
  };

  const handleSelectService = async (serviceId) => {
    try {
      const { request } = await api.createRequest(serviceId);
      alert(`Demande ${serviceId.toUpperCase()} enregistrée. Référence : ${request.id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleTriggerSOS = async () => {
    try {
      const { alert: emergency } = await api.createEmergency(await getCoordinates());
      alert(`Alerte SOS enregistrée. Référence : ${emergency.id}`);
    } catch (error) {
      alert(error.message);
    }
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
