import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    throw new ApiError(403, "Forbidden: Admin access only");
  }
  next();
};
