import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  filters = {}, 
  onFiltersChange = () => {},
  resultCount = 0,
  isLoading = false 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'freelancing', label: 'Freelancing' },
    { value: 'online-business', label: 'Online Business' },
    { value: 'creative', label: 'Creative Services' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'tutoring', label: 'Tutoring & Teaching' },
    { value: 'delivery', label: 'Delivery & Transport' },
    { value: 'handyman', label: 'Handyman Services' },
    { value: 'digital-marketing', label: 'Digital Marketing' }
  ];

  const timeCommitmentOptions = [
    { value: 'all', label: 'Any Time Commitment' },
    { value: '1-5', label: '1-5 hours/week' },
    { value: '5-10', label: '5-10 hours/week' },
    { value: '10-20', label: '10-20 hours/week' },
    { value: '20+', label: '20+ hours/week' }
  ];

  const earningPotentialOptions = [
    { value: 'all', label: 'Any Earning Range' },
    { value: '100-500', label: '$100-500/month' },
    { value: '500-1000', label: '$500-1,000/month' },
    { value: '1000-2500', label: '$1,000-2,500/month' },
    { value: '2500+', label: '$2,500+/month' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'Any Difficulty' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const skillOptions = [
    { value: 'all', label: 'Any Skills' },
    { value: 'writing', label: 'Writing' },
    { value: 'design', label: 'Design' },
    { value: 'programming', label: 'Programming' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'photography', label: 'Photography' },
    { value: 'teaching', label: 'Teaching' },
    { value: 'sales', label: 'Sales' },
    { value: 'customer-service', label: 'Customer Service' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      category: 'all',
      timeCommitment: 'all',
      earningPotential: 'all',
      difficulty: 'all',
      skills: 'all'
    };
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value && value !== 'all');

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={16} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Filter Opportunities</h3>
            <p className="text-sm text-muted-foreground">
              {isLoading ? 'Searching...' : `${resultCount} opportunities found`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAdvanced ? 'Less Filters' : 'More Filters'}
          </Button>
        </div>
      </div>
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category || 'all'}
          onChange={(value) => handleFilterChange('category', value)}
          className="w-full"
        />
        
        <Select
          label="Time Commitment"
          options={timeCommitmentOptions}
          value={filters?.timeCommitment || 'all'}
          onChange={(value) => handleFilterChange('timeCommitment', value)}
          className="w-full"
        />
        
        <Select
          label="Earning Potential"
          options={earningPotentialOptions}
          value={filters?.earningPotential || 'all'}
          onChange={(value) => handleFilterChange('earningPotential', value)}
          className="w-full"
        />
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border animate-spring">
          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={filters?.difficulty || 'all'}
            onChange={(value) => handleFilterChange('difficulty', value)}
            className="w-full"
          />
          
          <Select
            label="Required Skills"
            options={skillOptions}
            value={filters?.skills || 'all'}
            onChange={(value) => handleFilterChange('skills', value)}
            className="w-full"
          />
        </div>
      )}
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
            {Object.entries(filters)?.map(([key, value]) => {
              if (!value || value === 'all') return null;
              
              const getFilterLabel = (key, value) => {
                const optionMap = {
                  category: categoryOptions,
                  timeCommitment: timeCommitmentOptions,
                  earningPotential: earningPotentialOptions,
                  difficulty: difficultyOptions,
                  skills: skillOptions
                };
                
                const option = optionMap?.[key]?.find(opt => opt?.value === value);
                return option?.label || value;
              };

              return (
                <div
                  key={key}
                  className="inline-flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium"
                >
                  <span>{getFilterLabel(key, value)}</span>
                  <button
                    onClick={() => handleFilterChange(key, 'all')}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;