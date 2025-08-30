const nodemailer = require('nodemailer')
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

transporter.verify((error, success) => {
    if (error) {
        console.log("Nodemailer configuration error:",error)
    }
    else {
        console.log("Nodemailer is ready to send emails")
    }
})
module.exports=transporter