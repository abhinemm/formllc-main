import jwt from "jsonwebtoken";

export const createJwtToken = (userId: number | string) => {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "2h", // token expires in 2 hours
  });
  return token;
};

export const verifyJwtToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return { valid: true, decoded };
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return {
        valid: false,
        message: "Session expired. Please request a new OTP.",
      };
    }
    return { valid: false, message: "Invalid or malformed token." };
  }
};
