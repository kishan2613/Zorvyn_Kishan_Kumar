import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "viewer", // default role
    });

    res.status(201).json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (user.status === "inactive") {
      return res.status(403).json({ msg: "User is inactive" });
    } 

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password

    res.json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // update fields
    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();

    res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Prevent admin from deleting themselves (important 🔥)
    if (req.user.id === id) {
      return res.status(400).json({ msg: "You cannot delete yourself" });
    }

    await User.findByIdAndDelete(id);

    res.json({
      success: true,
      msg: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};