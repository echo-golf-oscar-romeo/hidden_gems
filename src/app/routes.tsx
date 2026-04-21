import { createBrowserRouter, Navigate } from 'react-router';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { GemDetailPage } from './pages/GemDetailPage';
import { PreferencesPage } from './pages/PreferencesPage';
import { AboutPage } from './pages/AboutPage';

// Check if user has completed onboarding
function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const onboardingComplete = localStorage.getItem('onboardingComplete');
  
  if (!onboardingComplete) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <OnboardingPage />,
  },
  {
    path: '/home',
    element: (
      <RequireOnboarding>
        <HomePage />
      </RequireOnboarding>
    ),
  },
  {
    path: '/explore',
    element: (
      <RequireOnboarding>
        <ExplorePage />
      </RequireOnboarding>
    ),
  },
  {
    path: '/gem/:id',
    element: (
      <RequireOnboarding>
        <GemDetailPage />
      </RequireOnboarding>
    ),
  },
  {
    path: '/preferences',
    element: (
      <RequireOnboarding>
        <PreferencesPage />
      </RequireOnboarding>
    ),
  },
  {
    path: '/about',
    element: (
      <RequireOnboarding>
        <AboutPage />
      </RequireOnboarding>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);