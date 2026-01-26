import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
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
      "Something went wrong while generating Access and Refresh Tokens",
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

  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User Already exists");
  }
  let avatarUrl = "";

  if (req.file?.path) {
    const avatar = await uploadOnCloudinary(req.file?.path);
    if (!avatar) {
      throw new ApiError(400, "Avatar upload failed");
    }
    avatarUrl = avatar?.secure_url;
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar: avatarUrl,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user data from frontend
  // validation is done in middleware
  // check if user exists
  // check if password match
  // generate token and send cookies
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not Exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Wrong Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user?._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -createdAt -updatedAt",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User LoggedIn Successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  // take user from req user
  // find user in db and unset its refreshtoken
  // clear cookies

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  // get old and new password from frontend
  // get user from req.user
  // check if old password is correct
  // set password to new password
  // save new password
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(404, "Wrong Password");
  }

  user.password = newPassword;
  user.refreshToken = undefined;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  // get email, newPassword from frontend
  // find user with email and update password(need to verify email(future work))
  // save user and ask to login
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Updated Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  if (req.user) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, req.user, "Current user fetched successfully"),
      );
  }
  throw new ApiError(404, "User not Logged in");
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  // find localavatarpath
  // upload it on cloudinary
  // update user with new avatar url

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(404, "Avatar Local File not found");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.secure_url) {
    throw new ApiError(400, "Error while uploading avatar on cloudinary");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar?.secure_url,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Avatar updated successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  // take user email or name which they want to update
  // user is verified from middleware
  // take user and update details

  const updates = req.body;
  const userId = req.user?._id;

  if (Object.keys(updates).length == 0) {
    throw new ApiError(400, "No data Provided");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true },
  ).select("-password");

  if (!updatedUser) {
    throw new ApiError(404, "User not Found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User Details Updated Successfully"),
    );
});

const verifyUser = asyncHandler(async (req, res) => {
  // take email from req.body
  // check if user with email is present
  // if user email is there in db return
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Email has been verified successfully"));
  } else {
    throw new ApiError(404, "User not Found");
  }
});
export {
  registerUser,
  loginUser,
  changeCurrentPassword,
  forgotPassword,
  logoutUser,
  getCurrentUser,
  updateUserAvatar,
  updateAccountDetails,
  verifyUser,
};
