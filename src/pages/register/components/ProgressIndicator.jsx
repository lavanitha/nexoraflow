import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, stepLabels }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="absolute -top-1 right-0 transform translate-x-1/2">
          <motion.div
            className="w-4 h-4 bg-primary rounded-full border-2 border-background shadow-elevation-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          />
        </div>
      </div>
      {/* Step Indicators */}
      <div className="flex justify-between items-center">
        {stepLabels?.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={index} className="flex flex-col items-center space-y-2">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-success border-success text-success-foreground'
                    : isCurrent
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'bg-background border-border text-muted-foreground'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
              >
                {isCompleted ? (
                  <Icon name="Check" size={16} strokeWidth={2.5} />
                ) : (
                  <span className="text-xs font-bold">{stepNumber}</span>
                )}
              </motion.div>
              <span className={`text-xs font-medium text-center max-w-16 ${
                isCurrent ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Progress Text */}
      <div className="text-center mt-4">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="text-xs text-muted-foreground mt-1">
          {Math.round(progressPercentage)}% Complete
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;