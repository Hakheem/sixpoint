'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthLayout from '@/app/_components/auth/AuthLayout';
import LoginForm from '@/app/_components/auth/LoginForm';
import RegisterForm from '@/app/_components/auth/RegisterForm';
import ForgotPasswordForm from '@/app/_components/auth/ForgotPasswordForm';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { signIn, signUp } from '@/lib/auth-client';
import { requestPasswordReset } from '@/lib/auth-client';

type AuthView = 'login' | 'register' | 'forgot-password';

export default function UserLoginPage() {
  const [view, setView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getTitle = () => {
    switch (view) {
      case 'login':
        return 'Welcome back';
      case 'register':
        return 'Join us';
      case 'forgot-password':
        return 'Reset Password';
      default:
        return 'Welcome';
    }
  };

  const getSubtitle = () => {
    switch (view) {
      case 'login':
        return 'Sign in to book your stay at Sixpoint Victoria';
      case 'register':
        return 'Create your guest account';
      case 'forgot-password':
        return "We'll help you get back in";
      default:
        return '';
    }
  };

  const handleLogin = async (formData: any) => {
    setIsLoading(true);
    try {
      console.log('Attempting login with:', formData.email);
      
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      console.log('Login result:', result);

      if (result.error) {
        toast.error("Login Failed", {
          description: result.error.message || "Invalid email or password",
        });
      } else {
        toast.success("Welcome back!", {
          description: "You've successfully logged in.",
        });
        router.push('/');
        router.refresh();
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error("Error", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData: any) => {
    setIsLoading(true);
    try {
      console.log('Attempting registration with:', formData.email);
      
      const result = await signUp.email({
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });

      console.log('Registration result:', result);

      if (result.error) {
        toast.error("Registration Failed", {
          description: result.error.message || "Could not create account",
        });
      } else {
        toast.success("Account Created!", {
          description: "Welcome to Sixpoint Victoria. You're now logged in.",
        });
        router.push('/');
        router.refresh();
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error("Error", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      console.log('Requesting password reset for:', email);
      
      const result = await requestPasswordReset({ email });

      console.log('Password reset request result:', result);

      if (result.error) {
        toast.error("Error", {
          description: result.error.message || "Could not send reset email",
        });
      } else {
        toast.success("Email Sent", {
          description: "Check your inbox for password reset instructions.",
        });
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      toast.error("Error", {
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      console.log('Starting Google auth...');
      
      // For Better Auth v1.4.5, Google auth might need special handling
      // You might need to redirect to your backend's Google OAuth endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'}/api/auth/sign-in/google`;
      
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast.error("Error", {
        description: error.message || "Could not sign in with Google",
      });
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title={getTitle()} subtitle={getSubtitle()}>
      <AnimatePresence mode="wait">
        {view === 'login' && (
          <LoginForm
            key="login"
            onSwitchToRegister={() => setView('register')}
            onSwitchToForgotPassword={() => setView('forgot-password')}
            onLogin={handleLogin}
            onGoogleAuth={handleGoogleAuth}
            isLoading={isLoading}
          />
        )}
        {view === 'register' && (
          <RegisterForm
            key="register"
            onSwitchToLogin={() => setView('login')}
            onRegister={handleRegister}
            onGoogleAuth={handleGoogleAuth}
            isLoading={isLoading}
          />
        )}
        {view === 'forgot-password' && (
          <ForgotPasswordForm
            key="forgot-password"
            onSwitchToLogin={() => setView('login')}
            onSubmit={handleForgotPassword}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

