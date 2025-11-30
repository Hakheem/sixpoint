'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginForm from '@/app/_components/auth/LoginForm';
import RegisterForm from '@/app/_components/auth/RegisterForm';
import ForgotPasswordForm from '@/app/_components/auth/ForgotPasswordForm';
import AuthLayout from '@/app/_components/auth/AuthLayout';

type AuthView = 'login' | 'register' | 'forgot-password';

export default function AdminLoginPage() {
  const [view, setView] = useState<AuthView>('login');

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

  // Better Auth handlers for ADMIN
  const handleAdminLogin = async (formData: any) => {
    console.log('Admin login:', formData);
    // Better Auth ADMIN login logic here
    // await signIn.email({ email: formData.email, password: formData.password, callbackURL: '/admin/dashboard' })
  };

  const handleAdminRegister = async (formData: any) => {
    console.log('Admin register:', formData);
    // Better Auth ADMIN registration logic here
    // You might want to add admin verification/approval logic
  };

  const handleAdminForgotPassword = async (email: string) => {
    console.log('Admin forgot password:', email);
    // Better Auth ADMIN password reset logic here
  };

  const handleAdminGoogleAuth = async () => {
    console.log('Admin Google auth');
    // Better Auth ADMIN Google sign-in logic here
    // await signIn.social({ provider: 'google', callbackURL: '/admin/dashboard' })
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
          />
        )}
        {view === 'register' && (
          <RegisterForm
            key="register"
            onSwitchToLogin={() => setView('login')}
            onRegister={handleAdminRegister}
            onGoogleAuth={handleAdminGoogleAuth}
          />
        )}
        {view === 'forgot-password' && (
          <ForgotPasswordForm
            key="forgot-password"
            onSwitchToLogin={() => setView('login')}
            onSubmit={handleAdminForgotPassword}
          />
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
