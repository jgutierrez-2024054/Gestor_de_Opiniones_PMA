
import { Router } from "express";
import { createPost, getPosts, getPostById } from "../controllers/post.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post("/", validateJWT, createPost);
router.get("/", getPosts);
router.get("/:id", getPostById);

export default router;
