
import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
  const { content, post } = req.body;
  const comment = new Comment({ content, post, user: req.uid });
  await comment.save();
  res.json(comment);
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  
  if (!comment) return res.status(404).json({ msg: "Comment not found" });
  
  if (comment.user.toString() !== req.uid) {
    return res.status(403).json({ msg: "Not authorized" });
  }
  
  await Comment.findByIdAndDelete(id);
  res.json({ msg: "Comment deleted" });
};
