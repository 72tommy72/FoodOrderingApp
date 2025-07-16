import { Request, Response } from "express";
import * as categoryService from "./category.service";
import { catchError } from "../../utils/catchError";

/**
 * Category Controller
 * Handles all category-related HTTP requests
 */

/**
 * Get all categories
 * @param req Express Request object
 * @param res Express Response object
 * @returns List of all categories
 */
export const getAllCategories = catchError(async (req: Request, res: Response) => {
    const result = await categoryService.getAllCategoryiesService();
    return res.status(result.statusCode).json(result.data);
});

/**
 * Get single category by ID
 * @param req Express Request object containing category ID
 * @param res Express Response object
 * @returns Single category data
 */
export const getCategory = catchError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await categoryService.getCategoryService(id);
    return res.status(result.statusCode).json(result.data);
});

/**
 * Create new category
 * @param req Express Request object containing category data
 * @param res Express Response object
 * @returns Created category data
 */
export const addCategory = catchError(async (req: Request, res: Response) => {
    const result = await categoryService.addCategoryService(req);
    return res.status(result.statusCode).json(result.data);
});

/**
 * Update existing category
 * @param req Express Request object containing updated category data
 * @param res Express Response object
 * @returns Updated category data
 */
export const updateCategory = catchError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await categoryService.updateCategoryService(id, req);
    return res.status(result.statusCode).json(result.data);
});

/**
 * Delete category by ID
 * @param req Express Request object containing category ID
 * @param res Express Response object
 * @returns Deletion status
 */
export const deleteCategory = catchError(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await categoryService.deleteCategoryService(id);
    return res.status(result.statusCode).json(result.data);
});
