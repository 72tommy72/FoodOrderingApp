import { Router } from "express";
import { isAuthentcated } from "../../middlewares/authentication.middleware";
import { isAuthorized } from "../../middlewares/authorization.middleware";
import { isValid } from "../../middlewares/validation.middleware";
import multer from "multer";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller";
import { addCategorySchema } from "./category.validation";

const router = Router();
const upload = multer();

/**
 * @route GET /api/categories
 * @desc Get all categories
 * @access Public
 */
router.get("/", getAllCategories);

/**
 * @route GET /api/categories/:id
 * @desc Get category by ID
 * @access Public
 */
router.get("/:id", getCategory);

/**
 * @route POST /api/categories
 * @desc Create new category
 * @access Admin only
 */
router.post("/", 
    isAuthentcated, 
    isAuthorized("admin"), 
    upload.single('categoryImage'),
    isValid(addCategorySchema),
    addCategory
);

/**
 * @route PATCH /api/categories/:id
 * @desc Update category
 * @access Admin only
 */
router.patch("/:id",
    isAuthentcated,
    isAuthorized("admin"),
    updateCategory
);

/**
 * @route DELETE /api/categories/:id
 * @desc Delete category
 * @access Admin only
 */
router.delete("/:id",
    isAuthentcated,
    isAuthorized("admin"),
    deleteCategory
);

export default router;

