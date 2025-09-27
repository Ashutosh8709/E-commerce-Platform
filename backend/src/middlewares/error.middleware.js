// errorMiddleware.js
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
	if (err instanceof ApiError) {
		return res.status(err.statusCode || 500).json({
			message: err.message, // <-- This is what frontend will read
			success: err.success,
			errors: err.errors || [],
		});
	}
	res.status(500).json({ message: "Internal Server Error" });
};
