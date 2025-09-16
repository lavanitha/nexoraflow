import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PersonalDetailsStep = ({ formData, onUpdate, errors }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const password = e?.target?.value;
    setPasswordStrength(calculatePasswordStrength(password));
    onUpdate({ password });
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-error';
    if (passwordStrength <= 50) return 'bg-warning';
    if (passwordStrength <= 75) return 'bg-accent';
    return 'bg-success';
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Icon name="User" size={32} color="white" strokeWidth={2} />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Personal Details</h2>
        <p className="text-muted-foreground">Let's start with your basic information</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData?.firstName || ''}
          onChange={(e) => onUpdate({ firstName: e?.target?.value })}
          error={errors?.firstName}
          required
          className="w-full"
        />

        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData?.lastName || ''}
          onChange={(e) => onUpdate({ lastName: e?.target?.value })}
          error={errors?.lastName}
          required
          className="w-full"
        />
      </div>
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData?.email || ''}
        onChange={(e) => onUpdate({ email: e?.target?.value })}
        error={errors?.email}
        description="We'll use this for account verification and updates"
        required
        className="w-full"
      />
      <div className="space-y-4">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData?.password || ''}
            onChange={handlePasswordChange}
            error={errors?.password}
            required
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 p-1 rounded-md hover:bg-muted transition-colors"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} className="text-muted-foreground" />
          </button>
        </div>

        {formData?.password && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Password Strength:</span>
              <span className={`font-medium ${
                passwordStrength <= 25 ? 'text-error' :
                passwordStrength <= 50 ? 'text-warning' :
                passwordStrength <= 75 ? 'text-accent' : 'text-success'
              }`}>
                {getStrengthText()}
              </span>
            </div>
            <div className="w-full h-2 bg-border rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${getStrengthColor()}`}
                initial={{ width: 0 }}
                animate={{ width: `${passwordStrength}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={formData?.confirmPassword || ''}
          onChange={(e) => onUpdate({ confirmPassword: e?.target?.value })}
          error={errors?.confirmPassword}
          required
          className="w-full pr-12"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 p-1 rounded-md hover:bg-muted transition-colors"
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} className="text-muted-foreground" />
        </button>
      </div>
      <Input
        label="Phone Number (Optional)"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={formData?.phone || ''}
        onChange={(e) => onUpdate({ phone: e?.target?.value })}
        error={errors?.phone}
        description="For account security and notifications"
        className="w-full"
      />
    </motion.div>
  );
};

export default PersonalDetailsStep;