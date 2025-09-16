import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementPanel = ({ userLevel = 5, userPoints = 1250 }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [recentBadges, setRecentBadges] = useState([]);

  const badges = [
    {
      id: 'first-steps',
      name: 'First Steps',
      description: 'Completed your first side hustle discovery',
      icon: 'Footprints',
      color: 'from-success to-accent',
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 2)
    },
    {
      id: 'mood-tracker',
      name: 'Mood Master',
      description: 'Tracked your mood for 7 consecutive days',
      icon: 'Heart',
      color: 'from-primary to-secondary',
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 1)
    },
    {
      id: 'coaching-starter',
      name: 'Coaching Starter',
      description: 'Had your first AI coaching session',
      icon: 'MessageCircle',
      color: 'from-accent to-warning',
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 3)
    },
    {
      id: 'point-collector',
      name: 'Point Collector',
      description: 'Earned 1000 points',
      icon: 'Star',
      color: 'from-warning to-primary',
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 5)
    },
    {
      id: 'level-up',
      name: 'Level Up',
      description: 'Reached Level 5',
      icon: 'TrendingUp',
      color: 'from-secondary to-accent',
      unlocked: false,
      requiredPoints: 2500
    },
    {
      id: 'consistency-king',
      name: 'Consistency King',
      description: 'Used the app for 30 consecutive days',
      icon: 'Calendar',
      color: 'from-primary to-success',
      unlocked: false,
      requiredDays: 30
    }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Sarah Chen', points: 3420, avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { rank: 2, name: 'Mike Rodriguez', points: 2890, avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { rank: 3, name: 'You', points: userPoints, avatar: null, isCurrentUser: true },
    { rank: 4, name: 'Emma Wilson', points: 1180, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { rank: 5, name: 'David Kim', points: 950, avatar: 'https://randomuser.me/api/portraits/men/22.jpg' }
  ];

  useEffect(() => {
    const recent = badges?.filter(badge => badge?.unlocked && badge?.unlockedAt)?.sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))?.slice(0, 3);
    setRecentBadges(recent);
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1000);
  };

  const unlockedBadges = badges?.filter(badge => badge?.unlocked);
  const nextBadge = badges?.find(badge => !badge?.unlocked);

  return (
    <div className="space-y-6">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-300">
          {Array.from({ length: 20 })?.map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '20%',
                backgroundColor: ['#007BFF', '#10B981', '#1E90FF', '#059669']?.[Math.floor(Math.random() * 4)],
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                borderRadius: '50%',
                animationDelay: `${Math.random() * 200}ms`
              }}
            />
          ))}
        </div>
      )}
      {/* Recent Achievements */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-warning to-primary rounded-lg flex items-center justify-center">
              <Icon name="Trophy" size={16} color="white" strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Recent Achievements</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/achievements')}
            iconName="ChevronRight"
            iconPosition="right"
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {recentBadges?.map((badge) => (
            <div
              key={badge?.id}
              className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
              onClick={triggerConfetti}
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${badge?.color} rounded-full flex items-center justify-center shadow-elevation-2`}>
                <Icon name={badge?.icon} size={18} color="white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-card-foreground">{badge?.name}</h4>
                <p className="text-xs text-muted-foreground">{badge?.description}</p>
              </div>
              <div className="text-xs text-muted-foreground">
                {badge?.unlockedAt && new Date(badge.unlockedAt)?.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {nextBadge && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-border rounded-full flex items-center justify-center">
                <Icon name={nextBadge?.icon} size={18} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-card-foreground">Next: {nextBadge?.name}</h4>
                <p className="text-xs text-muted-foreground">{nextBadge?.description}</p>
                {nextBadge?.requiredPoints && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{userPoints}/{nextBadge?.requiredPoints}</span>
                    </div>
                    <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((userPoints / nextBadge?.requiredPoints) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Leaderboard */}
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Users" size={16} color="white" strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Leaderboard</h3>
          </div>
          <div className="text-sm text-muted-foreground">This Week</div>
        </div>

        <div className="space-y-2">
          {leaderboardData?.map((user) => (
            <div
              key={user?.rank}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                user?.isCurrentUser
                  ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted/50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                user?.rank === 1 ? 'bg-warning text-warning-foreground' :
                user?.rank === 2 ? 'bg-muted-foreground text-muted' :
                user?.rank === 3 ? 'bg-accent text-accent-foreground': 'bg-border text-muted-foreground'
              }`}>
                {user?.rank}
              </div>
              
              <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                ) : (
                  <Icon name="User" size={16} className="text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1">
                <span className={`text-sm font-medium ${
                  user?.isCurrentUser ? 'text-primary' : 'text-card-foreground'
                }`}>
                  {user?.name}
                </span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning" />
                <span className="text-sm font-medium text-card-foreground">{user?.points?.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementPanel;