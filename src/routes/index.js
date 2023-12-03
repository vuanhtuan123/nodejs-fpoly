import { Router } from "express";
import productRouter from "./products";
import routerAuth from "./auth";


const router = Router();


router.use('/product', productRouter)
router.use("/auth", routerAuth)

export default router