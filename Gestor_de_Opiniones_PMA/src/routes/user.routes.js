
import { Router } from "express";
import { register, login, profile, updateProfile } from "../controllers/user.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", validateJWT, profile);
router.put("/update", validateJWT, updateProfile);

export default router;
