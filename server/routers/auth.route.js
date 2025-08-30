const { Router } = require("express");
const { login, register, forgotPassword, resetPassword, verifyEmail, resendVerification, logout } = require("../controllers/auth.controller");
const router = Router();
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(resetPassword)
router.route('/verify-email/:token').post(verifyEmail)
router.route('/resend-verification').post(resendVerification)
module.exports = {router}
