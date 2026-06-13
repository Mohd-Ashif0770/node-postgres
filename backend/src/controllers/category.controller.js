import {
  createCategoryService,
  getAllCategoryService,
} from "../services/category.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if(!name){
        errorResponse(res, 400, "name is required");
    }
    const category = await createCategoryService(name);
    successResponse(res, 201, "Category created", category);
  } catch (error) {
    next(error)
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await getAllCategoryService();
    successResponse(res, 200, "All category fetched", categories);
  } catch (error) {
    next(error);
  }
};
