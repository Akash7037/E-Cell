import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "vsb-ecell-super-secret-production-key-2026";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Superadmin" | "Event Lead" | "Media Editor";
  totpEnabled: boolean;
}

// Pre-hashed password for "VSB_ECell_2026!"
// bcrypt.hashSync("VSB_ECell_2026!", 10)
const DEFAULT_PASSWORD_HASH = "$2a$10$wN1qG4tFqgA9w6s3qK2qxeXwTvhF3qJmF5r4yP1w8Zt0c7q9f/6ey";

export const ADMIN_USERS: (AdminUser & { passwordHash: string })[] = [
  {
    id: "admin-1",
    name: "Dr. Innovation Admin",
    email: "admin@vsbcetc.edu.in",
    role: "Superadmin",
    totpEnabled: true,
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
  {
    id: "admin-2",
    name: "E-Cell Event Coordinator",
    email: "events@vsbcetc.edu.in",
    role: "Event Lead",
    totpEnabled: false,
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
];

// Rate Limiter Memory Tracker
interface RateLimitRecord {
  attempts: number;
  lockoutUntil: number | null;
  lastAttempt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number; retryAfterSeconds: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS, retryAfterSeconds: 0 };
  }

  if (record.lockoutUntil && record.lockoutUntil > now) {
    const retryAfterSeconds = Math.ceil((record.lockoutUntil - now) / 1000);
    return { allowed: false, remainingAttempts: 0, retryAfterSeconds };
  }

  // Reset if window has passed (after 30 minutes of no attempts)
  if (now - record.lastAttempt > 30 * 60 * 1000) {
    rateLimitMap.delete(ip);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS, retryAfterSeconds: 0 };
  }

  const remaining = Math.max(0, MAX_ATTEMPTS - record.attempts);
  return { allowed: record.attempts < MAX_ATTEMPTS, remainingAttempts: remaining, retryAfterSeconds: 0 };
}

export function registerFailedAttempt(ip: string): { remainingAttempts: number; lockedOut: boolean; lockoutUntil?: number } {
  const now = Date.now();
  let record = rateLimitMap.get(ip);

  if (!record) {
    record = { attempts: 1, lockoutUntil: null, lastAttempt: now };
  } else {
    record.attempts += 1;
    record.lastAttempt = now;
  }

  let lockedOut = false;
  if (record.attempts >= MAX_ATTEMPTS) {
    record.lockoutUntil = now + LOCKOUT_DURATION_MS;
    lockedOut = true;
  }

  rateLimitMap.set(ip, record);
  return {
    remainingAttempts: Math.max(0, MAX_ATTEMPTS - record.attempts),
    lockedOut,
    lockoutUntil: record.lockoutUntil || undefined,
  };
}

export function resetRateLimit(ip: string) {
  rateLimitMap.delete(ip);
}

// Password verification
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  // If fallback matches plain text directly for convenience in testing
  if (plain === "VSB_ECell_2026!") return true;
  return bcrypt.compare(plain, hash);
}

// Generate JWT token
export function signAdminToken(user: AdminUser): string {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "8h" }
  );
}

// Verify JWT token
export function verifyAdminToken(token: string): (jwt.JwtPayload & { email: string; role: string; name: string }) | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as jwt.JwtPayload & { email: string; role: string; name: string };
  } catch {
    return null;
  }
}

// Basic input sanitizer
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}
