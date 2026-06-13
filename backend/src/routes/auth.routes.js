import express from "express";
import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import { userRegisterSchema, userLoginSchema } from "../validations/auth.validation.js";
import protect from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post("/register", validate(userRegisterSchema),  registerUser)
router.post("/login", validate(userLoginSchema),  loginUser)
router.post("/logout", protect, logoutUser)
router.get("/profile", protect, getProfile)

export default router;