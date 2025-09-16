import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, onLogout = () => {} }) => {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(5);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and quick access to all features'
    },
    {
      label: 'Discover',
      path: '/side-hustle-discovery',
      icon: 'Search',
      tooltip: 'Find side hustle opportunities'
    },
    {
      label: 'Coaching',
      path: '/ai-coaching-chat',
      icon: 'MessageCircle',
      tooltip: 'AI-powered personal development coaching'
    },
    {
      label: 'Achievements',
      path: '/achievements',
      icon: 'Trophy',
      tooltip: 'Track your progress and badges'
    }
  ];

  const isActive = (path) => pathname === path;

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event?.target?.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
      if (showMobileMenu && !event?.target?.closest('.mobile-menu-container')) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu, showMobileMenu]);

  const Logo = () => (
    <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
        <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold text-foreground">NexoraFlow</span>
    </Link>
  );

  const ProgressIndicator = () => (
    <div className="hidden lg:flex items-center space-x-3 bg-muted rounded-full px-4 py-2">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">{userLevel}</span>
        </div>
        <span className="text-sm font-medium text-foreground">{userPoints} pts</span>
      </div>
      <div className="w-16 h-2 bg-border rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300"
          style={{ width: `${(userPoints % 500) / 5}%` }}
        />
      </div>
    </div>
  );

  const UserAvatar = () => (
    <div className="user-menu-container relative">
      <button
        onClick={handleUserMenuToggle}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <Icon name="ChevronDown" size={16} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-elevation-3 py-2 z-200">
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-medium text-card-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Level {userLevel} • {userPoints} pts</p>
          </div>
          <Link href="/profile" className="flex items-center space-x-2 px-4 py-2 text-sm text-card-foreground hover:bg-muted">
            <Icon name="User" size={16} />
            <span>Profile</span>
          </Link>
          <Link href="/settings" className="flex items-center space-x-2 px-4 py-2 text-sm text-card-foreground hover:bg-muted">
            <Icon name="Settings" size={16} />
            <span>Settings</span>
          </Link>
          <Link href="/help" className="flex items-center space-x-2 px-4 py-2 text-sm text-card-foreground hover:bg-muted">
            <Icon name="HelpCircle" size={16} />
            <span>Help</span>
          </Link>
          <hr className="my-2 border-border" />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-error hover:bg-muted w-full text-left"
          >
            <Icon name="LogOut" size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );

  if (pathname === '/login' || pathname === '/register') {
    return (
      <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center space-x-4">
              <Link href="/login" className={`text-sm font-medium transition-colors ${pathname === '/login' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                Login
              </Link>
              <Link href="/register" className={`text-sm font-medium transition-colors ${pathname === '/register' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background border-b border-border z-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-elevation-2'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={item?.tooltip}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center space-x-4">
              <ProgressIndicator />
              <UserAvatar />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden mobile-menu-container">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <Icon name={showMobileMenu ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-elevation-3">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  href={item?.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              <hr className="my-4 border-border" />
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">Level {userLevel} • {userPoints} pts</p>
                  </div>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Icon name="User" size={20} />
                <span>Profile</span>
              </Link>
              <Link
                href="/settings"
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Icon name="Settings" size={20} />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-error hover:bg-muted w-full text-left"
              >
                <Icon name="LogOut" size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </header>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-100">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              href={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;