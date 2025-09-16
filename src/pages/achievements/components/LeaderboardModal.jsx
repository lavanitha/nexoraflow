import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LeaderboardModal = ({ 
  isOpen = false, 
  onClose = () => {},
  currentUser = null
}) => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Mock leaderboard data
  const mockLeaderboardData = {
    weekly: [
      {
        id: 1,
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        points: 2850,
        level: 12,
        rank: 1,
        change: "+2",
        badges: 15,
        isCurrentUser: false
      },
      {
        id: 2,
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        points: 2720,
        level: 11,
        rank: 2,
        change: "+1",
        badges: 13,
        isCurrentUser: false
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        points: 2650,
        level: 11,
        rank: 3,
        change: "-1",
        badges: 14,
        isCurrentUser: false
      },
      {
        id: 4,
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        points: 2480,
        level: 10,
        rank: 4,
        change: "+3",
        badges: 12,
        isCurrentUser: true
      },
      {
        id: 5,
        name: "Lisa Wang",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
        points: 2350,
        level: 10,
        rank: 5,
        change: "0",
        badges: 11,
        isCurrentUser: false
      }
    ],
    monthly: [
      {
        id: 1,
        name: "Marcus Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        points: 8950,
        level: 11,
        rank: 1,
        change: "+1",
        badges: 13,
        isCurrentUser: false
      },
      {
        id: 2,
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        points: 8720,
        level: 12,
        rank: 2,
        change: "-1",
        badges: 15,
        isCurrentUser: false
      },
      {
        id: 3,
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        points: 7850,
        level: 10,
        rank: 3,
        change: "+2",
        badges: 12,
        isCurrentUser: true
      }
    ],
    allTime: [
      {
        id: 1,
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        points: 25480,
        level: 12,
        rank: 1,
        change: "0",
        badges: 15,
        isCurrentUser: false
      },
      {
        id: 2,
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        points: 23650,
        level: 11,
        rank: 2,
        change: "+1",
        badges: 14,
        isCurrentUser: false
      },
      {
        id: 3,
        name: "John Doe",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        points: 18750,
        level: 10,
        rank: 3,
        change: "+1",
        badges: 12,
        isCurrentUser: true
      }
    ]
  };

  useEffect(() => {
    if (isOpen) {
      setLeaderboardData(mockLeaderboardData?.[activeTab]);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'weekly', label: 'This Week', icon: 'Calendar' },
    { id: 'monthly', label: 'This Month', icon: 'CalendarDays' },
    { id: 'allTime', label: 'All Time', icon: 'Trophy' }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return 'Crown';
      case 2: return 'Medal';
      case 3: return 'Award';
      default: return 'User';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-warning to-primary';
      case 2: return 'from-muted-foreground to-foreground';
      case 3: return 'from-warning to-accent';
      default: return 'from-primary to-secondary';
    }
  };

  const getChangeIcon = (change) => {
    if (change?.startsWith('+')) return 'TrendingUp';
    if (change?.startsWith('-')) return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = (change) => {
    if (change?.startsWith('+')) return 'text-success';
    if (change?.startsWith('-')) return 'text-error';
    return 'text-muted-foreground';
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative bg-card border border-border rounded-lg shadow-elevation-4 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="BarChart3" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-card-foreground">Leaderboard</h2>
              <p className="text-sm text-muted-foreground">See how you rank against others</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Leaderboard Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {leaderboardData?.map((user, index) => (
              <div
                key={user?.id}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                  user?.isCurrentUser 
                    ? 'bg-primary/10 border border-primary/20' :'bg-muted hover:bg-muted/80'
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 bg-gradient-to-br ${getRankColor(user?.rank)} rounded-full flex items-center justify-center`}>
                    {user?.rank <= 3 ? (
                      <Icon name={getRankIcon(user?.rank)} size={20} color="white" />
                    ) : (
                      <span className="text-sm font-bold text-white">#{user?.rank}</span>
                    )}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={user?.avatar} 
                      alt={user?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/images/no_image.png';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-card-foreground">
                        {user?.name}
                        {user?.isCurrentUser && (
                          <span className="ml-2 text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            You
                          </span>
                        )}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span>Level {user?.level}</span>
                      <span>{user?.badges} badges</span>
                    </div>
                  </div>
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className="text-lg font-bold text-card-foreground">
                    {formatNumber(user?.points)}
                  </p>
                  <div className={`flex items-center space-x-1 text-xs ${getChangeColor(user?.change)}`}>
                    <Icon name={getChangeIcon(user?.change)} size={12} />
                    <span>{user?.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Current User Summary */}
          {currentUser && (
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
              <h4 className="text-sm font-semibold text-card-foreground mb-2">Your Performance</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-card-foreground">#{currentUser?.rank || 4}</p>
                  <p className="text-xs text-muted-foreground">Current Rank</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-card-foreground">{formatNumber(currentUser?.points || 2480)}</p>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-card-foreground">+{currentUser?.weeklyGain || 350}</p>
                  <p className="text-xs text-muted-foreground">This Week</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <p className="text-xs text-muted-foreground">
            Rankings update every hour • Keep earning points to climb higher!
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;