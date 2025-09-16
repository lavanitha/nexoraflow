import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ filters = {}, onClearFilters = () => {}, onEnhanceProfile = () => {} }) => {
  const hasActiveFilters = Object.values(filters)?.some(value => value && value !== 'all');

  if (hasActiveFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-muted to-border rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">No opportunities found</h3>
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          We couldn't find any side hustles matching your current filters. Try adjusting your search criteria to discover more opportunities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="default"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear All Filters
          </Button>
          <Button
            variant="outline"
            onClick={onEnhanceProfile}
            iconName="User"
            iconPosition="left"
          >
            Update Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-6">
        <Icon name="TrendingUp" size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">Let's find your perfect side hustle!</h3>
      <p className="text-muted-foreground text-center mb-6 max-w-md">
        Complete your profile to get personalized recommendations based on your skills, interests, and availability.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onEnhanceProfile}
          iconName="Plus"
          iconPosition="left"
        >
          Complete Profile
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location?.reload()}
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh Results
        </Button>
      </div>
      {/* Tips Section */}
      <div className="mt-12 max-w-2xl">
        <h4 className="text-lg font-semibold text-foreground mb-4 text-center">Tips to get better recommendations:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-card border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <h5 className="font-medium text-card-foreground mb-2">Complete Profile</h5>
            <p className="text-sm text-muted-foreground">Add your skills, interests, and experience</p>
          </div>
          
          <div className="text-center p-4 bg-card border border-border rounded-lg">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Clock" size={20} className="text-accent" />
            </div>
            <h5 className="font-medium text-card-foreground mb-2">Set Availability</h5>
            <p className="text-sm text-muted-foreground">Tell us how much time you can commit</p>
          </div>
          
          <div className="text-center p-4 bg-card border border-border rounded-lg">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="Target" size={20} className="text-success" />
            </div>
            <h5 className="font-medium text-card-foreground mb-2">Define Goals</h5>
            <p className="text-sm text-muted-foreground">Share your income and career objectives</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;