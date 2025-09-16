import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const MoodSelector = ({ onMoodSelect = () => {} }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [streak, setStreak] = useState(7);

  const moods = [
    { id: 'excited', emoji: '🚀', label: 'Excited', color: 'from-primary to-secondary' },
    { id: 'happy', emoji: '😊', label: 'Happy', color: 'from-success to-accent' },
    { id: 'neutral', emoji: '😐', label: 'Neutral', color: 'from-muted-foreground to-border' },
    { id: 'tired', emoji: '😴', label: 'Tired', color: 'from-warning to-primary' },
    { id: 'stressed', emoji: '😰', label: 'Stressed', color: 'from-error to-warning' }
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    onMoodSelect(mood);
    
    // Simulate streak update
    if (mood?.id !== 'stressed' && mood?.id !== 'tired') {
      setStreak(prev => prev + 1);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={16} color="white" strokeWidth={2.5} />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">How are you feeling?</h3>
        </div>
        
        <div className="flex items-center space-x-2 bg-muted rounded-full px-3 py-1">
          <Icon name="Flame" size={14} className="text-warning" />
          <span className="text-sm font-medium text-foreground">{streak} day streak</span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 mb-4">
        {moods?.map((mood) => (
          <button
            key={mood?.id}
            onClick={() => handleMoodSelect(mood)}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              selectedMood?.id === mood?.id
                ? 'border-primary bg-primary/10 shadow-elevation-2'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="text-center space-y-2">
              <div className="text-2xl">{mood?.emoji}</div>
              <span className="text-xs font-medium text-card-foreground block">{mood?.label}</span>
            </div>
            
            {selectedMood?.id === mood?.id && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg pointer-events-none" />
            )}
          </button>
        ))}
      </div>
      {selectedMood && (
        <div className="bg-muted rounded-lg p-4 animate-spring">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br ${selectedMood?.color} rounded-full flex items-center justify-center`}>
              <span className="text-lg">{selectedMood?.emoji}</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-card-foreground">
                Feeling {selectedMood?.label?.toLowerCase()} today!
              </h4>
              <p className="text-xs text-muted-foreground">
                {selectedMood?.id === 'excited' && "Great energy! Perfect time to tackle new challenges."}
                {selectedMood?.id === 'happy' && "Wonderful! Your positive mood will boost productivity."}
                {selectedMood?.id === 'neutral' && "That's okay! Sometimes steady progress is best."}
                {selectedMood?.id === 'tired' && "Take it easy today. Rest is part of growth."}
                {selectedMood?.id === 'stressed' && "Remember to breathe. You've got this!"}
              </p>
            </div>
            <div className="flex items-center space-x-1 bg-success/10 rounded-full px-2 py-1">
              <Icon name="Plus" size={12} className="text-success" />
              <span className="text-xs font-medium text-success">+5 pts</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodSelector;