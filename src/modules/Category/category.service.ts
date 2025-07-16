import { Request } from "express";
import cloudinary from "../../utils/cloud";
import { Category } from "./category.model";

export async function getAllCategoryiesService() {
    const categoryies = await Category.find();
    return {
        statusCode: 200,
        data: { success: true, categoryies },
    };
}
export async function getCategoryService(id: string) {
    const category = await Category.findById(id);
    if (!category) {
        return {
            statusCode: 404,
            data: { message: "Category not found" },
        };
    }
    return {
        statusCode: 200,
        data: { success: true, category },
    };
}
export async function addCategoryService(req: Request) {
    const { name , createdBy} = req.body;

    if (!req.file) {
        return {
            statusCode: 400,
            data: { message: "Image is required" },
        };
    }
    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.FOLDER_CLOUD_NAME}/categorys/images`,
        use_filename: true,
        unique_filename: true,
    });
    let image = {
        url: cloudinaryResult.secure_url,
        id: cloudinaryResult.public_id,
    };
    const category = await Category.create({
        name,
        image,
        createdBy
    });
    return {
        statusCode: 201,
        data: { success: true, message: "Category created successfully", category },
    };
}
export async function updateCategoryService(id: string, req: Request) {
    const { name } = req.body;
    const category = await Category.findById(id);
    if (!category) {
        return {
            statusCode: 404,
            data: { message: "Category not found" },
        };
    }

    if (!req?.file) {
        return {
            statusCode: 400,
            data: { message: "Image is required" },
        };

    }        // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
        folder: `${process.env.FOLDER_CLOUD_NAME}/categorys/images`,
        use_filename: true,
        unique_filename: true,
    });
    let image = {
        url: cloudinaryResult.secure_url,
        id: cloudinaryResult.public_id,
    };
    await Category.findByIdAndUpdate(id, {
        name,
        image
    });
    return {
        statusCode: 200,
        data: { success: true, message: "Category updated successfully" },
    };
}
export async function deleteCategoryService(id: string) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        return {
            statusCode: 404,
            data: { message: "Category not found" },
        };
    }
    return {
        statusCode: 200,
        data: { success: true, message: "Category deleted successfully" },
    };
}
