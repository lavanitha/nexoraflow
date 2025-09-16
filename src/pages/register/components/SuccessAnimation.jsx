import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessAnimation = ({ isVisible, onComplete, userInfo }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiElements, setConfettiElements] = useState([]);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      
      // Generate confetti elements
      const colors = ['#007BFF', '#10B981', '#1E90FF', '#059669', '#D97706'];
      const newConfetti = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: colors?.[Math.floor(Math.random() * colors?.length)],
        left: Math.random() * 100,
        delay: Math.random() * 1000,
        size: Math.random() * 6 + 4,
        duration: Math.random() * 2000 + 2000
      }));
      
      setConfettiElements(newConfetti);
      
      // Auto-complete after animation
      const timer = setTimeout(() => {
        onComplete();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background z-300 flex items-center justify-center"
      >
        {/* Confetti Elements */}
        {showConfetti && confettiElements?.map(confetti => (
          <motion.div
            key={confetti?.id}
            className="absolute pointer-events-none"
            style={{
              left: `${confetti?.left}%`,
              top: '-10px',
              backgroundColor: confetti?.color,
              width: `${confetti?.size}px`,
              height: `${confetti?.size}px`,
              borderRadius: '50%'
            }}
            initial={{ y: -100, rotate: 0, opacity: 1 }}
            animate={{ 
              y: window.innerHeight + 100, 
              rotate: 360,
              opacity: 0
            }}
            transition={{
              duration: confetti?.duration / 1000,
              delay: confetti?.delay / 1000,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Success Content */}
        <div className="text-center space-y-8 max-w-md mx-auto px-4">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 200, 
              damping: 10 
            }}
            className="relative"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto relative">
              <Icon name="CheckCircle" size={48} color="white" strokeWidth={2} />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-success to-accent rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Welcome to NexoraFlow!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your account has been successfully created
            </p>
            {userInfo && (
              <p className="text-primary font-medium">
                Hello, {userInfo?.firstName}! 🎉
              </p>
            )}
          </motion.div>

          {/* Achievement Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center space-x-4"
          >
            <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-lg">
              <Icon name="User" size={20} color="white" />
            </div>
            <div className="bg-gradient-to-br from-accent to-success p-3 rounded-lg">
              <Icon name="Star" size={20} color="white" />
            </div>
            <div className="bg-gradient-to-br from-warning to-primary p-3 rounded-lg">
              <Icon name="Trophy" size={20} color="white" />
            </div>
          </motion.div>

          {/* Welcome Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-muted rounded-lg p-6 space-y-4"
          >
            <h3 className="font-semibold text-foreground">Your Journey Begins!</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">50</div>
                <div className="text-xs text-muted-foreground">Welcome Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">1</div>
                <div className="text-xs text-muted-foreground">Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">1</div>
                <div className="text-xs text-muted-foreground">Badge Earned</div>
              </div>
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <Button
              onClick={onComplete}
              iconName="ArrowRight"
              iconPosition="right"
              size="lg"
              fullWidth
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              Continue to Dashboard
            </Button>
          </motion.div>

          {/* Loading Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex justify-center space-x-2"
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessAnimation;