import { ApiError } from "../utils/ApiError.js";
import { asyncHandler, AsyncHandler } from "../utils/AsyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
	//fetch token from cookies
	//verify token
	// from verified token find user and set req.user to user and return
	try {
		const token = req.cookies?.accessToken;
		if (!token) {
			throw new ApiError(401, "Unauthorized Access");
		}
		const decodedToken = jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET
		);

		const user = await User.findById(decodedToken?._id).select(
			"-password -refreshToken"
		);

		if (!user) {
			throw new ApiError(401, "Invalid Access Token");
		}

		req.user = user;
		next();
	} catch (err) {
		throw new ApiError(401, err?.message || "Invalid Access Token");
	}
});
