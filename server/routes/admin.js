import express from "express";
import { createAdmin, login } from "../controllers/admin.js";
import { signInRules, signUpRules } from "../utils/routerUtils.js";

const router = express.Router();

router.post("/create", signUpRules, createAdmin);
router.post("/login", signInRules, login);

export default router;
