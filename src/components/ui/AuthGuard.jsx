import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const AuthGuard = ({ 
  children, 
  isAuthenticated = false, 
  onAuthChange = () => {},
  redirectTo = '/login'
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState(isAuthenticated);

  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes?.includes(pathname);

  useEffect(() => {
    // Simulate auth check
    const checkAuth = async () => {
      try {
        // Check localStorage for auth token
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('userData');
        
        if (token && user) {
          setAuthState(true);
          onAuthChange(true, JSON.parse(user));
        } else {
          setAuthState(false);
          onAuthChange(false, null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthState(false);
        onAuthChange(false, null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [onAuthChange]);

  useEffect(() => {
    if (!isLoading) {
      if (!authState && !isPublicRoute) {
        // Redirect to login if not authenticated and trying to access protected route
        router?.push(redirectTo);
      } else if (authState && isPublicRoute) {
        // Redirect to dashboard if authenticated and trying to access auth pages
        router?.push('/dashboard');
      }
    }
  }, [authState, isPublicRoute, isLoading, router, redirectTo]);

  const handleLogin = (userData, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setAuthState(true);
    onAuthChange(true, userData);
    router?.push('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setAuthState(false);
    onAuthChange(false, null);
    router?.push('/login');
  };

  const handleRegister = (userData, token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setAuthState(true);
    onAuthChange(true, userData);
    router?.push('/dashboard');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center animate-pulse">
            <div className="w-6 h-6 bg-white rounded-sm animate-pulse" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-foreground">NexoraFlow</h2>
            <p className="text-sm text-muted-foreground">Loading your experience...</p>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  // Clone children and pass auth handlers for login/register pages
  if (isPublicRoute) {
    return React.cloneElement(children, {
      onLogin: handleLogin,
      onRegister: handleRegister,
      isAuthenticated: authState
    });
  }

  // For protected routes, pass logout handler
  if (authState) {
    return React.cloneElement(children, {
      onLogout: handleLogout,
      isAuthenticated: authState
    });
  }

  // This shouldn't render due to redirect effect, but just in case
  return null;
};

export default AuthGuard;