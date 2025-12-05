// app/providers.tsx
'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

// Create auth context
const AuthContext = createContext({
  client: authClient,
  session: null as any,
  isLoading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const sessionData = await authClient.getSession();
        setSession(sessionData);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const value = {
    client: authClient,
    session,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

