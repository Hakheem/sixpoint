import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "../../../lib/user-auth";

export const { POST, GET } = toNextJsHandler(auth);