import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import { handleErrors } from "../utils/routerUtils.js";
import Admin from "../models/Admin.js";
dotenv.config();

export const createAdmin = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }

    const { username, password } = req.body;

    const existingUsername = await Admin.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();

    res.status(201).json({ success: true, savedAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin)
      return res.status(400).json({ message: "Admin Does Not Exists" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);

    admin.password = "Incrypted";

    res
      .status(200)
      .json({ token, admin, success: true, message: "Logged In Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
