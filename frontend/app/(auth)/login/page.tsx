'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthLayout from '@/app/_components/auth/AuthLayout';
import LoginForm from '@/app/_components/auth/LoginForm';
import RegisterForm from '@/app/_components/auth/RegisterForm';
import ForgotPasswordForm from '@/app/_components/auth/ForgotPasswordForm';

type AuthView = 'login' | 'register' | 'forgot-password';

export default function UserLoginPage() {
  const [view, setView] = useState<AuthView>('login');

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

  // Better Auth handlers for USERS/GUESTS
  const handleLogin = async (formData: any) => {
    console.log('User login:', formData);
    // Better Auth USER login logic here
    // await signIn.email({ email: formData.email, password: formData.password })
  };

  const handleRegister = async (formData: any) => {
    console.log('User register:', formData);
    // Better Auth USER registration logic here
    // await signUp.email({ email, password, name })
  };

  const handleForgotPassword = async (email: string) => {
    console.log('User forgot password:', email);
    // Better Auth USER password reset logic here
  };

  const handleGoogleAuth = async () => {
    console.log('User Google auth');
    // Better Auth USER Google sign-in logic here
    // await signIn.social({ provider: 'google' })
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
          />
        )}
        {view === 'register' && (
          <RegisterForm
            key="register"
            onSwitchToLogin={() => setView('login')}
            onRegister={handleRegister}
            onGoogleAuth={handleGoogleAuth}
          />
        )}
        {view === 'forgot-password' && (
          <ForgotPasswordForm
            key="forgot-password"
            onSwitchToLogin={() => setView('login')}
            onSubmit={handleForgotPassword}
          />
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

