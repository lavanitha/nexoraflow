import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ 
  userStats = {},
  nextMilestone = {},
  recentAchievements = [],
  onViewLeaderboard = () => {}
}) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalPoints: 0,
    completionPercentage: 0,
    currentLevel: 0
  });

  useEffect(() => {
    // Animate stats on mount
    const animateValue = (start, end, duration, callback) => {
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (end - start) * progress);
        callback(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };

    animateValue(0, userStats?.totalPoints || 0, 1000, (value) => {
      setAnimatedStats(prev => ({ ...prev, totalPoints: value }));
    });

    animateValue(0, userStats?.completionPercentage || 0, 1200, (value) => {
      setAnimatedStats(prev => ({ ...prev, completionPercentage: value }));
    });

    animateValue(0, userStats?.currentLevel || 0, 800, (value) => {
      setAnimatedStats(prev => ({ ...prev, currentLevel: value }));
    });
  }, [userStats]);

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'from-success to-accent';
    if (percentage >= 60) return 'from-primary to-secondary';
    if (percentage >= 40) return 'from-warning to-primary';
    return 'from-error to-warning';
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress Card */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Your Progress</h3>
          <button
            onClick={onViewLeaderboard}
            className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 font-medium"
          >
            <Icon name="BarChart3" size={16} />
            <span>View Leaderboard</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-bold text-white">
                {animatedStats?.currentLevel}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Current Level</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Star" size={24} color="white" />
            </div>
            <p className="text-xl font-bold text-card-foreground">
              {formatNumber(animatedStats?.totalPoints)}
            </p>
            <p className="text-sm text-muted-foreground">Total Points</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-warning to-primary rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-lg font-bold text-white">
                {animatedStats?.completionPercentage}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Completion</p>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Achievement Progress</span>
            <span className="font-medium text-card-foreground">
              {userStats?.unlockedCount || 0}/{userStats?.totalCount || 0}
            </span>
          </div>
          <div className="w-full h-3 bg-border rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getProgressColor(animatedStats?.completionPercentage)} rounded-full transition-all duration-1000 animate-progress`}
              style={{ width: `${animatedStats?.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
      {/* Next Milestone */}
      {nextMilestone?.title && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} color="white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-card-foreground">Next Milestone</h4>
              <p className="text-sm text-muted-foreground">Keep going to unlock your next reward!</p>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4 mb-4">
            <h5 className="font-medium text-card-foreground mb-2">{nextMilestone?.title}</h5>
            <p className="text-sm text-muted-foreground mb-3">{nextMilestone?.description}</p>
            
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-card-foreground">
                {nextMilestone?.currentProgress}/{nextMilestone?.targetProgress}
              </span>
            </div>
            
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                style={{ 
                  width: `${Math.min((nextMilestone?.currentProgress / nextMilestone?.targetProgress) * 100, 100)}%` 
                }}
              />
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                {nextMilestone?.pointsReward} points reward
              </span>
              <span className="text-xs font-medium text-primary">
                {Math.round((nextMilestone?.currentProgress / nextMilestone?.targetProgress) * 100)}% complete
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Recent Achievements */}
      {recentAchievements?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-success to-accent rounded-lg flex items-center justify-center">
              <Icon name="Trophy" size={20} color="white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-card-foreground">Recent Achievements</h4>
              <p className="text-sm text-muted-foreground">Your latest accomplishments</p>
            </div>
          </div>

          <div className="space-y-3">
            {recentAchievements?.slice(0, 3)?.map((achievement, index) => (
              <div key={achievement?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Award" size={16} color="white" />
                </div>
                <div className="flex-1">
                  <h6 className="text-sm font-medium text-card-foreground">{achievement?.title}</h6>
                  <p className="text-xs text-muted-foreground">
                    Unlocked {new Date(achievement.unlockedAt)?.toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-1 bg-success/10 rounded-full px-2 py-1">
                  <Icon name="Plus" size={12} className="text-success" />
                  <span className="text-xs font-medium text-success">+{achievement?.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Calendar" size={16} color="white" />
          </div>
          <p className="text-lg font-bold text-card-foreground">{userStats?.streakDays || 0}</p>
          <p className="text-xs text-muted-foreground">Day Streak</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Award" size={16} color="white" />
          </div>
          <p className="text-lg font-bold text-card-foreground">{userStats?.badgesEarned || 0}</p>
          <p className="text-xs text-muted-foreground">Badges</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-warning to-primary rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="Users" size={16} color="white" />
          </div>
          <p className="text-lg font-bold text-card-foreground">#{userStats?.leaderboardRank || 0}</p>
          <p className="text-xs text-muted-foreground">Rank</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-2">
            <Icon name="TrendingUp" size={16} color="white" />
          </div>
          <p className="text-lg font-bold text-card-foreground">{userStats?.weeklyPoints || 0}</p>
          <p className="text-xs text-muted-foreground">This Week</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;