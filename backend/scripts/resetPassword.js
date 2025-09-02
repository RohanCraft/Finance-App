// backend/scripts/resetPassword.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Read email and new password from command-line arguments
const args = process.argv.slice(2); // skip node and script name
const userEmail = args[0];
const newPassword = args[1];

if (!userEmail || !newPassword) {
  console.log(
    "❌ Usage: node resetPassword.js user@example.com NewPassword123"
  );
  process.exit(1);
}

// Function to reset password
const resetPassword = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (result.matchedCount === 0) {
      console.log(`⚠️ No user found with email: ${email}`);
    } else {
      console.log(`✅ Password reset successfully for ${email}`);
    }
  } catch (err) {
    console.error("❌ Error resetting password:", err);
  } finally {
    mongoose.disconnect();
  }
};

resetPassword(userEmail, newPassword);
