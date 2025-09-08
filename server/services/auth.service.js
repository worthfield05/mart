const userModels = require("../models/user.models");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

const authService = {
  registration: async (obj) => {
    const existingUser = await userModels.findOne({ email: obj.email });
    if (existingUser) {
      throw ApiError(409, "User already exists");
    }
    const newUser = new userModels(obj);
    const verifyToken = await newUser.getEmailVerificationCode();
    await newUser.save();
    return {
      user: newUser,
      emailVerifyToken: verifyToken,
    };
  },
  login: async (obj) => {
    const user = await userModels
      .findOne({ email: obj.email })
      .select("+password");
    console.log(user);
    console.log(obj.password);
    if (!user || !(await user.comparePassword(obj.password))) {
      throw ApiError(401, "Invalid email or password");
    }
    if (!user.isActive) {
      throw ApiError(401, "Account has been deactivated");
    }
    if (!user.emailVerified) {
      throw ApiError(401, "Please verify your email before logging in");
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    user.password = undefined;
    return { user, token };
  },
  forgotPassword: async (email) => {
    const user = await userModels.findOne({ email });
    if (!user) {
      throw ApiError(404, "User not found");
    }
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    return {
      user,
      resetToken,
    };
  },
  resetPasswordVerification: async (token, password) => {
    const user = await userModels.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      throw ApiError(400, "Invalid or expired token");
    }
    const hashedPassword = password;
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return user;
  },
  emailVerification: async (token) => {
    const user = await userModels.findOne({
      emailVerifyToken: token,
      emailVerifyExpire: { $gt: Date.now() },
    });
    if (!user) {
      throw ApiError(400, "Invalid or expired verification token");
    }
    if (user.emailVerified) {
      throw ApiError(400, "User already verified");
    }
    user.emailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpire = undefined;
    await user.save();
    const jwtToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );
    return { user, jwtToken };
  },
  resendEmailVerification: async (email) => {
    const user = await userModels.findOne({ email });
    if (!user) {
      throw ApiError(404, "User not found");
    }
    if (user.emailVerified) {
      throw ApiError(400, "Email is already verified");
    }
    const newToken = user.getEmailVerificationCode();
    await user.save({ validateBeforeSave: false });
    return {
      email: user.email,
      emailVerifyToken: newToken,
    };
  },
};
module.exports = authService;
