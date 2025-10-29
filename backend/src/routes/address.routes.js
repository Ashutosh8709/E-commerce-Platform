import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
	getAddress,
	addAddress,
	updateAddress,
	removeAddress,
	markAsDefault,
} from "../controllers/address.controller.js";

const router = Router();

router.get("/", verifyJwt, getAddress);
router.post("/", verifyJwt, addAddress);
router.patch("/:addressId", verifyJwt, updateAddress);
router.patch("/:addressId/default", verifyJwt, markAsDefault);
router.delete("/:addressId", verifyJwt, removeAddress);

export default router;
