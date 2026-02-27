
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;

  const user = new User({ name, username, email });
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();
  res.json({ msg: "User registered" });
};

export const login = async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: login }, { username: login }]
  });

  if (!user) return res.status(400).json({ msg: "User not found" });

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(400).json({ msg: "Invalid password" });

  const token = generateJWT(user.id);
  res.json({ token });
};

export const profile = async (req, res) => {
  const user = await User.findById(req.uid).select("-password");
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const { name, username } = req.body;
  const user = await User.findByIdAndUpdate(
    req.uid,
    { name, username },
    { new: true }
  ).select("-password");
  res.json(user);
};
