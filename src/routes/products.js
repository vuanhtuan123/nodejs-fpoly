import { Router } from "express";
import { create, getAll, getDetail, remove, update } from "../controllers/product";
import checkPremission from "../middlewares/checkPermission";

const productRouter = Router();

productRouter.post('/', checkPremission, create)
productRouter.get('/', getAll)
productRouter.get('/:id', getDetail)
productRouter.put('/:id', checkPremission , update)
productRouter.delete('/:id', checkPremission , remove)

export default productRouter