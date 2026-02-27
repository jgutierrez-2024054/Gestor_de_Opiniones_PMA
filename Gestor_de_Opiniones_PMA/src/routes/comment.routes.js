
import { Router } from "express";
import { createComment, deleteComment } from "../controllers/comment.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post("/", validateJWT, createComment);
router.delete("/:id", validateJWT, deleteComment);

export default router;
