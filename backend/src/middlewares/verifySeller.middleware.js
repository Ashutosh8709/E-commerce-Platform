import { ApiError } from "../utils/ApiError.js";

export const verifySeller = (req, res, next) => {
  if (!req.user || req.user.role !== "seller") {
    throw new ApiError(403, "Only Sellers are allowed");
  }
  next();
};
