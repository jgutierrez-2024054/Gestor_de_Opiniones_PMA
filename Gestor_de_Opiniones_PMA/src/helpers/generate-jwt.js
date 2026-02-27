
import jwt from "jsonwebtoken";

export const generateJWT = (uid) => {
  return jwt.sign({ uid }, process.env.SECRETORPRIVATEKEY, { expiresIn: "4h" });
};
