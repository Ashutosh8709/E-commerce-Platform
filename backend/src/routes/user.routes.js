import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { registerUserValidation } from "../middlewares/validation.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

router.post(
	"/register",
	upload.single("avatar"),
	registerUserValidation,
	registerUser
);

export default router;
