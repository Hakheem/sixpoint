'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onRegister?: (formData: any) => void;
  onGoogleAuth?: () => void;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSwitchToLogin,
  onRegister,
  onGoogleAuth,
  isLoading = false
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      alert('Please accept the Terms and Conditions');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    console.log('Register submitted:', formData);
    if (onRegister) {
      onRegister(formData);
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
    if (onGoogleAuth) {
      onGoogleAuth();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Google Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full h-11 text-[#333] hover:text-[#333]"
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {isLoading ? 'Signing up...' : 'Sign up with Google'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-4 bg-white text-gray-500">Or continue with email</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="pl-10 rounded-none"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className="pl-10 rounded-none"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a password"
              className="pl-10 pr-10 rounded-none"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              className="pl-10 rounded-none"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="pt-2">
          <div className="flex items-start gap-2">
            <Checkbox 
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
              disabled={isLoading}
            />
            <Label htmlFor="acceptTerms" className="text-sm text-gray-700 cursor-pointer">
              I agree to the{' '}
              <Button type="button" variant="link" className="text-amber-600 hover:text-amber-700 p-0 h-auto text-sm font-normal" disabled={isLoading}>
                Terms and Conditions
              </Button>{' '}
              and{' '}
              <Button type="button" variant="link" className="text-amber-600 hover:text-amber-700 p-0 h-auto text-sm font-normal" disabled={isLoading}>
                Privacy Policy
              </Button>
            </Label>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full h-11 hover:bg-[#FFD700]/80"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Button
            type="button"
            variant="link"
            onClick={onSwitchToLogin}
            className="text-amber-600 hover:text-amber-700 p-0 h-auto font-normal"
            disabled={isLoading}
          >
            Sign in
          </Button>
        </div>
      </div> 
    </motion.div>
  );
};

export default RegisterForm;

