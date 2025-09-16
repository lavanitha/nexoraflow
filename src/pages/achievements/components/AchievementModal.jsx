import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementModal = ({ 
  achievement = null, 
  isOpen = false, 
  onClose = () => {},
  onShare = () => {}
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && achievement?.isUnlocked && achievement?.isRecent) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, achievement]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !achievement) return null;

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'productivity': return 'Target';
      case 'learning': return 'BookOpen';
      case 'social': return 'Users';
      case 'milestone': return 'Trophy';
      case 'streak': return 'Flame';
      case 'level': return 'TrendingUp';
      default: return 'Award';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'from-success to-accent';
      case 'medium': return 'from-warning to-primary';
      case 'hard': return 'from-error to-warning';
      case 'legendary': return 'from-primary via-secondary to-accent';
      default: return 'from-primary to-secondary';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = () => {
    onShare(achievement);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Confetti Elements */}
      {showConfetti && (
        <>
          {Array.from({ length: 20 })?.map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti pointer-events-none"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 500}ms`,
                backgroundColor: ['#007BFF', '#10B981', '#1E90FF', '#059669']?.[Math.floor(Math.random() * 4)],
                width: `${4 + Math.random() * 4}px`,
                height: `${4 + Math.random() * 4}px`,
                borderRadius: '50%'
              }}
            />
          ))}
        </>
      )}
      {/* Modal Content */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>

          {/* Achievement Icon */}
          <div className="text-center mb-4">
            <div className={`w-20 h-20 bg-gradient-to-br ${getDifficultyColor(achievement?.difficulty)} rounded-full flex items-center justify-center mx-auto mb-4 ${
              achievement?.isUnlocked ? 'animate-pulse' : 'opacity-50'
            }`}>
              <Icon 
                name={getAchievementIcon(achievement?.type)} 
                size={40} 
                color="white" 
                strokeWidth={2}
              />
            </div>
            
            <h2 className="text-xl font-bold text-card-foreground mb-2">
              {achievement?.title}
            </h2>
            
            <div className="flex items-center justify-center space-x-2">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                achievement?.difficulty === 'easy' ? 'bg-success/10 text-success' :
                achievement?.difficulty === 'medium' ? 'bg-warning/10 text-warning' :
                achievement?.difficulty === 'hard'? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
              }`}>
                {achievement?.difficulty?.charAt(0)?.toUpperCase() + achievement?.difficulty?.slice(1)}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                {achievement?.category}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-card-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {achievement?.description}
            </p>
          </div>

          {/* Criteria */}
          <div>
            <h3 className="text-sm font-semibold text-card-foreground mb-2">Requirements</h3>
            <p className="text-sm text-muted-foreground">
              {achievement?.criteria}
            </p>
          </div>

          {/* Progress or Completion Info */}
          {achievement?.isUnlocked ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Achievement Unlocked!</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Plus" size={14} className="text-success" />
                  <span className="text-sm font-bold text-success">+{achievement?.points} pts</span>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground">
                <Icon name="Calendar" size={14} className="inline mr-1" />
                Unlocked on {formatDate(achievement?.unlockedAt)}
              </div>

              {achievement?.badge && (
                <div className="flex items-center justify-center space-x-2 p-3 bg-primary/10 rounded-lg">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {achievement?.badge} Badge Earned
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-card-foreground">
                  {achievement?.currentProgress}/{achievement?.targetProgress}
                </span>
              </div>
              
              <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min((achievement?.currentProgress / achievement?.targetProgress) * 100, 100)}%` 
                  }}
                />
              </div>
              
              <div className="text-center">
                <span className="text-sm font-medium text-primary">
                  {Math.round((achievement?.currentProgress / achievement?.targetProgress) * 100)}% Complete
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement?.targetProgress - achievement?.currentProgress} more to unlock
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              fullWidth
            >
              Close
            </Button>
            
            {achievement?.isUnlocked && (
              <Button
                variant="default"
                onClick={handleShare}
                iconName="Share2"
                iconPosition="left"
                fullWidth
              >
                Share
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;