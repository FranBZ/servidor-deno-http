import { Response, Router } from "https://deno.land/x/oak/mod.ts";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.ts";

const router = new Router();

router.get("/", ({ response }: { response: Response }) => {
  response.body = "Welcome to my API";
});

router
  .get("/product/:id", getProduct)
  .get("/products", getProducts)
  .post("/product", createProduct)
  .put("/product/:id", updateProduct)
  .delete("/product/:id", deleteProduct);

export default router;
