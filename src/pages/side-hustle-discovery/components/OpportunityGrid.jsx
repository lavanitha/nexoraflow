import React from 'react';
import OpportunityCard from './OpportunityCard';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';

const OpportunityGrid = ({
  opportunities = [],
  isLoading = false,
  savedOpportunities = [],
  onSave = () => {},
  onShare = () => {},
  onLearnMore = () => {},
  filters = {}
}) => {
  const isOpportunitySaved = (id) => savedOpportunities?.includes(id);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 })?.map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (opportunities?.length === 0) {
    return <EmptyState filters={filters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {opportunities?.map((opportunity) => (
        <OpportunityCard
          key={opportunity?.id}
          opportunity={opportunity}
          isSaved={isOpportunitySaved(opportunity?.id)}
          onSave={onSave}
          onShare={onShare}
          onLearnMore={onLearnMore}
        />
      ))}
    </div>
  );
};

export default OpportunityGrid;