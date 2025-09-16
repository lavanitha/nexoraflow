import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OpportunityCard = ({ 
  opportunity = {},
  onSave = () => {},
  onShare = () => {},
  onLearnMore = () => {},
  isSaved = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    id,
    title = "Opportunity Title",
    category = "General",
    description = "Opportunity description",
    earningPotential = "$500-1,000/month",
    timeCommitment = "5-10 hours/week",
    difficulty = "Intermediate",
    requiredSkills = [],
    matchScore = 85,
    whyItFits = "Based on your skills and interests",
    image = "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
    tags = [],
    rating = 4.5,
    reviewCount = 127
  } = opportunity;

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

  const handleSave = (e) => {
    e?.stopPropagation();
    onSave(id);
  };

  const handleShare = (e) => {
    e?.stopPropagation();
    onShare(opportunity);
  };

  const handleLearnMore = () => {
    onLearnMore(opportunity);
  };

  return (
    <div
      className={`bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1 transition-all duration-300 cursor-pointer hover-lift ${
        isHovered ? 'shadow-elevation-3' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleLearnMore}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleSave}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isSaved 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Icon name={isSaved ? "Heart" : "Heart"} size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
          >
            <Icon name="Share2" size={16} />
          </button>
        </div>

        {/* Match Score Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getMatchScoreColor(matchScore)}`}>
            {matchScore}% Match
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
            {category}
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 flex-1 mr-2">
            {title}
          </h3>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <Icon name="Star" size={14} className="text-warning" fill="currentColor" />
            <span className="text-sm font-medium text-card-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="DollarSign" size={12} className="text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Earning</p>
              <p className="text-sm font-medium text-card-foreground">{earningPotential}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Clock" size={12} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className="text-sm font-medium text-card-foreground">{timeCommitment}</p>
            </div>
          </div>
        </div>

        {/* Difficulty and Skills */}
        <div className="flex items-center justify-between mb-4">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </div>
          
          <div className="flex items-center space-x-1">
            {requiredSkills?.slice(0, 2)?.map((skill, index) => (
              <div
                key={index}
                className="px-2 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
              >
                {skill}
              </div>
            ))}
            {requiredSkills?.length > 2 && (
              <div className="px-2 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                +{requiredSkills?.length - 2}
              </div>
            )}
          </div>
        </div>

        {/* Why It Fits */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={14} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-primary mb-1">Why this fits you</p>
              <p className="text-xs text-muted-foreground">{whyItFits}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          className={`transition-all duration-200 ${
            isHovered ? 'bg-primary hover:bg-primary/90' : ''
          }`}
          onClick={(e) => {
            e?.stopPropagation();
            handleLearnMore();
          }}
        >
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default OpportunityCard;