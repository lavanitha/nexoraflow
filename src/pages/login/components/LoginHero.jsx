import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LoginHero = () => {
  const floatingElements = [
    { icon: 'Trophy', delay: 0, x: 20, y: -10 },
    { icon: 'Target', delay: 0.5, x: -15, y: 15 },
    { icon: 'Zap', delay: 1, x: 25, y: 20 },
    { icon: 'Star', delay: 1.5, x: -20, y: -15 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative text-center space-y-6 py-8"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements?.map((element, index) => (
          <motion.div
            key={index}
            variants={floatingVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: element?.delay }}
            className="absolute"
            style={{
              left: `${50 + element?.x}%`,
              top: `${50 + element?.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element?.delay
              }}
              className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center"
            >
              <Icon name={element?.icon} size={16} className="text-primary/60" />
            </motion.div>
          </motion.div>
        ))}
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-elevation-2">
            <Icon name="Zap" size={40} color="white" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-bold text-foreground">NexoraFlow</h1>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">
            Unlock Your Potential
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Discover personalized side hustles, build emotional resilience, and achieve your goals through gamified productivity.
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center space-x-2 justify-center md:justify-start">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={16} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">AI Coaching</span>
          </div>
          <div className="flex items-center space-x-2 justify-center">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="TrendingUp" size={16} className="text-accent" />
            </div>
            <span className="text-sm font-medium text-foreground">Progress Tracking</span>
          </div>
          <div className="flex items-center space-x-2 justify-center md:justify-end">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={16} className="text-secondary" />
            </div>
            <span className="text-sm font-medium text-foreground">Achievements</span>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-xs text-muted-foreground">Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-xs text-muted-foreground">Opportunities</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                95%
              </div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginHero;