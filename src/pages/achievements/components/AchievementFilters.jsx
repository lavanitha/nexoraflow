import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementFilters = ({ 
  filters = {}, 
  onFiltersChange = () => {},
  totalCount = 0,
  filteredCount = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'Grid3X3' },
    { value: 'productivity', label: 'Productivity', icon: 'Target' },
    { value: 'learning', label: 'Learning', icon: 'BookOpen' },
    { value: 'social', label: 'Social', icon: 'Users' },
    { value: 'milestone', label: 'Milestones', icon: 'Trophy' },
    { value: 'streak', label: 'Streaks', icon: 'Flame' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status', icon: 'List' },
    { value: 'unlocked', label: 'Unlocked', icon: 'CheckCircle' },
    { value: 'locked', label: 'Locked', icon: 'Lock' },
    { value: 'in-progress', label: 'In Progress', icon: 'Clock' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels', icon: 'BarChart3' },
    { value: 'easy', label: 'Easy', icon: 'Circle' },
    { value: 'medium', label: 'Medium', icon: 'Square' },
    { value: 'hard', label: 'Hard', icon: 'Triangle' },
    { value: 'legendary', label: 'Legendary', icon: 'Star' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: 'all',
      status: 'all',
      difficulty: 'all',
      search: ''
    });
  };

  const hasActiveFilters = () => {
    return filters?.category !== 'all' || 
           filters?.status !== 'all' || 
           filters?.difficulty !== 'all' || 
           (filters?.search && filters?.search?.length > 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-card-foreground">Filters</h3>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Showing {filteredCount} of {totalCount}</span>
            {hasActiveFilters() && (
              <button
                onClick={clearAllFilters}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Less' : 'More'} Filters
        </Button>
      </div>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <input
          type="text"
          placeholder="Search achievements..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {filters?.search && (
          <button
            onClick={() => handleFilterChange('search', '')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories?.slice(0, 4)?.map((category) => (
          <button
            key={category?.value}
            onClick={() => handleFilterChange('category', category?.value)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filters?.category === category?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={14} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-border">
          {/* Category Filter */}
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-2">Category</h4>
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => (
                <button
                  key={category?.value}
                  onClick={() => handleFilterChange('category', category?.value)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters?.category === category?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={category?.icon} size={14} />
                  <span>{category?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-2">Status</h4>
            <div className="flex flex-wrap gap-2">
              {statuses?.map((status) => (
                <button
                  key={status?.value}
                  onClick={() => handleFilterChange('status', status?.value)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters?.status === status?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={status?.icon} size={14} />
                  <span>{status?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-2">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {difficulties?.map((difficulty) => (
                <button
                  key={difficulty?.value}
                  onClick={() => handleFilterChange('difficulty', difficulty?.value)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters?.difficulty === difficulty?.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  <Icon name={difficulty?.icon} size={14} />
                  <span>{difficulty?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementFilters;