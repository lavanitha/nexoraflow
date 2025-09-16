import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = 'from-primary to-secondary',
  progress = null,
  trend = null,
  onClick = null
}) => {
  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 shadow-elevation-2 hover-lift transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className={`w-8 h-8 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
              <Icon name={icon} size={16} color="white" strokeWidth={2.5} />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-card-foreground">{value}</span>
              {trend && (
                <div className={`flex items-center space-x-1 ${
                  trend?.type === 'up' ? 'text-success' : trend?.type === 'down' ? 'text-error' : 'text-muted-foreground'
                }`}>
                  <Icon 
                    name={trend?.type === 'up' ? 'TrendingUp' : trend?.type === 'down' ? 'TrendingDown' : 'Minus'} 
                    size={14} 
                  />
                  <span className="text-xs font-medium">{trend?.value}</span>
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        
        {onClick && (
          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
        )}
      </div>
      {progress && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>{progress?.label}</span>
            <span>{progress?.current}/{progress?.total}</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500 animate-progress`}
              style={{ width: `${(progress?.current / progress?.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStatsCard;