import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'discover',
      title: 'Discover Side Hustles',
      description: 'Find opportunities that match your skills and interests',
      icon: 'Search',
      color: 'from-accent to-success',
      path: '/side-hustle-discovery',
      stats: '12 new matches'
    },
    {
      id: 'coaching',
      title: 'AI Coaching Session',
      description: 'Get personalized guidance and motivation',
      icon: 'MessageCircle',
      color: 'from-primary to-secondary',
      path: '/ai-coaching-chat',
      stats: 'Available 24/7'
    },
    {
      id: 'achievements',
      title: 'View Achievements',
      description: 'Track your progress and unlock new badges',
      icon: 'Trophy',
      color: 'from-warning to-primary',
      path: '/achievements',
      stats: '3 badges earned'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={16} color="white" strokeWidth={2.5} />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions?.map((action) => (
          <div
            key={action?.id}
            className="group relative overflow-hidden rounded-lg border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer hover-lift"
            onClick={() => handleActionClick(action?.path)}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action?.color} opacity-5 group-hover:opacity-10 transition-opacity duration-200`} />
            
            <div className="relative p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 bg-gradient-to-br ${action?.color} rounded-lg flex items-center justify-center shadow-elevation-2`}>
                  <Icon name={action?.icon} size={20} color="white" strokeWidth={2.5} />
                </div>
                <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-card-foreground group-hover:text-primary transition-colors">
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {action?.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {action?.stats}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 h-auto"
                >
                  <Icon name="ChevronRight" size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Quick Links */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <Icon name="User" size={16} className="text-muted-foreground" />
            <span className="text-sm text-card-foreground">Profile</span>
          </button>
          
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <Icon name="Settings" size={16} className="text-muted-foreground" />
            <span className="text-sm text-card-foreground">Settings</span>
          </button>
          
          <button
            onClick={() => navigate('/help')}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
            <span className="text-sm text-card-foreground">Help</span>
          </button>
          
          <button
            onClick={() => navigate('/feedback')}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
            <span className="text-sm text-card-foreground">Feedback</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;