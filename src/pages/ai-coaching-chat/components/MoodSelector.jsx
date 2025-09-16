import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const MoodSelector = ({ 
  currentMood = null, 
  onMoodSelect = () => {},
  isVisible = true 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const moods = [
    { id: 'excited', emoji: '🚀', label: 'Excited', color: 'from-success to-accent' },
    { id: 'motivated', emoji: '💪', label: 'Motivated', color: 'from-primary to-secondary' },
    { id: 'focused', emoji: '🎯', label: 'Focused', color: 'from-secondary to-primary' },
    { id: 'calm', emoji: '😌', label: 'Calm', color: 'from-accent to-success' },
    { id: 'neutral', emoji: '😐', label: 'Neutral', color: 'from-muted to-border' },
    { id: 'stressed', emoji: '😰', label: 'Stressed', color: 'from-warning to-error' },
    { id: 'overwhelmed', emoji: '😵', label: 'Overwhelmed', color: 'from-error to-warning' },
    { id: 'sad', emoji: '😢', label: 'Sad', color: 'from-muted-foreground to-muted' }
  ];

  const handleMoodSelect = (mood) => {
    onMoodSelect(mood);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-4 shadow-elevation-2"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Heart" size={18} className="text-primary" />
          <h3 className="text-sm font-semibold text-card-foreground">How are you feeling?</h3>
        </div>
        <button
          onClick={toggleExpanded}
          className="p-1 rounded-lg hover:bg-muted transition-colors"
        >
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground" 
          />
        </button>
      </div>
      {/* Current Mood Display */}
      {currentMood && (
        <div className="mb-3">
          <div className={`inline-flex items-center space-x-2 px-3 py-2 bg-gradient-to-r ${currentMood?.color} rounded-lg`}>
            <span className="text-lg">{currentMood?.emoji}</span>
            <span className="text-sm font-medium text-white">{currentMood?.label}</span>
          </div>
        </div>
      )}
      {/* Mood Grid */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : '60px' }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-4 gap-2">
          {moods?.map((mood, index) => (
            <motion.button
              key={mood?.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isExpanded || index < 4 ? 1 : 0.3, 
                scale: isExpanded || index < 4 ? 1 : 0.8 
              }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleMoodSelect(mood)}
              className={`relative p-3 rounded-lg border-2 transition-all duration-200 hover-lift ${
                currentMood?.id === mood?.id
                  ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50 hover:bg-muted'
              }`}
              title={mood?.label}
            >
              <div className="text-2xl mb-1">{mood?.emoji}</div>
              <div className="text-xs font-medium text-card-foreground truncate">
                {mood?.label}
              </div>
              
              {currentMood?.id === mood?.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                >
                  <Icon name="Check" size={10} color="white" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
      {/* Mood Insights */}
      {currentMood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-border"
        >
          <p className="text-xs text-muted-foreground">
            {currentMood?.id === 'excited' && "Great energy! Let's channel this into productive action."}
            {currentMood?.id === 'motivated' && "Perfect mindset for tackling challenges and goals."}
            {currentMood?.id === 'focused' && "Excellent! You're in the zone for deep work."}
            {currentMood?.id === 'calm' && "A peaceful state is perfect for reflection and planning."}
            {currentMood?.id === 'neutral' && "A balanced state - let's explore what you'd like to work on."}
            {currentMood?.id === 'stressed' && "I understand. Let's work through this together step by step."}
            {currentMood?.id === 'overwhelmed' && "Take a breath. We'll break things down into manageable pieces."}
            {currentMood?.id === 'sad' && "I'm here to support you. Sometimes talking helps process feelings."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MoodSelector;