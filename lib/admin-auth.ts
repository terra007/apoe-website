import crypto from "crypto";
import { ADMIN_COOKIE_NAME } from "./admin-constants";

const SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-secret-change-in-production";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function createSessionToken(): string {
  return crypto.createHmac("sha256", SECRET).update("apo:admin:authenticated").digest("hex");
}

export function verifySessionToken(token: string): boolean {
  const expected = createSessionToken();
  try {
    return crypto.timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export function verifyPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(input), Buffer.from(password));
  } catch {
    return false;
  }
}

export function sessionCookieHeader(token: string): string {
  return `${ADMIN_COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict; Max-Age=${COOKIE_MAX_AGE}; Path=/`;
}

export function clearSessionCookieHeader(): string {
  return `${ADMIN_COOKIE_NAME}=; HttpOnly; SameSite=Strict; Max-Age=0; Path=/`;
}

export { ADMIN_COOKIE_NAME as COOKIE_NAME };
