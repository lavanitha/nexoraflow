import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const AchievementNotification = ({ 
  achievements = [], 
  onDismiss = () => {},
  position = 'top-right' 
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [confettiElements, setConfettiElements] = useState([]);

  useEffect(() => {
    if (achievements?.length > 0) {
      const newNotifications = achievements?.map((achievement, index) => ({
        ...achievement,
        id: Date.now() + index,
        timestamp: Date.now()
      }));
      
      setVisibleNotifications(prev => [...prev, ...newNotifications]);
      
      // Trigger confetti for major achievements
      const majorAchievements = newNotifications?.filter(a => a?.type === 'major' || a?.points >= 100);
      if (majorAchievements?.length > 0) {
        triggerConfetti();
      }

      // Auto-dismiss after 5 seconds
      newNotifications?.forEach(notification => {
        setTimeout(() => {
          dismissNotification(notification?.id);
        }, 5000);
      });
    }
  }, [achievements]);

  const triggerConfetti = () => {
    const colors = ['#007BFF', '#10B981', '#1E90FF', '#059669'];
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      color: colors?.[Math.floor(Math.random() * colors?.length)],
      left: Math.random() * 100,
      delay: Math.random() * 200,
      size: Math.random() * 4 + 2
    }));
    
    setConfettiElements(newConfetti);
    
    setTimeout(() => {
      setConfettiElements([]);
    }, 1000);
  };

  const dismissNotification = (id) => {
    setVisibleNotifications(prev => prev?.filter(n => n?.id !== id));
    onDismiss(id);
  };

  const getPositionClasses = () => {
    const baseClasses = 'fixed z-300 pointer-events-none';
    switch (position) {
      case 'top-right':
        return `${baseClasses} top-20 right-4 md:right-6`;
      case 'top-center':
        return `${baseClasses} top-20 left-1/2 transform -translate-x-1/2`;
      case 'top-left':
        return `${baseClasses} top-20 left-4 md:left-6`;
      default:
        return `${baseClasses} top-20 right-4 md:right-6`;
    }
  };

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'badge':
        return 'Award';
      case 'level':
        return 'TrendingUp';
      case 'streak':
        return 'Flame';
      case 'milestone':
        return 'Target';
      case 'major':
        return 'Crown';
      default:
        return 'Trophy';
    }
  };

  const getAchievementColor = (type) => {
    switch (type) {
      case 'badge':
        return 'from-accent to-success';
      case 'level':
        return 'from-primary to-secondary';
      case 'streak':
        return 'from-warning to-error';
      case 'milestone':
        return 'from-secondary to-accent';
      case 'major':
        return 'from-warning to-primary';
      default:
        return 'from-primary to-accent';
    }
  };

  if (visibleNotifications?.length === 0) return null;

  return (
    <>
      {/* Confetti Elements */}
      {confettiElements?.map(confetti => (
        <div
          key={confetti?.id}
          className="fixed z-400 pointer-events-none animate-confetti"
          style={{
            left: `${confetti?.left}%`,
            top: '80px',
            animationDelay: `${confetti?.delay}ms`,
            backgroundColor: confetti?.color,
            width: `${confetti?.size}px`,
            height: `${confetti?.size}px`,
            borderRadius: '50%'
          }}
        />
      ))}
      {/* Notification Container */}
      <div className={getPositionClasses()}>
        <div className="space-y-3 max-w-sm">
          {visibleNotifications?.map((notification, index) => (
            <div
              key={notification?.id}
              className="pointer-events-auto transform transition-all duration-300 ease-out animate-spring"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className={`bg-gradient-to-r ${getAchievementColor(notification?.type)} p-0.5 rounded-lg shadow-elevation-3`}>
                <div className="bg-card rounded-lg p-4 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${getAchievementColor(notification?.type)} rounded-full flex items-center justify-center`}>
                      <Icon 
                        name={getAchievementIcon(notification?.type)} 
                        size={20} 
                        color="white" 
                        strokeWidth={2.5}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-card-foreground truncate">
                          {notification?.title}
                        </h4>
                        <button
                          onClick={() => dismissNotification(notification?.id)}
                          className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-muted transition-colors"
                        >
                          <Icon name="X" size={14} className="text-muted-foreground" />
                        </button>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {notification?.description}
                      </p>
                      
                      {notification?.points && (
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="flex items-center space-x-1 bg-muted rounded-full px-2 py-1">
                            <Icon name="Plus" size={12} className="text-success" />
                            <span className="text-xs font-medium text-success">
                              {notification?.points} pts
                            </span>
                          </div>
                          
                          {notification?.badge && (
                            <div className="flex items-center space-x-1 bg-primary/10 rounded-full px-2 py-1">
                              <Icon name="Award" size={12} className="text-primary" />
                              <span className="text-xs font-medium text-primary">
                                {notification?.badge}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress Bar for Timed Achievements */}
                  {notification?.showProgress && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent animate-progress"
                        style={{ 
                          animation: 'progress 5000ms linear',
                          transformOrigin: 'left'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AchievementNotification;