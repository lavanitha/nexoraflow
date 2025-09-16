import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ 
  message, 
  isUser = false, 
  isTyping = false, 
  onComplete = () => {} 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isUser && message?.content && !isTyping) {
      setDisplayedText('');
      setCurrentIndex(0);
      
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          setDisplayedText(message?.content?.slice(0, nextIndex));
          
          if (nextIndex >= message?.content?.length) {
            clearInterval(timer);
            onComplete();
            return prevIndex;
          }
          
          return nextIndex;
        });
      }, 30);

      return () => clearInterval(timer);
    } else if (isUser) {
      setDisplayedText(message?.content);
    }
  }, [message?.content, isUser, isTyping, onComplete]);

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-primary to-secondary ml-2' :'bg-gradient-to-br from-accent to-success mr-2'
        }`}>
          <Icon 
            name={isUser ? "User" : "Bot"} 
            size={16} 
            color="white" 
            strokeWidth={2}
          />
        </div>

        {/* Message Bubble */}
        <div className={`relative px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-br-md'
            : 'bg-card border border-border text-card-foreground rounded-bl-md shadow-elevation-1'
        }`}>
          {/* Message Content */}
          <div className="text-sm leading-relaxed">
            {isTyping ? (
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-muted-foreground ml-2">AI is thinking...</span>
              </div>
            ) : (
              <>
                {displayedText}
                {!isUser && currentIndex < message?.content?.length && (
                  <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse" />
                )}
              </>
            )}
          </div>

          {/* Mood Indicator for AI messages */}
          {!isUser && message?.mood && !isTyping && (
            <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-border/50">
              <span className="text-lg">{message?.mood?.emoji}</span>
              <span className="text-xs text-muted-foreground">{message?.mood?.label}</span>
            </div>
          )}

          {/* Timestamp */}
          <div className={`text-xs mt-1 ${
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}>
            {formatTime(message?.timestamp)}
          </div>

          {/* Message tail */}
          <div className={`absolute bottom-0 w-3 h-3 ${
            isUser
              ? 'right-0 transform translate-x-1 bg-gradient-to-br from-primary to-secondary'
              : 'left-0 transform -translate-x-1 bg-card border-l border-b border-border'
          } rotate-45`} />
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;