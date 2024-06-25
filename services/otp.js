// otp.js

// Function to generate a random OTP
function generateOTP() {
    // Implement your OTP generation logic here
    // This is a simple example generating a 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = { generateOTP };
