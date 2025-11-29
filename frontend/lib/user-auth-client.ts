import { createAuthClient } from "better-auth/react";

export const userAuthClient = createAuthClient({
  baseURL: (process.env.SERVER_URL ?? "http://localhost:8080") + "/api/auth/users",
  withCredentials: true,
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  requestPasswordReset,
  resetPassword,
} = userAuthClient;
