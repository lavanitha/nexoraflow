import openai from './openaiClient';

/**
 * AI Coaching Service - Provides personalized coaching responses using OpenAI GPT-5
 */
class AICoachingService {
  constructor() {
    this.conversationHistory = [];
  }

  /**
   * Get system prompt based on user mood and context
   */
  getSystemPrompt(mood = null, sessionContext = {}) {
    const basePrompt = `You are an empathetic, professional AI life coach specializing in personal development, emotional intelligence, and goal achievement. Your approach is supportive, practical, and action-oriented.

Core Coaching Principles:
- Be warm, empathetic, and non-judgmental
- Ask thoughtful questions to help users self-reflect
- Provide actionable advice and practical strategies
- Focus on strengths-based coaching and positive psychology
- Help users break down complex challenges into manageable steps
- Encourage self-awareness and personal accountability

Communication Style:
- Use active listening techniques in your responses
- Be encouraging while remaining realistic
- Offer specific examples and actionable suggestions
- Ask follow-up questions to deepen the conversation
- Validate emotions while guiding toward solutions

Areas of Expertise:
- Goal setting and achievement (SMART goals, action planning)
- Stress management and emotional regulation
- Work-life balance and productivity optimization
- Building confidence and self-esteem
- Relationship and communication skills
- Career development and transitions
- Habit formation and behavior change
- Mindfulness and resilience building`;

    // Add mood-specific context
    if (mood) {
      const moodPrompts = {
        stressed: "The user is feeling stressed. Focus on immediate stress relief techniques, breathing exercises, and breaking down overwhelming situations into manageable parts.",
        overwhelmed: "The user feels overwhelmed. Help them prioritize tasks, set boundaries, and create structure. Offer grounding techniques and perspective-taking strategies.",
        excited: "The user is feeling excited and energetic. Channel this positive energy into goal-setting, action planning, and momentum-building activities.",
        motivated: "The user is feeling motivated. Help them harness this motivation effectively by setting clear objectives and creating sustainable action plans.",
        sad: "The user is feeling sad. Be extra compassionate, validate their feelings, and gently guide them toward self-care practices and positive coping strategies.",
        anxious: "The user is feeling anxious. Provide calming techniques, help them identify specific worries, and offer practical anxiety management strategies.",
        confident: "The user is feeling confident. Help them leverage this confidence to tackle challenges, set ambitious goals, or support others.",
        frustrated: "The user is feeling frustrated. Help them identify the source of frustration and develop problem-solving strategies or acceptance techniques."
      };

      if (moodPrompts?.[mood?.id]) {
        return `${basePrompt}\n\nCurrent Session Context: ${moodPrompts?.[mood?.id]}`;
      }
    }

    return basePrompt;
  }

  /**
   * Generate coaching response using OpenAI GPT-5
   */
  async generateCoachingResponse(userMessage, mood = null, conversationContext = []) {
    try {
      const systemPrompt = this.getSystemPrompt(mood);
      
      // Build conversation history
      const messages = [
        { role: 'system', content: systemPrompt }
      ];

      // Add previous conversation context (last 6 messages for context)
      const recentContext = conversationContext?.slice(-6);
      recentContext?.forEach(msg => {
        messages?.push({
          role: msg?.isUser ? 'user' : 'assistant',
          content: msg?.content
        });
      });

      // Add current user message
      messages?.push({ role: 'user', content: userMessage });

      const response = await openai?.chat?.completions?.create({
        model: 'gpt-5-mini', // Cost-effective for coaching conversations
        messages: messages,
        reasoning_effort: 'medium', // Good balance for thoughtful coaching responses
        verbosity: 'medium', // Appropriate detail level for coaching
        max_completion_tokens: 500 // Keep responses concise but comprehensive
      });

      return response?.choices?.[0]?.message?.content;
    } catch (error) {
      console.error('Error generating coaching response:', error);
      
      // Fallback to contextual responses if API fails
      return this.getFallbackResponse(userMessage, mood);
    }
  }

  /**
   * Generate streaming coaching response for real-time interaction
   */
  async generateStreamingResponse(userMessage, mood = null, conversationContext = [], onChunk) {
    try {
      const systemPrompt = this.getSystemPrompt(mood);
      
      const messages = [
        { role: 'system', content: systemPrompt }
      ];

      // Add conversation context
      const recentContext = conversationContext?.slice(-6);
      recentContext?.forEach(msg => {
        messages?.push({
          role: msg?.isUser ? 'user' : 'assistant',
          content: msg?.content
        });
      });

      messages?.push({ role: 'user', content: userMessage });

      const stream = await openai?.chat?.completions?.create({
        model: 'gpt-5-mini',
        messages: messages,
        stream: true,
        reasoning_effort: 'minimal', // Faster for streaming
        verbosity: 'medium',
        max_completion_tokens: 500
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        const content = chunk?.choices?.[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          onChunk(content);
        }
      }

      return fullResponse;
    } catch (error) {
      console.error('Error in streaming coaching response:', error);
      const fallbackResponse = this.getFallbackResponse(userMessage, mood);
      onChunk(fallbackResponse);
      return fallbackResponse;
    }
  }

  /**
   * Generate personalized quick response suggestions
   */
  async generateQuickResponses(mood = null, conversationContext = []) {
    try {
      const moodContext = mood ? `The user is currently feeling ${mood?.label?.toLowerCase()}.` : '';
      const prompt = `Based on the user's current emotional state and conversation context, suggest 4 brief, relevant follow-up questions or conversation starters that would be helpful for a life coaching session. ${moodContext}

Make them:
- Concise (5-8 words each)
- Thought-provoking
- Action-oriented
- Emotionally supportive

Format as a simple array of strings.`;

      const messages = [
        { role: 'system', content: 'You are a helpful assistant that generates coaching conversation starters.' },
        { role: 'user', content: prompt }
      ];

      const response = await openai?.chat?.completions?.create({
        model: 'gpt-5-nano', // Fast model for simple tasks
        messages: messages,
        reasoning_effort: 'minimal',
        verbosity: 'low',
        max_completion_tokens: 200,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'quick_responses',
            schema: {
              type: 'object',
              properties: {
                responses: {
                  type: 'array',
                  items: { type: 'string' },
                  minItems: 4,
                  maxItems: 4
                }
              },
              required: ['responses'],
              additionalProperties: false,
            },
          },
        },
      });

      const parsed = JSON.parse(response?.choices?.[0]?.message?.content);
      return parsed?.responses;
    } catch (error) {
      console.error('Error generating quick responses:', error);
      return this.getDefaultQuickResponses(mood);
    }
  }

  /**
   * Fallback responses when API is unavailable
   */
  getFallbackResponse(userMessage, mood) {
    const message = userMessage?.toLowerCase() || '';
    
    // Context-aware fallback responses
    if (message?.includes('goal') || message?.includes('target') || message?.includes('achieve')) {
      return "Goal setting is powerful! Let's break down your objective into specific, measurable steps. What's the main outcome you're hoping to achieve, and what's your timeline?";
    }
    
    if (message?.includes('stress') || message?.includes('anxious') || message?.includes('overwhelm')) {
      return "I understand you're feeling overwhelmed right now. Let's take this one step at a time. Can you tell me what's weighing most heavily on your mind? Sometimes just naming our stressors can help reduce their power.";
    }
    
    if (message?.includes('motivat') || message?.includes('inspire') || message?.includes('energy')) {
      return "I love your energy and motivation! This is the perfect time to channel that drive into meaningful action. What's one significant goal or project you'd like to make progress on?";
    }

    // Mood-based fallback responses
    if (mood) {
      const moodResponses = {
        stressed: "I can sense you're feeling stressed. Let's work together to identify what's causing this stress and develop some strategies to manage it. What's been your biggest stressor lately?",
        overwhelmed: "Feeling overwhelmed is tough, but you're not alone in this. Let's break down what you're facing into smaller, more manageable pieces. What feels most urgent right now?",
        excited: "Your excitement is wonderful to see! When we're feeling this positive energy, it's a great time to set new goals or take action on something important. What's got you most excited?",
        motivated: "That motivation is powerful! Let's harness it effectively. What's one meaningful goal you'd like to work toward while you're feeling this drive?",
        sad: "I'm here to support you through this difficult time. Your feelings are valid, and it's okay to not be okay sometimes. What's been on your heart lately?"
      };

      if (moodResponses?.[mood?.id]) {
        return moodResponses?.[mood?.id];
      }
    }

    // General supportive response
    return "Thank you for sharing that with me. I'm here to support you on your personal growth journey. What aspect of this would you like to explore further together?";
  }

  /**
   * Default quick responses when API is unavailable
   */
  getDefaultQuickResponses(mood) {
    if (mood) {
      const moodResponses = {
        stressed: [
          "What\'s my biggest stressor?",
          "How can I manage this better?",
          "What would help me feel calmer?",
          "Can we break this down?"
        ],
        excited: [
          "How can I use this energy?",
          "What goal should I tackle?",
          "Where should I focus first?",
          "What\'s my next step?"
        ],
        overwhelmed: [
          "What\'s most important right now?",
          "How can I prioritize better?",
          "What can I let go of?",
          "Where do I start?"
        ]
      };

      if (moodResponses?.[mood?.id]) {
        return moodResponses?.[mood?.id];
      }
    }

    return [
      "What's my main goal?",
      "How can I improve this?",
      "What should I focus on?",
      "What's holding me back?"
    ];
  }

  /**
   * Analyze user input for coaching insights
   */
  async analyzeUserInput(userMessage) {
    try {
      const response = await openai?.chat?.completions?.create({
        model: 'gpt-5-nano',
        messages: [
          {
            role: 'system',
            content: 'Analyze this user message for coaching insights. Identify the main themes, emotional state, and potential coaching opportunities.'
          },
          { role: 'user', content: userMessage }
        ],
        reasoning_effort: 'minimal',
        verbosity: 'low',
        max_completion_tokens: 200,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'input_analysis',
            schema: {
              type: 'object',
              properties: {
                themes: { type: 'array', items: { type: 'string' } },
                emotional_state: { type: 'string' },
                coaching_opportunities: { type: 'array', items: { type: 'string' } },
                urgency_level: { type: 'string', enum: ['low', 'medium', 'high'] }
              },
              required: ['themes', 'emotional_state', 'coaching_opportunities', 'urgency_level'],
              additionalProperties: false,
            },
          },
        },
      });

      return JSON.parse(response?.choices?.[0]?.message?.content);
    } catch (error) {
      console.error('Error analyzing user input:', error);
      return {
        themes: ['general'],
        emotional_state: 'neutral',
        coaching_opportunities: ['active listening', 'goal clarification'],
        urgency_level: 'medium'
      };
    }
  }
}

// Export singleton instance
export default new AICoachingService();