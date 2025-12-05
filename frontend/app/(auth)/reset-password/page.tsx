// app/reset-password/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/app/_components/auth/AuthLayout';
import { toast } from "sonner";
import { resetPasswordWithToken } from '@/lib/auth-client'; // Updated import

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
      toast.error("Invalid Link", {
        description: "This password reset link is invalid or has expired.",
      });
    } else {
      setIsValidToken(true);
      // Optional: You could validate the token by making an API call here
      console.log('Reset token received:', token);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid Link", {
        description: "This password reset link is invalid or has expired.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords Don't Match", {
        description: "Please make sure both passwords are identical.",
      });
      return;
    }

    if (password.length < 8) {
      toast.error("Password Too Short", {
        description: "Password must be at least 8 characters long.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await resetPasswordWithToken({
        token: token,
        newPassword: password,
      });

      if (result.error) {
        toast.error("Reset Failed", {
          description: result.error.message || "Could not reset password",
        });
      } else {
        setIsSuccess(true);
        toast.success("Password Reset!", {
          description: "Your password has been successfully reset.",
        });
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/user/login');
        }, 3000);
      }
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show invalid token state
  if (isValidToken === false) {
    return (
      <AuthLayout 
        title="Invalid Link" 
        subtitle="This password reset link is invalid or has expired."
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-6"
        >
          <div className="w-16 h-16 bg-red-100 flex items-center justify-center mx-auto rounded-full">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              Link Expired
            </h3>
            <p className="text-gray-600">
              This password reset link is no longer valid.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Please request a new password reset link from the login page.
            </p>
            <Button
              onClick={() => router.push('/user/login')}
              className="hover:bg-[#FFD700]/80"
            >
              Go to Login
            </Button>
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  // Show success state
  if (isSuccess) {
    return (
      <AuthLayout 
        title="Password Reset" 
        subtitle="Your password has been reset successfully."
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-6"
        >
          <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto rounded-full">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              Password Updated!
            </h3>
            <p className="text-gray-600">
              You can now log in with your new password.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Redirecting to login page in a few seconds...
            </p>
            <Button
              onClick={() => router.push('/user/login')}
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
            >
              Go to Login Now
            </Button>
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  // Show reset password form
  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your new password"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-0.5">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-medium">Password Requirements:</p>
              <ul className="mt-1 list-disc list-inside space-y-1">
                <li>At least 8 characters long</li>
                <li>Use a combination of letters, numbers, and symbols for better security</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="pl-10 pr-10 h-11 rounded-none"
                required
                disabled={isLoading}
                minLength={8}
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
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {password.length}/8 characters
              </span>
              {password.length >= 8 && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Minimum length met
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="pl-10 pr-10 h-11 rounded-none"
                required
                disabled={isLoading}
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <XCircle className="w-3 h-3" />
                Passwords do not match
              </p>
            )}
            {confirmPassword && password === confirmPassword && password.length >= 8 && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Passwords match
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || !token || password.length < 8 || password !== confirmPassword}
            className="w-full h-11 hover:bg-[#FFD700]/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Resetting Password...
              </span>
            ) : (
              'Reset Password'
            )}
          </Button>
        </form>

        <div className="text-center pt-4">
          <Button
            type="button"
            variant="link"
            onClick={() => router.push('/user/login')}
            className="text-amber-600 hover:text-amber-700"
            disabled={isLoading}
          >
            Back to Login
          </Button>
        </div>
      </motion.div>
    </AuthLayout>
  );
}

