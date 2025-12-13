import { Router } from "express";
const router = Router();
import { healthCheck } from "../controllers/health.controller";
router.get("/", healthCheck);

export default router;
