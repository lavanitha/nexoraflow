import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MessageInput = ({ 
  onSendMessage = () => {},
  isDisabled = false,
  placeholder = "Type your message...",
  maxLength = 500 
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isDisabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  const characterCount = message?.length;
  const isNearLimit = characterCount > maxLength * 0.8;
  const isOverLimit = characterCount > maxLength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-4 shadow-elevation-2"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Input Area */}
        <div className={`relative border-2 rounded-lg transition-colors ${
          isFocused 
            ? 'border-primary bg-primary/5' :'border-border bg-background hover:border-primary/50'
        }`}>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={isDisabled}
            maxLength={maxLength}
            rows={1}
            className="w-full px-4 py-3 bg-transparent text-foreground placeholder-muted-foreground resize-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          {/* Character Counter */}
          {(isNearLimit || message?.length > 0) && (
            <div className={`absolute bottom-2 right-2 text-xs ${
              isOverLimit ? 'text-error' : isNearLimit ? 'text-warning' : 'text-muted-foreground'
            }`}>
              {characterCount}/{maxLength}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Mood Indicator */}
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Heart" size={14} />
              <span>Share your thoughts</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Voice Input Button (Future Feature) */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconName="Mic"
              iconSize={16}
              className="opacity-50 cursor-not-allowed"
              disabled
              title="Voice input coming soon"
            />

            {/* Send Button */}
            <Button
              type="submit"
              variant="default"
              size="sm"
              disabled={!message?.trim() || isDisabled || isOverLimit}
              iconName="Send"
              iconPosition="right"
              iconSize={16}
              className="min-w-[80px]"
            >
              Send
            </Button>
          </div>
        </div>

        {/* Input Hints */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Press Enter to send</span>
            <span>Shift + Enter for new line</span>
          </div>
          
          {isDisabled && (
            <div className="flex items-center space-x-1 text-warning">
              <Icon name="Clock" size={12} />
              <span>AI is responding...</span>
            </div>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default MessageInput;