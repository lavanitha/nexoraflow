import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-elevation-1">
      {/* Image Skeleton */}
      <div className="h-48 bg-muted animate-shimmer" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-muted rounded animate-shimmer w-3/4" />
            <div className="h-4 bg-muted rounded animate-shimmer w-1/2" />
          </div>
          <div className="h-4 bg-muted rounded animate-shimmer w-16" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded animate-shimmer w-full" />
          <div className="h-3 bg-muted rounded animate-shimmer w-2/3" />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-muted rounded-full animate-shimmer" />
            <div className="space-y-1">
              <div className="h-3 bg-muted rounded animate-shimmer w-12" />
              <div className="h-3 bg-muted rounded animate-shimmer w-16" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-muted rounded-full animate-shimmer" />
            <div className="space-y-1">
              <div className="h-3 bg-muted rounded animate-shimmer w-12" />
              <div className="h-3 bg-muted rounded animate-shimmer w-20" />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-muted rounded-full animate-shimmer w-20" />
          <div className="flex space-x-1">
            <div className="h-6 bg-muted rounded-full animate-shimmer w-16" />
            <div className="h-6 bg-muted rounded-full animate-shimmer w-12" />
          </div>
        </div>

        {/* Why It Fits */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded animate-shimmer w-24" />
            <div className="h-3 bg-muted rounded animate-shimmer w-full" />
          </div>
        </div>

        {/* Button */}
        <div className="h-10 bg-muted rounded animate-shimmer w-full" />
      </div>
    </div>
  );
};

export default SkeletonCard;