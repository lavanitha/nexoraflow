import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const AchievementCard = ({ 
  achievement, 
  onViewDetails = () => {},
  onShare = () => {},
  showGlow = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (showGlow && achievement?.isRecent) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showGlow, achievement?.isRecent]);

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
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 ${
        showCelebration ? 'animate-pulse' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(achievement)}
    >
      {/* Glow Effect for Recent Achievements */}
      {showGlow && achievement?.isRecent && (
        <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-lg blur opacity-75 animate-pulse" />
      )}
      {/* Card Container */}
      <div className={`relative bg-card border border-border rounded-lg p-6 shadow-elevation-2 transition-all duration-300 hover-lift ${
        achievement?.isUnlocked 
          ? 'hover:shadow-elevation-3' 
          : 'opacity-60 grayscale hover:grayscale-0'
      }`}>
        
        {/* Achievement Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${getDifficultyColor(achievement?.difficulty)} rounded-lg flex items-center justify-center ${
              achievement?.isUnlocked ? '' : 'opacity-50'
            }`}>
              <Icon 
                name={getAchievementIcon(achievement?.type)} 
                size={24} 
                color="white" 
                strokeWidth={2.5}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-card-foreground">
                {achievement?.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  achievement?.difficulty === 'easy' ? 'bg-success/10 text-success' :
                  achievement?.difficulty === 'medium' ? 'bg-warning/10 text-warning' :
                  achievement?.difficulty === 'hard'? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                }`}>
                  {achievement?.difficulty?.charAt(0)?.toUpperCase() + achievement?.difficulty?.slice(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {achievement?.category}
                </span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className={`flex items-center space-x-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            {achievement?.isUnlocked && (
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  onShare(achievement);
                }}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                title="Share Achievement"
              >
                <Icon name="Share2" size={16} className="text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Achievement Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {achievement?.description}
        </p>

        {/* Progress Section */}
        {achievement?.isUnlocked ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Unlocked {formatDate(achievement?.unlockedAt)}
                </span>
              </div>
              <div className="flex items-center space-x-1 bg-success/10 rounded-full px-2 py-1">
                <Icon name="Plus" size={12} className="text-success" />
                <span className="text-xs font-medium text-success">
                  +{achievement?.points} pts
                </span>
              </div>
            </div>
            
            {achievement?.badge && (
              <div className="flex items-center space-x-2 p-2 bg-primary/5 rounded-lg">
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
              <span className="font-medium text-foreground">
                {achievement?.currentProgress}/{achievement?.targetProgress}
              </span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min((achievement?.currentProgress / achievement?.targetProgress) * 100, 100)}%` 
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {achievement?.criteria}
              </span>
              <span className="text-xs font-medium text-primary">
                {Math.round((achievement?.currentProgress / achievement?.targetProgress) * 100)}%
              </span>
            </div>
          </div>
        )}

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/90 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
                <Icon name="Trophy" size={32} color="white" />
              </div>
              <p className="text-sm font-medium text-card-foreground">
                Achievement Unlocked!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;