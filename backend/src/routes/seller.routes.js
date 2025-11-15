import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { verifySeller } from "../middlewares/verifySeller.middleware.js";
import {
  registerStore,
  addBankDetails,
} from "../controllers/seller.controller.js";

const router = Router();

router.post("/register", verifyJwt, verifySeller, registerStore);
router.post("/addBank", verifyJwt, verifySeller, addBankDetails);

export default router;
