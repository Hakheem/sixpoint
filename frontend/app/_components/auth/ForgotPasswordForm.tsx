'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
  onSubmit?: (email: string) => void;
  isLoading?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onSwitchToLogin,
  onSubmit,
  isLoading = false
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    if (onSubmit) {
      onSubmit(email);
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4 space-y-4"
      >
        <div className="w-14 h-14 bg-green-100 flex items-center justify-center mx-auto">
          <svg
            className="w-7 h-7 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Check your email</h2>
        <p className="text-gray-600 text-sm">
          We've sent a password reset link to <strong>{email}</strong>
        </p>
        <p className="text-xs text-gray-500">
          Didn't receive the email? Check your spam folder or try again.
        </p>
        <Button
          onClick={onSwitchToLogin}
          variant="link"
          className="text-amber-600 hover:text-amber-700 flex items-center gap-2 mx-auto"
          disabled={isLoading}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Forgot Password?</h2>
        <p className="text-gray-600 text-sm">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="pl-10 h-11 rounded-none"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-11 hover:bg-[#FFD700]/80"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>

        <Button
          onClick={onSwitchToLogin}
          type="button"
          variant="link" 
          className="w-full text-gray-600 hover:text-gray-700 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Button>
      </div>
    </motion.div> 
  );
};

export default ForgotPasswordForm;

