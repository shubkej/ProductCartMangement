import { Router } from "express";
import { checkOutOrder } from "../controllers/checkOutOrder.controller.js";

const router = Router();

router.post("/checkOutOrder", checkOutOrder);


export default router;
