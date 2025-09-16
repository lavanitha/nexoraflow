import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = ({ userName = "John", userLevel = 5, userPoints = 1250 }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [motivationalQuote, setMotivationalQuote] = useState('');

  const motivationalQuotes = [
    "Every expert was once a beginner. Every pro was once an amateur.",
    "Your side hustle today is your main hustle tomorrow.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Don\'t wait for opportunity. Create it.",
    "Your potential is endless. Go do what you were created to do."
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    const randomQuote = motivationalQuotes?.[Math.floor(Math.random() * motivationalQuotes?.length)];
    setMotivationalQuote(randomQuote);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickActions = [
    {
      label: 'Discover Opportunities',
      description: 'Find your next side hustle',
      icon: 'Search',
      color: 'from-accent to-success',
      path: '/side-hustle-discovery'
    },
    {
      label: 'Start Coaching',
      description: 'Get personalized guidance',
      icon: 'MessageCircle',
      color: 'from-primary to-secondary',
      path: '/ai-coaching-chat'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl p-8 border border-border shadow-elevation-2">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
        {/* Left Content */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              {getGreeting()}, {userName}! 🚀
            </h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} />
                <span className="text-sm">
                  {currentTime?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground">{userLevel}</span>
                </div>
                <span className="text-sm">Level {userLevel}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-warning to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={16} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-card-foreground mb-1">Daily Motivation</h3>
                <p className="text-sm text-muted-foreground italic">"{motivationalQuote}"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-0 lg:space-y-3">
          {quickActions?.map((action, index) => (
            <Button
              key={action?.path}
              variant="outline"
              size="lg"
              onClick={() => navigate(action?.path)}
              iconName={action?.icon}
              iconPosition="left"
              className="bg-card/80 backdrop-blur-sm border-border hover:bg-card hover:shadow-elevation-2 transition-all duration-200"
            >
              <div className="text-left">
                <div className="font-semibold">{action?.label}</div>
                <div className="text-xs text-muted-foreground">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Progress Indicator */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Progress to Level {userLevel + 1}</span>
          <span>{userPoints % 500}/500 points</span>
        </div>
        <div className="w-full h-3 bg-border/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-1000 animate-progress"
            style={{ width: `${((userPoints % 500) / 500) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;