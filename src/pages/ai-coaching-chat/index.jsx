import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import MoodSelector from './components/MoodSelector';
import QuickResponseChips from './components/QuickResponseChips';
import MessageInput from './components/MessageInput';
import aiCoachingService from '../../services/aiCoachingService';

const AICoachingChat = () => {
  const [messages, setMessages] = useState([]);
  const [currentMood, setCurrentMood] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [sessionStartTime] = useState(Date.now());
  const [quickResponses, setQuickResponses] = useState([]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStartTime]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      content: "Hello! I'm your AI life coach, and I'm here to support your personal growth journey. I use advanced AI to provide personalized coaching based on your needs and emotional state.\n\nI can help you with goal setting, stress management, motivation, productivity, work-life balance, and building emotional resilience.\n\nTo get started, you might want to share how you're feeling today using the mood selector below, or simply tell me what's on your mind.",
      isUser: false,
      timestamp: Date.now(),
      mood: { emoji: '🤖', label: 'Ready to help' }
    };
    setMessages([welcomeMessage]);
    
    // Generate initial quick responses
    generateQuickResponses();
  }, []);

  // Add the missing aiResponses object
  const aiResponses = {
    goal: [
      "That's a meaningful goal! Let's break it down into actionable steps. What's the first milestone you'd like to achieve?",
      "I love that you're thinking about your goals. What's motivating you to pursue this particular objective?",
      "Goals give us direction and purpose. What would achieving this goal mean to you personally?"
    ],
    motivation: [
      "Your drive to improve is inspiring! What's fueling this motivation right now?",
      "Motivation is powerful when channeled effectively. What specific area would you like to focus this energy on?",
      "I can sense your enthusiasm! How can we maintain this momentum as you work toward your objectives?"
    ],
    stress: [
      "I understand you're feeling stressed. Let's work together to identify what's causing the most pressure and how to address it.",
      "Stress can feel overwhelming, but you're taking the right step by talking about it. What's weighing on you most heavily?",
      "Managing stress is crucial for your wellbeing. What coping strategies have worked for you in the past?"
    ],
    productivity: [
      "Productivity is about working smarter, not just harder. What's your biggest challenge with staying focused?",
      "Let's optimize your approach! What tasks or activities tend to drain your energy the most?",
      "Efficiency comes from understanding your patterns. When do you feel most productive during the day?"
    ],
    balance: [
      "Work-life balance is essential for long-term success and happiness. What area feels most out of balance right now?",
      "Finding balance is an ongoing process. What would your ideal balance look like?",
      "Time management is key to balance. What's taking up more time than you'd like in your current routine?"
    ]
  };

  const generateQuickResponses = async (mood = null, context = []) => {
    try {
      const responses = await aiCoachingService?.generateQuickResponses(mood, context);
      setQuickResponses(responses);
    } catch (error) {
      console.error('Error generating quick responses:', error);
      // Use fallback responses
      const fallbackResponses = [
        "What\'s my main goal?",
        "How can I improve this?",
        "What should I focus on?",
        "What\'s holding me back?"
      ];
      setQuickResponses(fallbackResponses);
    }
  };

  const getAIResponse = (userMessage, mood = null) => {
    const message = userMessage?.toLowerCase();
    
    // Context-aware responses
    if (message?.includes('goal') || message?.includes('target') || message?.includes('achieve')) {
      return aiResponses?.goal?.[Math.floor(Math.random() * aiResponses?.goal?.length)];
    }
    if (message?.includes('motivat') || message?.includes('inspire') || message?.includes('energy')) {
      return aiResponses?.motivation?.[Math.floor(Math.random() * aiResponses?.motivation?.length)];
    }
    if (message?.includes('stress') || message?.includes('anxious') || message?.includes('overwhelm')) {
      return aiResponses?.stress?.[Math.floor(Math.random() * aiResponses?.stress?.length)];
    }
    if (message?.includes('productiv') || message?.includes('focus') || message?.includes('efficient')) {
      return aiResponses?.productivity?.[Math.floor(Math.random() * aiResponses?.productivity?.length)];
    }
    if (message?.includes('balance') || message?.includes('work-life') || message?.includes('time')) {
      return aiResponses?.balance?.[Math.floor(Math.random() * aiResponses?.balance?.length)];
    }

    // Mood-based responses
    if (mood) {
      switch (mood?.id) {
        case 'stressed':
          return "I can sense you're feeling stressed right now. Let's take this one step at a time. What's weighing most heavily on your mind?";
        case 'overwhelmed':
          return "Feeling overwhelmed is tough, but you're not alone. Let's break down what you're facing into smaller, manageable pieces. What's the most urgent thing on your plate?";
        case 'excited':
          return "I love your energy! When we're excited, it's the perfect time to channel that enthusiasm into meaningful action. What opportunity has you most excited right now?";
        case 'motivated':
          return "That motivation is powerful! Let's harness it effectively. What's one significant goal you'd like to make progress on while you're feeling this drive?";
        case 'sad':
          return "I'm here to support you through this difficult time. Sometimes talking about what's bothering us can help lighten the emotional load. What's been on your heart lately?";
        default:
          break;
      }
    }

    // General supportive responses
    const generalResponses = [
      "That\'s an interesting perspective. Tell me more about what you\'re thinking and feeling about this situation.",
      "I appreciate you sharing that with me. What aspect of this would you like to explore further?",
      "Thank you for being open with me. How do you think we could approach this challenge together?",
      "I can hear that this is important to you. What outcome are you hoping for in this situation?",
      "That sounds like something worth exploring. What\'s your biggest concern or hope related to this?"
    ];

    return generalResponses?.[Math.floor(Math.random() * generalResponses?.length)];
  };

  const handleSendMessage = async (messageText) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      content: messageText,
      isUser: true,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Get AI response using streaming for better UX
      let aiResponseContent = '';
      const streamingMessage = {
        id: Date.now() + 1,
        content: '',
        isUser: false,
        timestamp: Date.now(),
        mood: currentMood,
        isStreaming: true
      };

      // Add placeholder message for streaming
      setMessages(prev => [...prev, streamingMessage]);

      // Generate streaming response
      await aiCoachingService?.generateStreamingResponse(
        messageText,
        currentMood,
        messages,
        (chunk) => {
          aiResponseContent += chunk;
          setMessages(prev => prev?.map(msg => 
            msg?.id === streamingMessage?.id 
              ? { ...msg, content: aiResponseContent }
              : msg
          ));
        }
      );

      // Finalize the streaming message
      setMessages(prev => prev?.map(msg => 
        msg?.id === streamingMessage?.id 
          ? { ...msg, isStreaming: false }
          : msg
      ));

      // Generate new quick responses based on the conversation
      await generateQuickResponses(currentMood, [...messages, userMessage]);

    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback response
      const fallbackResponse = {
        id: Date.now() + 1,
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment. In the meantime, I'm here to listen and support you however I can.",
        isUser: false,
        timestamp: Date.now(),
        mood: currentMood
      };

      setMessages(prev => prev?.map(msg => 
        msg?.isStreaming ? fallbackResponse : msg
      ));
    } finally {
      setIsTyping(false);
    }
  };

  const handleMoodSelect = async (mood) => {
    setCurrentMood(mood);
    
    // Generate mood-based quick responses
    await generateQuickResponses(mood, messages);
    
    // Send mood update message
    const moodMessage = `I'm feeling ${mood?.label?.toLowerCase()} right now.`;
    handleSendMessage(moodMessage);
  };

  const handleQuickResponse = (responseText) => {
    handleSendMessage(responseText);
  };

  const handleClearChat = async () => {
    setMessages([]);
    setCurrentMood(null);
    
    // Re-add welcome message
    setTimeout(async () => {
      const welcomeMessage = {
        id: Date.now(),
        content: "Chat cleared! I'm here whenever you're ready to continue our conversation. How can I support you today?",
        isUser: false,
        timestamp: Date.now(),
        mood: { emoji: '🤖', label: 'Ready to help' }
      };
      setMessages([welcomeMessage]);
      
      // Reset quick responses
      await generateQuickResponses();
    }, 500);
  };

  const handleMessageComplete = (messageId) => {
    // Handle any post-message completion logic
    console.log('Message completed:', messageId);
  };

  return (
    <>
      <Helmet>
        <title>AI Life Coach - NexoraFlow</title>
        <meta name="description" content="Get personalized coaching and emotional support from our AI life coach powered by advanced AI. Build resilience, set goals, and unlock your potential." />
      </Helmet>
      <div className="min-h-screen bg-background pt-16 pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-screen flex flex-col"
        >
          {/* Chat Header */}
          <ChatHeader
            onClearChat={handleClearChat}
            messageCount={messages?.length}
            sessionDuration={sessionDuration}
            aiStatus={isTyping ? 'typing' : 'online'}
          />

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              <ChatContainer
                messages={messages}
                isTyping={isTyping}
                onMessageComplete={handleMessageComplete}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 border-l border-border bg-muted/30 p-4 space-y-4 overflow-y-auto">
              {/* Mood Selector */}
              <MoodSelector
                currentMood={currentMood}
                onMoodSelect={handleMoodSelect}
                isVisible={true}
              />

              {/* Quick Response Chips */}
              <QuickResponseChips
                onChipSelect={handleQuickResponse}
                currentMood={currentMood}
                isVisible={!isTyping}
                customResponses={quickResponses}
              />

              {/* Coaching Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <h3 className="text-sm font-semibold text-card-foreground mb-3">
                  💡 AI Coaching Tips
                </h3>
                <div className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <p>Share your current mood for personalized responses tailored to your emotional state</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                    <p>Be specific about challenges and goals - our AI provides better guidance with more context</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-1.5 flex-shrink-0" />
                    <p>Use suggested responses or ask follow-up questions to dive deeper into topics</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-warning rounded-full mt-1.5 flex-shrink-0" />
                    <p>Your conversations are powered by advanced AI for intelligent, empathetic responses</p>
                  </div>
                </div>
              </motion.div>

              {/* Session Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl p-4"
              >
                <h3 className="text-sm font-semibold text-card-foreground mb-3">
                  📊 Session Info
                </h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Messages:</span>
                    <span className="text-card-foreground font-medium">{messages?.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="text-card-foreground font-medium">
                      {Math.floor(sessionDuration / 60)}m {sessionDuration % 60}s
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Status:</span>
                    <span className={`font-medium ${isTyping ? 'text-warning' : 'text-success'}`}>
                      {isTyping ? 'Thinking...' : 'Ready'}
                    </span>
                  </div>
                  {currentMood && (
                    <div className="flex justify-between">
                      <span>Current Mood:</span>
                      <span className="text-card-foreground font-medium">
                        {currentMood?.emoji} {currentMood?.label}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-border bg-background p-4">
            <div className="max-w-4xl mx-auto">
              <MessageInput
                onSendMessage={handleSendMessage}
                isDisabled={isTyping}
                placeholder={currentMood 
                  ? `Share what's on your mind... (feeling ${currentMood?.label?.toLowerCase()})`
                  : "Share what's on your mind..."
                }
                maxLength={1000}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AICoachingChat;