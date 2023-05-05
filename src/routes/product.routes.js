import { Router } from "express";
import {
  AllProducts,
  productsFilterByCategory,
  productsFindById,
  productsFindByName,
  AddProduct,
  DeleteProduct,
  EditProduct,
} from "../controller/product.controller.js";

const router = Router();

router.get("/products", AllProducts);

router.get("/products/id/:id", productsFindById);

router.get("/products/name/:name", productsFindByName);

router.get("/products/category/:name", productsFilterByCategory);

router.post("/products/add", AddProduct);

router.delete("/products/delete/:id", DeleteProduct);

router.put("/products/edit/:id", EditProduct);

export default router;
