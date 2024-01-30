import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET;

export const createToken = (userId) => {
  return jwt.sign({ userId }, jwt_secret, { expiresIn: "1d" });
};
