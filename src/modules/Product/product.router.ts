import { Router } from "express";
import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./product.controller";
import { isValid } from "../../middlewares/validation.middleware";
import { addProductSchema } from "./product.validation";
import multer from "multer";

const router = Router();
const upload = multer();

/**
 * @route GET /products
 * @desc Get all products
 * @access Public
 */
router.get("/", getAllProducts);

/**
 * @route GET /products/:id
 * @desc Get single product by ID
 * @access Public
 */
router.get("/:id", getProduct);

/**
 * @route POST /products/addProduct
 * @desc Create new product
 * @access Private/Admin
 */
router.post(
    "/addProduct",
    isAuthentcated,
    isAuthorized("admin"),
    upload.single('productImage'),
    isValid(addProductSchema),
    addProduct
);

/**
 * @route PATCH /products/:id
 * @desc Update product
 * @access Private/Admin
 */
router.patch(
    "/:id",
    isAuthentcated,
    isAuthorized("admin"),
    updateProduct
);

/**
 * @route DELETE /products/:id
 * @desc Delete product
 * @access Private/Admin
 */
router.delete(
    "/:id",
    isAuthentcated,
    isAuthorized("admin"),
    deleteProduct
);

// 💳 Stripe
// POST /checkout-session → create Stripe session

// POST /webhook → Stripe webhook endpoint

export default router;
