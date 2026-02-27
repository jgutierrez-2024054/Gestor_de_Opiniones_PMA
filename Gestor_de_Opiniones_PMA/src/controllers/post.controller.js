
import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  const { title, category, content } = req.body;
  const post = new Post({ title, category, content, user: req.uid });
  await post.save();
  res.json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().populate("user", "name username").sort({ createdAt: -1 });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("user", "name username");
  if (!post) return res.status(404).json({ msg: "Post not found" });
  res.json(post);
};
