import { createAuthClient } from "better-auth/react";

export const adminAuthClient = createAuthClient({
  baseURL: (process.env.SERVER_URL ?? "http://localhost:8080") + "/api/auth/admins",
  withCredentials: true,
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  requestPasswordReset,
  resetPassword,
} = adminAuthClient;
