import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';

const QuickResponseChips = ({ 
  onChipSelect = () => {},
  currentMood = null,
  isVisible = true,
  customResponses = null 
}) => {
  const getQuickResponses = () => {
    const baseResponses = [
      { id: 'goal', text: "Help me set a goal", icon: "Target" },
      { id: 'motivation', text: "I need motivation", icon: "Zap" },
      { id: 'productivity', text: "Productivity tips", icon: "TrendingUp" },
      { id: 'balance', text: "Work-life balance", icon: "Scale" }
    ];

    const moodSpecificResponses = {
      stressed: [
        { id: 'stress', text: "Manage stress", icon: "Heart" },
        { id: 'breathe', text: "Breathing exercise", icon: "Wind" },
        { id: 'break', text: "I need a break", icon: "Coffee" },
        { id: 'priority', text: "Help prioritize", icon: "List" }
      ],
      overwhelmed: [
        { id: 'organize', text: "Organize my tasks", icon: "CheckSquare" },
        { id: 'simplify', text: "Simplify my day", icon: "Minimize2" },
        { id: 'focus', text: "What to focus on?", icon: "Eye" },
        { id: 'delegate', text: "Delegation tips", icon: "Users" }
      ],
      sad: [
        { id: 'support', text: "I need support", icon: "Heart" },
        { id: 'perspective', text: "Change perspective", icon: "RefreshCw" },
        { id: 'selfcare', text: "Self-care ideas", icon: "Smile" },
        { id: 'gratitude', text: "Practice gratitude", icon: "ThumbsUp" }
      ],
      excited: [
        { id: 'channel', text: "Channel this energy", icon: "Zap" },
        { id: 'biggoal', text: "Set a big goal", icon: "Mountain" },
        { id: 'action', text: "Take action now", icon: "Play" },
        { id: 'celebrate', text: "Celebrate wins", icon: "Trophy" }
      ],
      motivated: [
        { id: 'momentum', text: "Build momentum", icon: "TrendingUp" },
        { id: 'challenge', text: "New challenge", icon: "Zap" },
        { id: 'plan', text: "Make a plan", icon: "Calendar" },
        { id: 'habits', text: "Build habits", icon: "Repeat" }
      ]
    };

    // Use custom responses if provided, otherwise use default logic
    const responses = customResponses || (currentMood ? moodSpecificResponses?.[currentMood?.id] || baseResponses : baseResponses);

    return responses;
  };

  const quickResponses = getQuickResponses();

  const handleChipClick = (response) => {
    onChipSelect(response?.text);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-2 h-2 bg-primary rounded-full" />
        <span className="text-xs font-medium text-muted-foreground">Quick responses</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {quickResponses?.map((response, index) => (
          <motion.div
            key={response?.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleChipClick(response)}
              iconName={response?.icon}
              iconPosition="left"
              iconSize={14}
              className="text-xs hover-lift"
            >
              {response?.text}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickResponseChips;