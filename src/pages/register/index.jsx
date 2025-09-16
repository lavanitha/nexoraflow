import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import PersonalDetailsStep from './components/PersonalDetailsStep';
import SkillsInterestsStep from './components/SkillsInterestsStep';
import VerificationStep from './components/VerificationStep';
import NavigationControls from './components/NavigationControls';
import SuccessAnimation from './components/SuccessAnimation';

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const totalSteps = 3;
  const stepLabels = ['Details', 'Skills', 'Verify'];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    skills: [],
    interests: [],
    verificationCode: '',
    agreeToTerms: false,
    subscribeToUpdates: false
  });

  // Mock credentials for testing
  const mockCredentials = {
    email: 'john.doe@example.com',
    password: 'SecurePass123!',
    verificationCode: '123456'
  };

  useEffect(() => {
    // Auto-fill mock data for demonstration
    if (process.env?.NODE_ENV === 'development') {
      setFormData(prev => ({
        ...prev,
        firstName: 'John',
        lastName: 'Doe',
        email: mockCredentials?.email,
        password: mockCredentials?.password,
        confirmPassword: mockCredentials?.password,
        phone: '+1 (555) 123-4567'
      }));
    }
  }, []);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors when user updates fields
    const updatedErrors = { ...errors };
    Object.keys(updates)?.forEach(key => {
      delete updatedErrors?.[key];
    });
    setErrors(updatedErrors);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData?.password) {
          newErrors.password = 'Password is required';
        } else if (formData?.password?.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData?.password !== formData?.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (formData?.phone && !/^\+?[\d\s\-\(\)]+$/?.test(formData?.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
        }
        break;

      case 2:
        if (formData?.skills?.length === 0) {
          newErrors.skills = 'Please select at least one skill';
        }
        if (formData?.interests?.length === 0) {
          newErrors.interests = 'Please select at least one interest';
        }
        break;

      case 3:
        if (!formData?.verificationCode || formData?.verificationCode?.length !== 6) {
          newErrors.verificationCode = 'Please enter the 6-digit verification code';
        } else if (formData?.verificationCode !== mockCredentials?.verificationCode) {
          newErrors.verificationCode = `Invalid code. Use ${mockCredentials?.verificationCode} for demo`;
        }
        if (!formData?.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      const userData = {
        id: Date.now(),
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        skills: formData?.skills,
        interests: formData?.interests,
        level: 1,
        points: 50,
        joinedAt: new Date()?.toISOString()
      };

      const authToken = 'mock-jwt-token-' + Date.now();

      setShowSuccess(true);

      // Call parent registration handler after success animation
      setTimeout(() => {
        if (onRegister) {
          onRegister(userData, authToken);
        } else {
          navigate('/dashboard');
        }
      }, 4000);

    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
    if (onRegister) {
      const userData = {
        id: Date.now(),
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        email: formData?.email,
        skills: formData?.skills,
        interests: formData?.interests,
        level: 1,
        points: 50,
        joinedAt: new Date()?.toISOString()
      };
      const authToken = 'mock-jwt-token-' + Date.now();
      onRegister(userData, authToken);
    } else {
      navigate('/dashboard');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsStep
            formData={formData}
            onUpdate={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <SkillsInterestsStep
            formData={formData}
            onUpdate={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <VerificationStep
            formData={formData}
            onUpdate={updateFormData}
            errors={errors}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData?.firstName && formData?.lastName && formData?.email && 
               formData?.password && formData?.confirmPassword;
      case 2:
        return formData?.skills?.length > 0 && formData?.interests?.length > 0;
      case 3:
        return formData?.verificationCode?.length === 6 && formData?.agreeToTerms;
      default:
        return false;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-foreground">NexoraFlow</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Already have an account?</span>
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Progress Indicator */}
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              stepLabels={stepLabels}
            />

            {/* Form Container */}
            <div className="bg-card border border-border rounded-lg shadow-elevation-2 p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderCurrentStep()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              {currentStep < 3 && (
                <NavigationControls
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  canProceed={canProceed()}
                  isLastStep={currentStep === totalSteps}
                />
              )}

              {/* Error Display */}
              {errors?.submit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-error/10 border border-error/20 rounded-lg flex items-center space-x-2"
                >
                  <Icon name="AlertCircle" size={16} className="text-error" />
                  <span className="text-error text-sm">{errors?.submit}</span>
                </motion.div>
              )}
            </div>

            {/* Demo Credentials Info */}
            {process.env?.NODE_ENV === 'development' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-muted border border-border rounded-lg"
              >
                <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Icon name="Info" size={16} className="text-primary" />
                  <span>Demo Credentials</span>
                </h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Email:</strong> {mockCredentials?.email}</p>
                  <p><strong>Password:</strong> {mockCredentials?.password}</p>
                  <p><strong>Verification Code:</strong> {mockCredentials?.verificationCode}</p>
                </div>
              </motion.div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border bg-background mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} NexoraFlow. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* Success Animation Overlay */}
      <SuccessAnimation
        isVisible={showSuccess}
        onComplete={handleSuccessComplete}
        userInfo={{ firstName: formData?.firstName }}
      />
    </>
  );
};

export default Register;