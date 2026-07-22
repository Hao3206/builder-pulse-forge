import crypto from "node:crypto";
import { RequestHandler } from "express";
import { ApiResponse } from "@shared/api";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: string;
  avatar?: string;
}

function getRequiredSecret(name: "ADMIN_PASSWORD" | "ADMIN_TOKEN_SECRET") {
  const value = process.env[name];
  if (
    value &&
    (process.env.NODE_ENV !== "production" ||
      (value.length >= 12 && !value.startsWith("replace-with-")))
  ) {
    return value;
  }
  if (process.env.NODE_ENV !== "production") {
    return name === "ADMIN_PASSWORD"
      ? "change-me-in-env"
      : "development-only-token-secret";
  }
  throw new Error(`${name} is required in production`);
}

function safeEqual(left: string, right: string) {
  const leftHash = crypto.createHash("sha256").update(left).digest();
  const rightHash = crypto.createHash("sha256").update(right).digest();
  return crypto.timingSafeEqual(leftHash, rightHash);
}

function sign(value: string) {
  return crypto
    .createHmac("sha256", getRequiredSecret("ADMIN_TOKEN_SECRET"))
    .update(value)
    .digest("base64url");
}

export function createAdminToken(username: string, now = Date.now()) {
  const payload = Buffer.from(
    JSON.stringify({ username, exp: now + TOKEN_TTL_MS }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function validateAdminToken(token: string, now = Date.now()) {
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra || !safeEqual(signature, sign(payload)))
    return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      typeof data.username !== "string" ||
      typeof data.exp !== "number" ||
      data.exp <= now
    )
      return null;
    return data as { username: string; exp: number };
  } catch {
    return null;
  }
}

function getAdminUser(username: string): AdminUser {
  return {
    id: "admin_001",
    username,
    name: "系统管理员",
    role: "admin",
  };
}

export const adminLogin: RequestHandler = (req, res) => {
  try {
    const { username, password }: LoginRequest = req.body;
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username ||
      !password
    ) {
      return res
        .status(400)
        .json({ success: false, error: "用户名和密码不能为空" });
    }

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    if (
      !safeEqual(username, expectedUsername) ||
      !safeEqual(password, getRequiredSecret("ADMIN_PASSWORD"))
    ) {
      return res
        .status(401)
        .json({ success: false, error: "用户名或密码错误" });
    }

    const response: ApiResponse<{
      user: AdminUser;
      token: string;
      expiresIn: number;
    }> = {
      success: true,
      data: {
        user: getAdminUser(username),
        token: createAdminToken(username),
        expiresIn: TOKEN_TTL_MS,
      },
      message: "登录成功",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("管理员登录配置错误:", error);
    res.status(500).json({ success: false, error: "登录服务未正确配置" });
  }
};

export const verifyAdminToken: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "未提供认证token" });
  }

  const payload = validateAdminToken(authorization.slice(7));
  if (!payload)
    return res
      .status(401)
      .json({ success: false, error: "无效或已过期的认证token" });

  (req as any).admin = getAdminUser(payload.username);
  next();
};

export const getAdminProfile: RequestHandler = (req, res) => {
  res.json({
    success: true,
    data: (req as any).admin,
    message: "获取管理员信息成功",
  });
};

export const adminLogout: RequestHandler = (_req, res) => {
  res.json({ success: true, message: "退出登录成功" });
};
