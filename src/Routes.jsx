import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import AICoachingChat from './pages/ai-coaching-chat';
import AchievementsPage from './pages/achievements';
import SideHustleDiscovery from './pages/side-hustle-discovery';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AchievementsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-coaching-chat" element={<AICoachingChat />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/side-hustle-discovery" element={<SideHustleDiscovery />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
