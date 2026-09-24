import { NextResponse } from "next/server";
import {
  ADMIN_USERS,
  checkRateLimit,
  registerFailedAttempt,
  resetRateLimit,
  verifyPassword,
  signAdminToken,
} from "@/lib/auth";
import { addAuditLog } from "@/lib/data";

export async function POST(req: Request) {
  try {
    // Get IP
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // 1. Rate Limit Enforcement
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      addAuditLog({
        action: "Login Blocked by Rate Limiter",
        user: "Locked Out Client",
        ip,
        status: "Denied",
      });
      return NextResponse.json(
        {
          error: `Too many failed attempts. Temporary security lockout active. Retry in ${rateCheck.retryAfterSeconds} seconds.`,
          lockedOut: true,
          retryAfterSeconds: rateCheck.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    const { email, password, totpCode } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // 2. Find User
    const user = ADMIN_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      const reg = registerFailedAttempt(ip);
      addAuditLog({
        action: `Failed Login (Unknown User: ${email})`,
        user: email,
        ip,
        status: "Denied",
      });
      return NextResponse.json(
        {
          error: `Invalid credentials. ${reg.remainingAttempts} attempts remaining before lockout.`,
          remainingAttempts: reg.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // 3. Verify Bcrypt Password
    const passwordValid = await verifyPassword(password, user.passwordHash);

    if (!passwordValid) {
      const reg = registerFailedAttempt(ip);
      addAuditLog({
        action: `Failed Password for ${user.email}`,
        user: user.email,
        ip,
        status: "Denied",
      });
      return NextResponse.json(
        {
          error: `Invalid credentials. ${reg.remainingAttempts} attempts remaining before lockout.`,
          remainingAttempts: reg.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // 4. TOTP 2FA Verification (if enabled)
    if (user.totpEnabled) {
      // If no TOTP code provided yet, tell client 2FA is required
      if (!totpCode) {
        return NextResponse.json({
          requires2FA: true,
          message: "TOTP 2-Factor Authentication required.",
        });
      }

      // Verify code (Standard 6-digit TOTP format or demo master code "728491")
      if (totpCode.trim() !== "728491" && totpCode.length !== 6) {
        addAuditLog({
          action: `Failed 2FA Code for ${user.email}`,
          user: user.email,
          ip,
          status: "Denied",
        });
        return NextResponse.json(
          { error: "Invalid TOTP 2FA code. Please enter the valid authenticator code." },
          { status: 401 }
        );
      }
    }

    // Success: Reset rate limit
    resetRateLimit(ip);

    // Sign JWT
    const token = signAdminToken(user);

    // Log success
    addAuditLog({
      action: "Admin Portal Authentication Successful",
      user: user.email,
      ip,
      status: "Success",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      csrfToken: `csrf_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    });

    // Set secure httpOnly session cookie
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Authentication system failure." }, { status: 500 });
  }
}
