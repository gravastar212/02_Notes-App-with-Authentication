import express from "express";
import { signupValidation, loginValidation } from "../middleware/validate";
import { registerUser, loginUser } from "../controllers/authController";

const router = express.Router();

router.post("/signup", signupValidation, registerUser);
router.post("/login", loginValidation, loginUser);

export default router;