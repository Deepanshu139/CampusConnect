// services/auth.js

const bcrypt = require('bcrypt');

// Define a function to validate passwords
async function validatePassword(password, hashedPassword) {
  try {
    // Compare the provided password with the hashed password stored in your database
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  } catch (error) {
    console.error("Error validating password:", error);
    return false;
  }
}

module.exports = { validatePassword };
