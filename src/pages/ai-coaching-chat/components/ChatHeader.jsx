import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  onClearChat = () => {},
  messageCount = 0,
  sessionDuration = 0,
  aiStatus = 'online' 
}) => {
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (aiStatus) {
      case 'online': return 'bg-success';
      case 'typing': return 'bg-warning animate-pulse';
      case 'offline': return 'bg-muted-foreground';
      default: return 'bg-success';
    }
  };

  const getStatusText = () => {
    switch (aiStatus) {
      case 'online': return 'Ready to help';
      case 'typing': return 'Thinking...';
      case 'offline': return 'Offline';
      default: return 'Ready to help';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border-b border-border px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* AI Coach Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center">
              <Icon name="Bot" size={24} color="white" strokeWidth={2} />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor()} rounded-full border-2 border-card`} />
          </div>
          
          <div>
            <h1 className="text-lg font-semibold text-card-foreground">AI Life Coach</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{getStatusText()}</span>
              <span>•</span>
              <span>Specialized in productivity & wellness</span>
            </div>
          </div>
        </div>

        {/* Session Info & Actions */}
        <div className="flex items-center space-x-4">
          {/* Session Stats */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MessageCircle" size={16} />
              <span>{messageCount} messages</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{formatDuration(sessionDuration)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              iconSize={16}
              onClick={onClearChat}
              title="Clear conversation"
              className="text-muted-foreground hover:text-foreground"
            />
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Settings"
              iconSize={16}
              title="Chat settings"
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </div>
      {/* Quick Stats Bar */}
      <div className="mt-4 flex items-center justify-between p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Target" size={14} />
            <span>Goal-focused coaching</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>Private & secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={14} />
            <span>Instant responses</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 text-xs text-success">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>Active session</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;