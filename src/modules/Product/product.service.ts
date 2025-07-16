import { Request } from "express";
import { Product } from "./product.model";
import cloudinary from "../../utils/cloud";

export async function getAllProductsService() {
    const products = await Product.find();
    return {
        statusCode: 200,
        data: { success: true, products },
    };
}
export async function getProductService(id: string) {
    const product = await Product.findById(id);
    if (!product) {
        return {
            statusCode: 404,
            data: { message: "Product not found" },
        };
    }
    return {
        statusCode: 200,
        data: { success: true, product },
    };
}
export async function addProductService(req: Request) {
    const { name, price, description, category, availabel ,createdBy} = req.body;

    if (!req?.file) {
        return {
            statusCode: 400,
            data: { message: "Image is required" },
        };
    }
    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.FOLDER_CLOUD_NAME}/products/images`,
        use_filename: true,
        unique_filename: true,
    });
    let image = {
        url: cloudinaryResult.secure_url,
        id: cloudinaryResult.public_id,
    };
    const product = await Product.create({
        name,
        price,
        description,
        image,
        category,
        availabel,
        createdBy
    });
    return {
        statusCode: 201,
        data: { success: true, message: "Product created successfully", product },
    };
}
export async function updateProductService(id: string, req: Request) {
    const { name  } = req.body;
    const product = await Product.findById(id);
    if (!product) {
        return {
            statusCode: 404,
            data: { message: "Product not found" },
        };
    }
    if (!req?.file) {
        return {
            statusCode: 400,
            data: { message: "Image is required" },
        };
    }
            // Upload image to Cloudinary
            const cloudinaryResult = await cloudinary.uploader.upload(req?.file?.path, {
                folder: `${process.env.FOLDER_CLOUD_NAME}/products/images`,
                use_filename: true,
                unique_filename: true,
            });
            let image = {
                url: cloudinaryResult.secure_url,
                id: cloudinaryResult.public_id,
            };
    await Product.findByIdAndUpdate(id, {
        name,
        image

    });
    return {
        statusCode: 200,
        data: { success: true, message: "Product updated successfully" },
    };
}
export async function deleteProductService(id: string) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        return {
            statusCode: 404,
            data: { message: "Product not found" },
        };
    }
    return {
        statusCode: 200,
        data: { success: true, message: "Product deleted successfully" },
    };
}
