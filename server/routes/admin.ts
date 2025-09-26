import { RequestHandler } from "express";
import { ApiResponse } from "@shared/api";

// 简单的管理员账户 (实际项目中应该使用数据库和加密)
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "zdhjs2025", // 实际项目中应该使用加密密码
};

// 模拟JWT token (实际项目中应该使用真实的JWT)
const MOCK_TOKEN = "zdhjsuo_admin_token_2024";

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

// 管理员登录
export const adminLogin: RequestHandler = (req, res) => {
  try {
    const { username, password }: LoginRequest = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: "用户名和密码不能为空",
      });
    }

    // 验证凭据
    if (
      username !== ADMIN_CREDENTIALS.username ||
      password !== ADMIN_CREDENTIALS.password
    ) {
      return res.status(401).json({
        success: false,
        error: "用户名或密码错误",
      });
    }

    // 创建管理员用户信息
    const adminUser: AdminUser = {
      id: "admin_001",
      username: username,
      name: "系统管理员",
      role: "admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    };

    const response: ApiResponse<{
      user: AdminUser;
      token: string;
      expiresIn: number;
    }> = {
      success: true,
      data: {
        user: adminUser,
        token: MOCK_TOKEN,
        expiresIn: 24 * 60 * 60 * 1000, // 24小时
      },
      message: "登录成功",
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "登录失败",
    });
  }
};

// 验证token中间件
export const verifyAdminToken: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "未提供认证token",
      });
    }

    if (token !== MOCK_TOKEN) {
      return res.status(401).json({
        success: false,
        error: "无效的认证token",
      });
    }

    // 在实际项目中，这里应该解析JWT并设置用户信息
    (req as any).admin = {
      id: "admin_001",
      username: "admin",
      name: "系统管理员",
      role: "admin",
    };

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "token验证失败",
    });
  }
};

// 获取管理员信息
export const getAdminProfile: RequestHandler = (req, res) => {
  try {
    const admin = (req as any).admin;

    const response: ApiResponse<AdminUser> = {
      success: true,
      data: admin,
      message: "获取管理员信息成功",
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "获取管理员信息失败",
    });
  }
};

// 管理员退出登录
export const adminLogout: RequestHandler = (req, res) => {
  try {
    // 实际项目中应该将token加入黑名单
    const response: ApiResponse = {
      success: true,
      message: "退出登录成功",
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "退出登录失败",
    });
  }
};
