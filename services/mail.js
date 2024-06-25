const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../models/Student');

async function sendMail({ email, OTP }) {
    try {
        console.log('email',email);
        let transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 465,
            secure:true,
            auth: {
                user: 'djdeepanshujindal2002@gmail.com',
                pass: 'dnmldwmdnoalsdsd' // Use app password if two-factor authentication is enabled
            }
        });

        let mailOptions = {
            from: 'CampusConnect <djdeepanshujindal2002@gmail.com>',
            to: `${email}`,
            subject: 'Welcome to CampusConnect',
            text: `Your OTP is: ${OTP}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
}

module.exports = { sendMail };
