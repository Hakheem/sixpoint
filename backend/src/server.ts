import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { userAuth } from "./lib/user-auth";
import { adminAuth } from "./lib/admin-auth";

const app = express();

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// All user auth endpoints
app.all("/api/auth/users/*", toNodeHandler(userAuth));

// All admin auth endpoints
app.all("/api/auth/admins/*", toNodeHandler(adminAuth));

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
