import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
	registerUserValidation,
	loginUserValidation,
} from "../middlewares/validation.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
	loginUser,
	registerUser,
	changeCurrentPassword,
	forgotPassword,
	logoutUser,
	getCurrentUser,
	updateUserAvatar,
	updateAccountDetails,
	verifyUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post(
	"/register",
	upload.single("avatar"),
	registerUserValidation,
	registerUser
);
router.post("/login", loginUserValidation, loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify", verifyUser);

//secured routes
router.get("/current-user", verifyJwt, getCurrentUser);
router.post("/logout", verifyJwt, logoutUser);
router.post("/change-password", verifyJwt, changeCurrentPassword);
router.patch("/avatar", verifyJwt, upload.single("avatar"), updateUserAvatar);
router.patch("/update-account", verifyJwt, updateAccountDetails);

export default router;
