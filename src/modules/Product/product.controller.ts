import { Request, Response } from "express";
import * as productService from "./product.service";
import { catchError } from "../../utils/catchError";

/**
 * Product Controller
 * Handles all product-related HTTP requests
 */

/**
 * Get all products from database
 * @param req Express Request object
 * @param res Express Response object
 */
export const getAllProducts = catchError(async (req: Request, res: Response) => {
  const result = await productService.getAllProductsService();
  res.status(result?.statusCode).json(result?.data);
});

/**
 * Get single product by ID
 * @param req Express Request object containing product ID in params
 * @param res Express Response object
 */
export const getProduct = catchError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productService.getProductService(id);
  res.status(result?.statusCode).json(result?.data);
});

/**
 * Add new product to database
 * @param req Express Request object containing product data
 * @param res Express Response object
 */
export const addProduct = catchError(async (req: Request, res: Response) => {
  const result = await productService.addProductService(req);
  res.status(result?.statusCode).json(result?.data);
});

/**
 * Update existing product by ID
 * @param req Express Request object containing product ID and updated data
 * @param res Express Response object
 */
export const updateProduct = catchError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productService.updateProductService(id, req);
  res.status(result?.statusCode).json(result?.data);
});

/**
 * Delete product by ID
 * @param req Express Request object containing product ID
 * @param res Express Response object
 */
export const deleteProduct = catchError(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await productService.deleteProductService(id);
  res.status(result?.statusCode).json(result?.data);
});
