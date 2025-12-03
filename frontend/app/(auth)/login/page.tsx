'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthLayout from '@/app/_components/auth/AuthLayout';
import LoginForm from '@/app/_components/auth/LoginForm';
import RegisterForm from '@/app/_components/auth/RegisterForm';
import ForgotPasswordForm from '@/app/_components/auth/ForgotPasswordForm';
// import { signUp, signIn, requestPasswordReset } from '@/lib/user-auth-client';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

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
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

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
      const result = await signUp.email({
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });

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
      const result = await requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

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
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error: any) {
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

