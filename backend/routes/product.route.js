import { Router } from "express";
import { getProducts } from "../controllers/products.controller.js";

const router = Router();

router.get("/getProducts", getProducts);


export default router;
