import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'Users',
      title: '10,000+ Users',
      description: 'Trusted by professionals worldwide'
    },
    {
      icon: 'Award',
      title: 'Certified Platform',
      description: 'Industry-standard security practices'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Marketing Manager',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'NexoraFlow transformed how I approach side hustles. The gamification keeps me motivated!'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Software Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'The AI coaching feature helped me discover opportunities I never considered before.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Trust Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trustFeatures?.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon name={feature?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{feature?.title}</h3>
            <p className="text-xs text-muted-foreground">{feature?.description}</p>
          </motion.div>
        ))}
      </div>
      {/* Security Badges */}
      <motion.div variants={itemVariants} className="flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs font-medium text-foreground">256-bit SSL</span>
        </div>
        <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-xs font-medium text-foreground">GDPR Compliant</span>
        </div>
      </motion.div>
      {/* Testimonials */}
      <div className="space-y-4">
        <motion.h3 variants={itemVariants} className="text-center text-sm font-semibold text-foreground">
          Trusted by professionals
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials?.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-muted/50 rounded-lg p-4 border border-border/50"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent">
                  <img
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-foreground">{testimonial?.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial?.role}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic">"{testimonial?.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Stats */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-lg font-bold text-primary">10K+</div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
          <div>
            <div className="text-lg font-bold text-accent">95%</div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-secondary">24/7</div>
            <div className="text-xs text-muted-foreground">Support</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrustSignals;