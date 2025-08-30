const authService = require("../services/auth.service")
const emailService = require("../services/email.service")
const ApiError = require("../utils/ApiError")

const register = async (req, res, next) => {
    try {
        const result = await authService.registration(req.body)
        await emailService.sendVerificationEmail(result.user.email,result.emailVerifyToken)
        return res.status(201).json({success:true,message:"User Registered successfully. Please check your email for verify your account."})
    } catch (error) {
        return next(error)
    }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(ApiError(400,"Email and password are required"))
        }
        const result = await authService.login(req.body)
        console.log(result)
        res.cookie('token', result.token, {
            expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000),
            httpOnly: true,
        })
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: result.user,
                token:result.token
            }
        })
    } catch (error) {
        return next(error)
    }
}
const logout = async (req,res,next) => {
    try {
        
        res.clearCookie('token')
        return res.status(200).json({
            success: true,
            message:"Logged out successfully"
        })
    } catch (error) {
        return next(error)
    }
}
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return next(ApiError(400,"Email is required"))
        }
        const result = await authService.forgotPassword(email)
        await emailService.sendPasswordResetEmail(result.user.email, result.resetToken)
        return res.status(200).json({success:true,message:"Email sent successfully"})

    } catch (error) {
        return next(error)
    }
}
const resetPassword = async (req, res, next) => {
    try {
        const token = req.params.token;
        const { password } = req.body;
        if (!token) {
            return next(ApiError(400,"Reset token is required."))
        }
        if (!password || password.length <= 0 || password === '') {
            return next(ApiError(400,"Password is required"))
        }
        const result = await authService.resetPasswordVerification(token,password)
    } catch (error) {
        
    }
}
const verifyEmail = async (req, res, next) => {
    try {
        const token = req.params.token;
        if (!token) {
            return next(ApiError(400,"Verification token is required."))
        }
       const result = await authService.emailVerification(token)
          res.json({
    success: true,
    message: 'Email verified successfully',
  });
    } catch (error) {
        return next(error)
        
    }
}
const resendVerification = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            return next(ApiError(400,"Email is required"))
        }
        const result = await authService.resendEmailVerification(email);
        await emailService.sendVerificationEmail(result.email, result.emailVerifyToken);
        return res.status(200).json({
            success: true,
            message:"Verification email sent successfully. Please check your email"
        })
    } catch (error) {
        return next(error)
    }
}
module.exports = {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification
}