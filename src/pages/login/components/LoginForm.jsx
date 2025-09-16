import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = ({ onLogin = () => {}, isLoading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = {
    email: 'demo@nexoraflow.com',
    password: 'Demo123!'
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    // Check mock credentials
    if (formData?.email !== mockCredentials?.email || formData?.password !== mockCredentials?.password) {
      setErrors({
        general: `Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}`
      });
      return;
    }
    
    const userData = {
      id: 1,
      name: 'John Doe',
      email: formData?.email,
      level: 5,
      points: 1250,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    };
    
    const token = 'mock-jwt-token-' + Date.now();
    onLogin(userData, token);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card rounded-2xl shadow-elevation-3 p-8 border border-border">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Zap" size={32} color="white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-card-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to continue your journey</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors?.general && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-error/10 border border-error/20 rounded-lg p-3 flex items-center space-x-2"
            >
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </motion.div>
          )}

          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              required
              className="mb-0"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants} className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              className="mb-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
            </button>
          </motion.div>

          {/* Remember Me & Forgot Password */}
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Forgot password?
            </button>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName="LogIn"
              iconPosition="right"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              Sign In
            </Button>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div variants={itemVariants} className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>
        </motion.div>

        {/* Social Login */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="default"
            iconName="Mail"
            iconPosition="left"
            className="flex-1"
          >
            Google
          </Button>
          <Button
            variant="outline"
            size="default"
            iconName="Github"
            iconPosition="left"
            className="flex-1"
          >
            GitHub
          </Button>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign up
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoginForm;