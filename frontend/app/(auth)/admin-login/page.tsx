'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginForm from '@/app/_components/auth/LoginForm';
import RegisterForm from '@/app/_components/auth/RegisterForm';
import ForgotPasswordForm from '@/app/_components/auth/ForgotPasswordForm';
import AuthLayout from '@/app/_components/auth/AuthLayout';
import {
  signUp,
  signIn,
  requestPasswordReset
} from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

type AuthView = 'login' | 'register' | 'forgot-password';

export default function AdminLoginPage() {
  const [view, setView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getTitle = () => {
    switch (view) {
      case 'login':
        return 'Admin Portal';
      case 'register':
        return 'Admin Registration';
      case 'forgot-password':
        return 'Reset Password';
      default:
        return 'Admin Access';
    }
  };

  const getSubtitle = () => {
    switch (view) {
      case 'login':
        return 'Sign in to manage Sixpoint Victoria';
      case 'register':
        return 'Create your admin account';
      case 'forgot-password':
        return "We'll help you get back in";
      default:
        return '';
    }
  };

  const handleAdminLogin = async (formData: any) => {
    setIsLoading(true);
    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      if (result.error) {
        toast.error("Admin Login Failed", {
          description: result.error.message || "Invalid admin credentials",
        });
      } else {
        toast.success("Welcome, Administrator", {
          description: "Successfully logged into admin portal.",
        });
        router.push('/admin/dashboard');
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

  const handleAdminRegister = async (formData: any) => {
    setIsLoading(true);
    try {
      // Optional: Add admin verification check here
      // You might want to verify admin registration codes or invite tokens

      const result = await signUp.email({
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });

      if (result.error) {
        toast.error("Registration Failed", {
          description: result.error.message || "Could not create admin account",
        });
      } else {
        toast.success("Admin Account Created", {
          description: "Welcome to the admin portal.",
        });
        router.push('/admin/dashboard');
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

  const handleAdminForgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      const result = await requestPasswordReset({
        email,
        redirectTo: `${window.location.origin}/admin-reset-password`,
      });

      if (result.error) {
        toast.error("Error", {
          description: result.error.message || "Could not send reset email",
        });
      } else {
        toast.success("Email Sent", {
          description: "Check your inbox for admin password reset instructions.",
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

  const handleAdminGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/admin/dashboard',
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
            onLogin={handleAdminLogin}
            onGoogleAuth={handleAdminGoogleAuth}
            isLoading={isLoading}
          />
        )}
        {view === 'register' && (
          <RegisterForm
            key="register"
            onSwitchToLogin={() => setView('login')}
            onRegister={handleAdminRegister}
            onGoogleAuth={handleAdminGoogleAuth}
            isLoading={isLoading}
          />
        )}
        {view === 'forgot-password' && (
          <ForgotPasswordForm
            key="forgot-password"
            onSwitchToLogin={() => setView('login')}
            onSubmit={handleAdminForgotPassword}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

