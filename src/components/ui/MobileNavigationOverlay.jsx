import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Icon from '../AppIcon';
import Button from './Button';

const MobileNavigationOverlay = ({ 
  isOpen = false, 
  onClose = () => {},
  user = null,
  onLogout = () => {},
  userPoints = 1250,
  userLevel = 5
}) => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const quickActions = [
    {
      label: 'Start Coaching Session',
      path: '/ai-coaching-chat',
      icon: 'MessageCircle',
      color: 'from-primary to-secondary',
      description: 'Get personalized guidance'
    },
    {
      label: 'Discover Opportunities',
      path: '/side-hustle-discovery',
      icon: 'Search',
      color: 'from-accent to-success',
      description: 'Find your next side hustle'
    },
    {
      label: 'View Progress',
      path: '/achievements',
      icon: 'Trophy',
      color: 'from-warning to-primary',
      description: 'Check your achievements'
    }
  ];

  const secondaryActions = [
    { label: 'Profile Settings', path: '/profile', icon: 'User' },
    { label: 'App Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help & Support', path: '/help', icon: 'HelpCircle' },
    { label: 'Feedback', path: '/feedback', icon: 'MessageSquare' }
  ];

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (path) => {
    onClose();
  };

  const handleLogout = () => {
    onClose();
    onLogout();
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-400 lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      {/* Overlay Content */}
      <div className={`absolute inset-x-0 top-0 bg-background transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="h-screen overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-foreground">NexoraFlow</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={24} color="white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {user?.name || 'John Doe'}
                </h3>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">{userLevel}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Level {userLevel}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning" />
                    <span className="text-sm font-medium text-foreground">{userPoints} pts</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Progress to Level {userLevel + 1}</span>
                <span>{(userPoints % 500)}/500</span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${(userPoints % 500) / 5}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h4>
            <div className="space-y-3">
              {quickActions?.map((action) => (
                <Link
                  key={action?.path}
                  href={action?.path}
                  onClick={() => handleLinkClick(action?.path)}
                  className="block"
                >
                  <div className={`bg-gradient-to-r ${action?.color} p-0.5 rounded-lg hover-lift`}>
                    <div className="bg-background rounded-lg p-4 flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${action?.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={action?.icon} size={20} color="white" />
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-foreground">{action?.label}</h5>
                        <p className="text-xs text-muted-foreground">{action?.description}</p>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Navigation</h4>
            <div className="space-y-1">
              <Link
                href="/dashboard"
                onClick={() => handleLinkClick('/dashboard')}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  pathname === '/dashboard' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="LayoutDashboard" size={20} />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                href="/side-hustle-discovery"
                onClick={() => handleLinkClick('/side-hustle-discovery')}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  pathname === '/side-hustle-discovery' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="Search" size={20} />
                <span className="font-medium">Discover</span>
              </Link>
              <Link
                href="/ai-coaching-chat"
                onClick={() => handleLinkClick('/ai-coaching-chat')}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  pathname === '/ai-coaching-chat' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="MessageCircle" size={20} />
                <span className="font-medium">Coaching</span>
              </Link>
              <Link
                href="/achievements"
                onClick={() => handleLinkClick('/achievements')}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                  pathname === '/achievements' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="Trophy" size={20} />
                <span className="font-medium">Achievements</span>
              </Link>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="p-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">More</h4>
            <div className="space-y-1">
              {secondaryActions?.map((action) => (
                <Link
                  key={action?.path}
                  href={action?.path}
                  onClick={() => handleLinkClick(action?.path)}
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Icon name={action?.icon} size={20} />
                  <span className="font-medium">{action?.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleLogout}
              iconName="LogOut"
              iconPosition="left"
              fullWidth
              className="text-error border-error hover:bg-error hover:text-error-foreground"
            >
              Logout
            </Button>
          </div>

          {/* Bottom Spacing for Safe Area */}
          <div className="h-8" />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigationOverlay;