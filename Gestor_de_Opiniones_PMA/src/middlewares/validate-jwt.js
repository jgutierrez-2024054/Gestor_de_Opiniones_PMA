
import jwt from "jsonwebtoken";

export const validateJWT = (req, res, next) => {
  let token = req.header("x-token");
  
  if (!token) {
    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }
  
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
