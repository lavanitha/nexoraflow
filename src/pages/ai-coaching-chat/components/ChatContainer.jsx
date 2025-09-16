import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';

const ChatContainer = ({ 
  messages = [], 
  isTyping = false,
  onMessageComplete = () => {} 
}) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'end'
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-full text-center p-8"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
        </motion.div>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Welcome to AI Life Coaching
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        I'm here to help you build emotional resilience, set meaningful goals, and unlock your potential. 
        How are you feeling today?
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
        <div className="bg-card border border-border rounded-lg p-4 text-left">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">🎯</span>
            <span className="text-sm font-medium text-card-foreground">Goal Setting</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Define and achieve your personal and professional objectives
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-left">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">💪</span>
            <span className="text-sm font-medium text-card-foreground">Motivation</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Stay motivated and overcome challenges with personalized strategies
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-left">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">🧘</span>
            <span className="text-sm font-medium text-card-foreground">Wellness</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Build emotional resilience and maintain work-life balance
          </p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4 text-left">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">📈</span>
            <span className="text-sm font-medium text-card-foreground">Growth</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Develop skills and habits for continuous personal development
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-background"
      style={{ 
        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 123, 255, 0.02) 0%, transparent 50%),
                         radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.02) 0%, transparent 50%)` 
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-6">
        {messages?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-1">
            {messages?.map((message, index) => (
              <ChatMessage
                key={message?.id || index}
                message={message}
                isUser={message?.isUser}
                onComplete={() => onMessageComplete(message?.id)}
              />
            ))}
            
            {isTyping && (
              <ChatMessage
                message={{ content: '', timestamp: Date.now() }}
                isUser={false}
                isTyping={true}
              />
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;