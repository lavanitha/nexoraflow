import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import LoginHero from './components/LoginHero';

const LoginPage = ({ onLogin = () => {}, isAuthenticated = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated]);

  const handleLogin = async (userData, token) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onLogin(userData, token);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl" />
      </div>
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Header */}
        <header className="w-full py-6 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="text-xl font-bold text-foreground">NexoraFlow</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <span className="text-sm text-muted-foreground">New to NexoraFlow?</span>
              <a
                href="/register"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Sign up
              </a>
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hidden lg:block"
              >
                <LoginHero />
              </motion.div>

              {/* Right Side - Login Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="w-full"
              >
                <LoginForm onLogin={handleLogin} isLoading={isLoading} />
              </motion.div>
            </div>
          </div>
        </main>

        {/* Footer - Trust Signals */}
        <footer className="w-full py-8 px-4 border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            <TrustSignals />
          </div>
        </footer>

        {/* Mobile Hero - Shown only on mobile */}
        <div className="lg:hidden px-4 py-6">
          <LoginHero />
        </div>
      </motion.div>
      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto animate-pulse">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Signing you in...</h3>
              <p className="text-sm text-muted-foreground">Preparing your personalized dashboard</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LoginPage;