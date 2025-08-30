const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        index: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
            ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, "Password must be at least 6 characters"],
        select:false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default:'user'
    },
    isActive: {
        type: Boolean,
        default:true
    },
    emailVerified: {
        type: Boolean,
        default:false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerifyToken: String,
    emailVerifyExpire:Date
}, { timestamps: true })
userSchema.index({ emailVerifyToken: 1 })
userSchema.index({ resetPasswordToken: 1 })


userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 12)
    next();
})


userSchema.methods.comparePassword = async function (plainText) {
    return await bcrypt.compare(plainText,this.password)
}


userSchema.methods.getEmailVerificationCode = async function () {
    const verifyToken = crypto.randomBytes(20).toString('hex');
    this.emailVerifyToken = crypto.createHash('sha256').update(verifyToken).digest('hex')
    this.emailVerifyExpire = Date.now() + 24 * 60 * 60 * 1000;
    return verifyToken;
}

userSchema.methods.getResetPasswordToken = async function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
module.exports = mongoose.model('User', userSchema);
