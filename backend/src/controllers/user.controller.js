import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
	// get user
	// generate access token from method in model
	// generate refresh token too and save it in db
	try {
		const user = await User.findById(userId);
		const accessToken = await user.generateAccessToken();
		const refreshToken = await user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	} catch (err) {
		console.error(err.message);
		throw new ApiError(
			500,
			"Something went wrong while generating Access and Refresh Tokens"
		);
	}
};

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

	try {
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
			throw new ApiError(
				400,
				"Avatar CLoudinary file is required"
			);
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
	} catch (error) {
		throw new ApiError(400, "Error occured while registering user");
	}
});

const loginUser = asyncHandler(async (req, res) => {
	// get user data from frontend
	// validation is done in middleware
	// check if user exists
	// check if password match
	// generate token and send cookies
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new ApiError(404, "User not Exist");
		}

		const isPasswordValid = await user.isPasswordCorrect(password);
		if (!isPasswordValid) {
			throw new ApiError(401, "Wrong Password");
		}

		const { accessToken, refreshToken } =
			await generateAccessAndRefreshToken(user?._id);

		const loggedInUser = await User.findById(user._id).select(
			"-password -refreshToken"
		);

		const options = {
			httpOnly: true,
			secure: true,
		};

		res.status(200)
			.cookie("accessToken", accessToken, options)
			.cookie("refreshToken", refreshToken, options)
			.json(
				new ApiResponse(
					200,
					loggedInUser,
					"User LoggedIn Successfully"
				)
			);
	} catch (error) {
		throw new ApiError(400, "Error occured while user login");
	}
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
	// get old and new password from frontend
	// get user from req.user
	// check if old password is correct
	// set password to new password
	// save new password
	const { oldPassword, newPassword } = req.body;
	try {
		const user = await User.findById(req.user?._id);
		const isPasswordValid = await user.isPasswordCorrect(
			oldPassword
		);
		if (!isPasswordValid) {
			throw new ApiError(404, "Wrong Password");
		}

		user.password = newPassword;
		user.refreshToken = undefined;

		await user.save({ validateBeforeSave: false });

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					{},
					"Password Changed Successfully"
				)
			);
	} catch (error) {
		throw new ApiError(
			400,
			"Error occured while changing password"
		);
	}
});

const forgotPassword = asyncHandler(async (req, res) => {
	// get email, newPassword from frontend
	// find user with email and update password(need to verify email(future work))
	// save user and ask to login
	const { email, newPassword } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new ApiError(404, "User Not Found");
		}
		user.password = newPassword;
		await user.save({ validateBeforeSave: false });

		return res
			.status(200)
			.json(
				new ApiResponse(
					200,
					{},
					"Password Updated Successfully"
				)
			);
	} catch (error) {
		throw new ApiError(
			400,
			"Error occured while updating password"
		);
	}
});

export { registerUser, loginUser, changeCurrentPassword, forgotPassword };
