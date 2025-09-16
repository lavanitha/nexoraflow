import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserStatsCard from './components/UserStatsCard';
import HeroSection from './components/HeroSection';
import MoodSelector from './components/MoodSelector';
import AchievementPanel from './components/AchievementPanel';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';
import Icon from '../../components/AppIcon';


const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'John',
    level: 5,
    points: 1250,
    activeSideHustles: 3,
    moodStreak: 7,
    weeklyGoalProgress: 75
  });

  const [selectedMood, setSelectedMood] = useState(null);

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = () => {
      const savedData = localStorage.getItem('userData');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setUserData(prev => ({ ...prev, ...parsed }));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    };

    loadUserData();
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    // Update points for mood tracking
    setUserData(prev => ({
      ...prev,
      points: prev?.points + 5,
      moodStreak: prev?.moodStreak + 1
    }));
  };

  const handleStatsCardClick = (type) => {
    switch (type) {
      case 'points': navigate('/achievements');
        break;
      case 'level': navigate('/achievements');
        break;
      case 'side-hustles': navigate('/side-hustle-discovery');
        break;
      case 'mood':
        // Scroll to mood selector
        document.getElementById('mood-selector')?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  const statsCards = [
    {
      title: 'Total Points',
      value: userData?.points?.toLocaleString(),
      subtitle: 'Keep earning to level up!',
      icon: 'Star',
      color: 'from-warning to-primary',
      trend: { type: 'up', value: '+125 this week' },
      onClick: () => handleStatsCardClick('points')
    },
    {
      title: 'Current Level',
      value: userData?.level,
      subtitle: `${userData?.points % 500}/500 to next level`,
      icon: 'TrendingUp',
      color: 'from-primary to-secondary',
      progress: {
        label: 'Level Progress',
        current: userData?.points % 500,
        total: 500
      },
      onClick: () => handleStatsCardClick('level')
    },
    {
      title: 'Active Side Hustles',
      value: userData?.activeSideHustles,
      subtitle: 'Opportunities in progress',
      icon: 'Briefcase',
      color: 'from-accent to-success',
      trend: { type: 'up', value: '+1 this month' },
      onClick: () => handleStatsCardClick('side-hustles')
    },
    {
      title: 'Mood Streak',
      value: `${userData?.moodStreak} days`,
      subtitle: 'Daily mood tracking',
      icon: 'Heart',
      color: 'from-success to-accent',
      trend: { type: 'up', value: 'Personal best!' },
      onClick: () => handleStatsCardClick('mood')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <HeroSection 
          userName={userData?.name}
          userLevel={userData?.level}
          userPoints={userData?.points}
        />

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards?.map((card, index) => (
            <UserStatsCard
              key={index}
              title={card?.title}
              value={card?.value}
              subtitle={card?.subtitle}
              icon={card?.icon}
              color={card?.color}
              progress={card?.progress}
              trend={card?.trend}
              onClick={card?.onClick}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <QuickActions />

            {/* Mood Selector */}
            <div id="mood-selector">
              <MoodSelector onMoodSelect={handleMoodSelect} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievement Panel */}
            <AchievementPanel 
              userLevel={userData?.level}
              userPoints={userData?.points}
            />

            {/* Activity Feed */}
            <ActivityFeed />
          </div>
        </div>

        {/* Weekly Progress Section */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={16} color="white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">Weekly Progress</h3>
            </div>
            <span className="text-sm text-muted-foreground">
              {new Date()?.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })} - {new Date(Date.now() + 6 * 86400000)?.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Weekly Goal Completion</span>
              <span className="font-medium text-card-foreground">{userData?.weeklyGoalProgress}%</span>
            </div>
            <div className="w-full h-3 bg-border rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success via-accent to-primary rounded-full transition-all duration-1000 animate-progress"
                style={{ width: `${userData?.weeklyGoalProgress}%` }}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-lg font-bold text-card-foreground">5</div>
                <div className="text-xs text-muted-foreground">Coaching Sessions</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-card-foreground">12</div>
                <div className="text-xs text-muted-foreground">Opportunities Found</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-card-foreground">7</div>
                <div className="text-xs text-muted-foreground">Days Active</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-card-foreground">3</div>
                <div className="text-xs text-muted-foreground">Badges Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Spacing */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default Dashboard;