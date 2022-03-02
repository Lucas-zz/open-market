import { Router } from "express";
import { getProducts, postProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.post("/products", postProduct);
productRouter.patch("/products/:idProduct", updateProduct);
productRouter.delete("/products/:idProduct", deleteProduct);

export default productRouter;
