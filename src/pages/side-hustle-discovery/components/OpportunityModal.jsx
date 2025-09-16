import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OpportunityModal = ({ 
  opportunity = null, 
  isOpen = false, 
  onClose = () => {},
  onSave = () => {},
  onShare = () => {},
  isSaved = false 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

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

  if (!isOpen || !opportunity) return null;

  const {
    id,
    title = "Opportunity Title",
    category = "General",
    description = "Detailed opportunity description",
    longDescription = `This is a comprehensive opportunity that offers great potential for growth and income generation. Perfect for individuals looking to expand their skill set while earning additional income.

Key benefits include flexible working hours, competitive compensation, and the opportunity to work with diverse clients from around the world.`,
    earningPotential = "$500-1,000/month",
    timeCommitment = "5-10 hours/week",
    difficulty = "Intermediate",
    requiredSkills = [],
    matchScore = 85,
    whyItFits = "Based on your skills and interests",
    image = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    rating = 4.5,
    reviewCount = 127,
    gettingStarted = [
      "Create a professional profile showcasing your skills",
      "Build a portfolio of your best work samples",
      "Set competitive pricing for your services",
      "Start applying to relevant opportunities",
      "Deliver high-quality work to build reputation"
    ],
    requirements = [
      "Strong communication skills",
      "Reliable internet connection",
      "Dedicated workspace",
      "Time management abilities"
    ],
    pros = [
      "Flexible working hours",
      "Work from anywhere",
      "Diverse client base",
      "Skill development opportunities",
      "Scalable income potential"
    ],
    cons = [
      "Income can be variable",
      "Self-marketing required",
      "Client acquisition challenges",
      "No traditional benefits"
    ]
  } = opportunity;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'getting-started', label: 'Getting Started', icon: 'Play' },
    { id: 'requirements', label: 'Requirements', icon: 'CheckSquare' },
    { id: 'pros-cons', label: 'Pros & Cons', icon: 'Scale' }
  ];

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 80) return 'text-success bg-success/10';
    if (score >= 60) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const handleSave = () => {
    onSave(id);
  };

  const handleShare = () => {
    onShare(opportunity);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-card-foreground mb-3">About This Opportunity</h4>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {longDescription}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="DollarSign" size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Earning Potential</p>
                    <p className="font-semibold text-card-foreground">{earningPotential}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time Commitment</p>
                    <p className="font-semibold text-card-foreground">{timeCommitment}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                    <Icon name="BarChart3" size={16} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty Level</p>
                    <div className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${getDifficultyColor(difficulty)}`}>
                      {difficulty}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name="Star" size={16} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold text-card-foreground">{rating}</span>
                      <Icon name="Star" size={14} className="text-warning" fill="currentColor" />
                      <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {requiredSkills?.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-card-foreground mb-3">Required Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {requiredSkills?.map((skill, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
        
      case 'getting-started':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-card-foreground mb-3">How to Get Started</h4>
              <p className="text-muted-foreground mb-4">
                Follow these steps to begin your journey with this side hustle opportunity.
              </p>
            </div>
            <div className="space-y-4">
              {gettingStarted?.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'requirements':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-card-foreground mb-3">Requirements</h4>
              <p className="text-muted-foreground mb-4">
                Make sure you meet these requirements before getting started.
              </p>
            </div>
            <div className="space-y-3">
              {requirements?.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success flex-shrink-0" />
                  <p className="text-muted-foreground">{requirement}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'pros-cons':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-success mb-4 flex items-center space-x-2">
                  <Icon name="ThumbsUp" size={20} />
                  <span>Pros</span>
                </h4>
                <div className="space-y-3">
                  {pros?.map((pro, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon name="Plus" size={16} className="text-success flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{pro}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-error mb-4 flex items-center space-x-2">
                  <Icon name="ThumbsDown" size={20} />
                  <span>Cons</span>
                </h4>
                <div className="space-y-3">
                  {cons?.map((con, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon name="Minus" size={16} className="text-error flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{con}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-500 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card border border-border rounded-lg shadow-elevation-4 w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="relative">
            <div className="h-64 overflow-hidden bg-muted">
              <Image
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            {/* Header Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                      {category}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getMatchScoreColor(matchScore)}`}>
                      {matchScore}% Match
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{title}</h2>
                  <p className="text-white/80">{description}</p>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col h-[calc(90vh-16rem)]">
            {/* Tabs */}
            <div className="border-b border-border px-6">
              <div className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="font-medium">{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderTabContent()}
            </div>
            
            {/* Footer */}
            <div className="border-t border-border p-6">
              <div className="flex items-center justify-between">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex-1 mr-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-primary mb-1">Why this fits you</p>
                      <p className="text-sm text-muted-foreground">{whyItFits}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleSave}
                    iconName={isSaved ? "Heart" : "Heart"}
                    iconPosition="left"
                    className={isSaved ? "text-primary border-primary" : ""}
                  >
                    {isSaved ? 'Saved' : 'Save'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    iconName="Share2"
                    iconPosition="left"
                  >
                    Share
                  </Button>
                  <Button
                    variant="default"
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;