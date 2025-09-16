import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  onSubmit, 
  isLoading, 
  canProceed = true,
  isLastStep = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-center justify-between pt-8 border-t border-border"
    >
      {/* Previous Button */}
      <div className="flex-1">
        {currentStep > 1 && (
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isLoading}
            iconName="ChevronLeft"
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            Previous
          </Button>
        )}
      </div>
      {/* Step Indicator (Mobile) */}
      <div className="flex-1 text-center sm:hidden">
        <span className="text-sm text-muted-foreground">
          {currentStep} / {totalSteps}
        </span>
      </div>
      {/* Next/Submit Button */}
      <div className="flex-1 flex justify-end">
        {isLastStep ? (
          <Button
            onClick={onSubmit}
            disabled={!canProceed || isLoading}
            loading={isLoading}
            iconName="UserPlus"
            iconPosition="right"
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            {isLoading ? 'Creating Account...' : 'Complete Registration'}
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canProceed || isLoading}
            iconName="ChevronRight"
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            Next Step
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default NavigationControls;