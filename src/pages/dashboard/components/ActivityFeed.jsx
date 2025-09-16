import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);

  const mockActivities = [
    {
      id: 1,
      type: 'achievement',
      title: 'Badge Unlocked: Mood Master',
      description: 'Tracked your mood for 7 consecutive days',
      timestamp: new Date(Date.now() - 3600000),
      icon: 'Award',
      color: 'from-success to-accent'
    },
    {
      id: 2,
      type: 'coaching',
      title: 'Coaching Session Completed',
      description: 'Discussed goal setting and time management strategies',
      timestamp: new Date(Date.now() - 7200000),
      icon: 'MessageCircle',
      color: 'from-primary to-secondary'
    },
    {
      id: 3,
      type: 'discovery',
      title: 'New Side Hustle Match',
      description: 'Found 3 opportunities in Content Writing',
      timestamp: new Date(Date.now() - 10800000),
      icon: 'Search',
      color: 'from-accent to-warning'
    },
    {
      id: 4,
      type: 'points',
      title: 'Points Earned',
      description: 'Gained 25 points for daily check-in',
      timestamp: new Date(Date.now() - 14400000),
      icon: 'Star',
      color: 'from-warning to-primary'
    },
    {
      id: 5,
      type: 'milestone',
      title: 'Weekly Goal Achieved',
      description: 'Completed 5 coaching sessions this week',
      timestamp: new Date(Date.now() - 86400000),
      icon: 'Target',
      color: 'from-secondary to-accent'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={16} color="white" strokeWidth={2.5} />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
      </div>
      <div className="space-y-4">
        {activities?.map((activity, index) => (
          <div key={activity?.id} className="relative">
            {/* Timeline Line */}
            {index < activities?.length - 1 && (
              <div className="absolute left-5 top-12 w-0.5 h-8 bg-border" />
            )}
            
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${activity?.color} rounded-full flex items-center justify-center shadow-elevation-2 flex-shrink-0`}>
                <Icon name={activity?.icon} size={16} color="white" strokeWidth={2.5} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-card-foreground">
                      {activity?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity?.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;