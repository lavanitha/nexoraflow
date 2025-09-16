import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AchievementCard from './components/AchievementCard';
import AchievementFilters from './components/AchievementFilters';
import ProgressTracker from './components/ProgressTracker';
import AchievementModal from './components/AchievementModal';
import LeaderboardModal from './components/LeaderboardModal';

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] = useState([]);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    difficulty: 'all',
    search: ''
  });
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [userStats, setUserStats] = useState({});
  const [nextMilestone, setNextMilestone] = useState({});
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock achievements data
  const mockAchievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first coaching session and start your personal development journey.",
      category: "learning",
      type: "milestone",
      difficulty: "easy",
      points: 50,
      badge: "Beginner",
      isUnlocked: true,
      isRecent: true,
      unlockedAt: "2025-01-15T10:30:00Z",
      criteria: "Complete 1 coaching session",
      currentProgress: 1,
      targetProgress: 1
    },
    {
      id: 2,
      title: "Side Hustle Explorer",
      description: "Discover and save 5 different side hustle opportunities that match your skills.",
      category: "productivity",
      type: "productivity",
      difficulty: "medium",
      points: 100,
      badge: "Explorer",
      isUnlocked: true,
      isRecent: false,
      unlockedAt: "2025-01-10T14:20:00Z",
      criteria: "Save 5 side hustle opportunities",
      currentProgress: 5,
      targetProgress: 5
    },
    {
      id: 3,
      title: "Consistency Champion",
      description: "Maintain a 7-day streak of daily platform engagement and learning activities.",
      category: "streak",
      type: "streak",
      difficulty: "medium",
      points: 150,
      badge: "Consistent",
      isUnlocked: false,
      isRecent: false,
      criteria: "Maintain 7-day activity streak",
      currentProgress: 4,
      targetProgress: 7
    },
    {
      id: 4,
      title: "Knowledge Seeker",
      description: "Complete 10 coaching sessions and demonstrate commitment to personal growth.",
      category: "learning",
      type: "learning",
      difficulty: "medium",
      points: 200,
      badge: "Scholar",
      isUnlocked: false,
      isRecent: false,
      criteria: "Complete 10 coaching sessions",
      currentProgress: 6,
      targetProgress: 10
    },
    {
      id: 5,
      title: "Community Builder",
      description: "Share 3 achievements on social media and inspire others in their journey.",
      category: "social",
      type: "social",
      difficulty: "easy",
      points: 75,
      badge: "Influencer",
      isUnlocked: true,
      isRecent: false,
      unlockedAt: "2025-01-08T16:45:00Z",
      criteria: "Share 3 achievements",
      currentProgress: 3,
      targetProgress: 3
    },
    {
      id: 6,
      title: "Goal Crusher",
      description: "Set and achieve 5 personal development goals through the coaching system.",
      category: "productivity",
      type: "milestone",
      difficulty: "hard",
      points: 300,
      badge: "Achiever",
      isUnlocked: false,
      isRecent: false,
      criteria: "Complete 5 personal goals",
      currentProgress: 2,
      targetProgress: 5
    },
    {
      id: 7,
      title: "Skill Master",
      description: "Develop expertise in 3 different skill categories through focused learning.",
      category: "learning",
      type: "learning",
      difficulty: "hard",
      points: 400,
      badge: "Master",
      isUnlocked: false,
      isRecent: false,
      criteria: "Master 3 skill categories",
      currentProgress: 1,
      targetProgress: 3
    },
    {
      id: 8,
      title: "Legendary Achiever",
      description: "Reach the highest level of engagement and unlock all premium features.",
      category: "milestone",
      type: "level",
      difficulty: "legendary",
      points: 1000,
      badge: "Legend",
      isUnlocked: false,
      isRecent: false,
      criteria: "Reach maximum level",
      currentProgress: 10,
      targetProgress: 20
    }
  ];

  // Mock user stats
  const mockUserStats = {
    totalPoints: 2480,
    currentLevel: 10,
    completionPercentage: 38,
    unlockedCount: 3,
    totalCount: 8,
    streakDays: 4,
    badgesEarned: 3,
    leaderboardRank: 4,
    weeklyPoints: 350
  };

  // Mock next milestone
  const mockNextMilestone = {
    title: "Consistency Champion",
    description: "Maintain a 7-day streak of daily platform engagement",
    currentProgress: 4,
    targetProgress: 7,
    pointsReward: 150
  };

  // Mock recent achievements
  const mockRecentAchievements = [
    {
      id: 1,
      title: "First Steps",
      points: 50,
      unlockedAt: "2025-01-15T10:30:00Z"
    },
    {
      id: 2,
      title: "Side Hustle Explorer", 
      points: 100,
      unlockedAt: "2025-01-10T14:20:00Z"
    },
    {
      id: 5,
      title: "Community Builder",
      points: 75,
      unlockedAt: "2025-01-08T16:45:00Z"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAchievements(mockAchievements);
      setUserStats(mockUserStats);
      setNextMilestone(mockNextMilestone);
      setRecentAchievements(mockRecentAchievements);
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter achievements based on current filters
    let filtered = achievements;

    if (filters?.category !== 'all') {
      filtered = filtered?.filter(achievement => achievement?.category === filters?.category);
    }

    if (filters?.status !== 'all') {
      if (filters?.status === 'unlocked') {
        filtered = filtered?.filter(achievement => achievement?.isUnlocked);
      } else if (filters?.status === 'locked') {
        filtered = filtered?.filter(achievement => !achievement?.isUnlocked && achievement?.currentProgress === 0);
      } else if (filters?.status === 'in-progress') {
        filtered = filtered?.filter(achievement => !achievement?.isUnlocked && achievement?.currentProgress > 0);
      }
    }

    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(achievement => achievement?.difficulty === filters?.difficulty);
    }

    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(achievement => 
        achievement?.title?.toLowerCase()?.includes(searchTerm) ||
        achievement?.description?.toLowerCase()?.includes(searchTerm) ||
        achievement?.criteria?.toLowerCase()?.includes(searchTerm)
      );
    }

    setFilteredAchievements(filtered);
  }, [achievements, filters]);

  const handleViewDetails = (achievement) => {
    setSelectedAchievement(achievement);
    setShowAchievementModal(true);
  };

  const handleShare = (achievement) => {
    // Mock share functionality
    const shareText = `🎉 I just unlocked the "${achievement?.title}" achievement on NexoraFlow! ${achievement?.points} points earned! #NexoraFlow #Achievement`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Achievement Unlocked!',
        text: shareText,
        url: window.location?.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(shareText)?.then(() => {
        alert('Achievement details copied to clipboard!');
      });
    }
  };

  const handleViewLeaderboard = () => {
    setShowLeaderboardModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Achievements - NexoraFlow</title>
          <meta name="description" content="Track your progress and unlock achievements on your personal development journey" />
        </Helmet>
        
        <div className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Icon name="Trophy" size={32} color="white" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Loading Achievements</h2>
                <p className="text-muted-foreground">Fetching your progress and rewards...</p>
                <div className="flex space-x-1 justify-center mt-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Achievements - NexoraFlow</title>
        <meta name="description" content="Track your progress, unlock achievements, and celebrate your personal development milestones" />
        <meta name="keywords" content="achievements, progress tracking, gamification, personal development, badges, rewards" />
      </Helmet>
      {/* Header Section */}
      <div className="pt-20 pb-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Trophy" size={24} color="white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Your Achievements
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Track your progress, celebrate milestones, and unlock rewards as you advance on your personal development journey.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Award" size={16} color="white" />
              </div>
              <p className="text-xl font-bold text-card-foreground">{userStats?.unlockedCount}</p>
              <p className="text-xs text-muted-foreground">Unlocked</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Star" size={16} color="white" />
              </div>
              <p className="text-xl font-bold text-card-foreground">{userStats?.totalPoints?.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Points</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-warning to-primary rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="TrendingUp" size={16} color="white" />
              </div>
              <p className="text-xl font-bold text-card-foreground">Level {userStats?.currentLevel}</p>
              <p className="text-xs text-muted-foreground">Current Level</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name="Users" size={16} color="white" />
              </div>
              <p className="text-xl font-bold text-card-foreground">#{userStats?.leaderboardRank}</p>
              <p className="text-xs text-muted-foreground">Rank</p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Progress Tracker */}
          <div className="lg:col-span-1">
            <ProgressTracker
              userStats={userStats}
              nextMilestone={nextMilestone}
              recentAchievements={recentAchievements}
              onViewLeaderboard={handleViewLeaderboard}
            />
          </div>

          {/* Right Column - Achievements */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <AchievementFilters
              filters={filters}
              onFiltersChange={setFilters}
              totalCount={achievements?.length}
              filteredCount={filteredAchievements?.length}
            />

            {/* Achievements Grid */}
            {filteredAchievements?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAchievements?.map((achievement) => (
                  <AchievementCard
                    key={achievement?.id}
                    achievement={achievement}
                    onViewDetails={handleViewDetails}
                    onShare={handleShare}
                    showGlow={achievement?.isRecent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={32} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No Achievements Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms to find achievements.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilters({ category: 'all', status: 'all', difficulty: 'all', search: '' })}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      <AchievementModal
        achievement={selectedAchievement}
        isOpen={showAchievementModal}
        onClose={() => {
          setShowAchievementModal(false);
          setSelectedAchievement(null);
        }}
        onShare={handleShare}
      />
      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        currentUser={{
          rank: userStats?.leaderboardRank,
          points: userStats?.totalPoints,
          weeklyGain: userStats?.weeklyPoints
        }}
      />
    </div>
  );
};

export default AchievementsPage;