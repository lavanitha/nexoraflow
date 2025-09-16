import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const VerificationStep = ({ formData, onUpdate, errors, onSubmit, isLoading }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleCodeChange = (index, value) => {
    if (value?.length <= 1 && /^\d*$/?.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput?.focus();
      }
      
      // Update form data
      onUpdate({ verificationCode: newCode?.join('') });
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !verificationCode?.[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput?.focus();
    }
  };

  const handleResendCode = () => {
    setResendTimer(30);
    setCanResend(false);
    // Simulate resend API call
    console.log('Resending verification code to:', formData?.email);
  };

  const isCodeComplete = verificationCode?.every(digit => digit !== '');

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-16 h-16 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Icon name="Mail" size={32} color="white" strokeWidth={2} />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Verify Your Email</h2>
        <p className="text-muted-foreground">
          We've sent a verification code to
        </p>
        <p className="text-primary font-medium">{formData?.email}</p>
      </div>
      {/* Verification Code Input */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-4 text-center">
            Enter the 6-digit verification code
          </label>
          <div className="flex justify-center space-x-3">
            {verificationCode?.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(index, e?.target?.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-bold border-2 border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            ))}
          </div>
          {errors?.verificationCode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-error text-sm text-center mt-2 flex items-center justify-center space-x-2"
            >
              <Icon name="AlertCircle" size={16} />
              <span>{errors?.verificationCode}</span>
            </motion.div>
          )}
        </div>

        {/* Resend Code */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Didn't receive the code?
          </p>
          {canResend ? (
            <button
              onClick={handleResendCode}
              className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
            >
              Resend Code
            </button>
          ) : (
            <span className="text-muted-foreground text-sm">
              Resend in {resendTimer}s
            </span>
          )}
        </div>
      </div>
      {/* Terms and Privacy */}
      <div className="space-y-4">
        <Checkbox
          label={`I agree to the Terms of Service and Privacy Policy`}
          checked={formData?.agreeToTerms || false}
          onChange={(e) => onUpdate({ agreeToTerms: e?.target?.checked })}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="I would like to receive updates about new features and opportunities"
          checked={formData?.subscribeToUpdates || false}
          onChange={(e) => onUpdate({ subscribeToUpdates: e?.target?.checked })}
        />
      </div>
      {/* Security Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-muted rounded-lg p-4 space-y-3"
      >
        <h4 className="font-medium text-foreground flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Your Security Matters</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Lock" size={14} className="text-success" />
            <span className="text-muted-foreground">256-bit SSL encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={14} className="text-success" />
            <span className="text-muted-foreground">Privacy-first approach</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="UserCheck" size={14} className="text-success" />
            <span className="text-muted-foreground">Verified user community</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={14} className="text-success" />
            <span className="text-muted-foreground">Instant account activation</span>
          </div>
        </div>
      </motion.div>
      {/* Complete Registration Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={onSubmit}
          disabled={!isCodeComplete || !formData?.agreeToTerms || isLoading}
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
          fullWidth
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          {isLoading ? 'Creating Your Account...' : 'Complete Registration'}
        </Button>
      </motion.div>
      {/* Trust Indicators */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>10,000+ users</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={12} />
            <span>4.9/5 rating</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={12} />
            <span>Trusted platform</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationStep;