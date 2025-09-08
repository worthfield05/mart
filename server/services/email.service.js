const transporter = require("../configs/nodemailer.config");
const ApiError = require("../utils/ApiError");
const crypto = require("crypto");
const emailService = {
  sendVerificationEmail: async (receiverEmail, verificationToken) => {
    const token = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const mailOptions = {
      from: `"${process.env.GOOGLE_APP_USER}" <${process.env.GOOGLE_APP_USER}>`,
      to: receiverEmail,
      subject: "Verify Your Email Address",
      html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Email Verification</h2>
                    <p>Please click the button below to verify your email address:</p>
                    <a href="${verificationUrl}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 20px; 
                              text-decoration: none; border-radius: 4px; display: inline-block;">
                        Verify Email
                    </a>
                    <p>Or copy and paste this URL in your browser:</p>
                    <p>${verificationUrl}</p>
                    <p>This link will expire in 24 hours.</p>
                </div>
            `,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email sending error:", error);
      throw new ApiError(500, "Failed to send verification email");
    }
  },
  sendPasswordResetEmail: async (receiverEmail, token) => {
    const verifyToken = crypto.createHash("sha256").update(token).digest("hex");
    const verificationUrl = `${process.env.FRONTEND_URL}/reset-password?token=${verifyToken}`;
    try {
      const mailOptions = {
        from: `"${process.env.GOOGLE_APP_USER}" <${process.env.GOOGLE_APP_USER}>`,
        to: receiverEmail,
        subject: "Reset Your Password",
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Reset Password</h2>
                    <p>Please click the button below to reset your password:</p>
                    <a href="${verificationUrl}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 20px; 
                              text-decoration: none; border-radius: 4px; display: inline-block;">
                        Verify Email
                    </a>
                    <p>Or copy and paste this URL in your browser:</p>
                    <p>${verificationUrl}</p>
                    <p>This link will expire in 10 minutes.</p>
                </div>
            `,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Email sending error:", error);
      throw new ApiError(500, "Failed to send reset password");
    }
  },
};
module.exports = emailService;
