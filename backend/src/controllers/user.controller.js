import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
	// get user details from frontend
	// validation i have used as joi middleware
	// check if user alredy exists
	// check for files
	// upload them to cloudinary
	// create user
	// check user created or not
	// return res

	const { name, email, password, role } = req.body;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new ApiError(409, "User Already exists");
	}
	const avatarLocalPath = req.file?.path;
	if (!avatarLocalPath) {
		throw new ApiError(400, "Avatar local file is missing");
	}

	const avatar = await uploadOnCloudinary(avatarLocalPath);
	if (!avatar) {
		throw new ApiError(400, "Avatar CLoudinary file is required");
	}

	const user = await User.create({
		name,
		email,
		password,
		avatar: avatar?.secure_url,
		role,
	});

	const createdUser = await User.findById(user._id).select(
		"-password -refreshToken"
	);
	if (!createdUser) {
		throw new ApiError(
			500,
			"Something went wrong while registering the user"
		);
	}

	return res
		.status(200)
		.json(
			new ApiResponse(
				200,
				createdUser,
				"User registered Successfully"
			)
		);
});

export { registerUser };
