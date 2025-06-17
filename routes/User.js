import express from "express";
import Users from "../models/Users.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();
const SecretKey = process.env.JWTSECRET || "defaultSecret"; 

// SIGNUP
router.post("/signup", async (req, res) => {
  const { fullName, EmailAddress, Mobile, Password } = req.body;

  if (!fullName || !EmailAddress || !Mobile || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const isUser = await Users.findOne({ EmailAddress });
    if (isUser) {
      return res.status(409).json({ message: "User already exists with this email address" });
    }

    const newUser = await Users.create({
      fullName,
      EmailAddress,
      Mobile,
      Password, // Will be hashed automatically by pre-save hook
    });

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { EmailAddress, Password } = req.body;

  if (!EmailAddress || !Password) {
    return res.status(400).json({ message: "Email and Password required" });
  }

  try {
    const user = await Users.findOne({ EmailAddress });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = JWT.sign(
      { id: user._id, EmailAddress: user.EmailAddress,Name:user.fullName },
      SecretKey,
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// GET ALL USERS
router.get("/allUsers", async (req, res) => {
  try {
    const allusers = await Users.find().select("-Password"); // Exclude password
    res.status(200).json(allusers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

export default router;
