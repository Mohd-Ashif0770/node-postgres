import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "../services/user.service.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    successResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

export const getSingleUser = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) {
      errorResponse(res, 404, "User not found");
    }
    successResponse(res, 200, "Single user found", user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newUser = await createUserService(name, email);
    if (!newUser) {
      errorResponse(res, 404, "User not found");
    }
    successResponse(res, 201, "User Created successfully", newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const updatedUser = await updateUserService(id, name, email);

    if (!updatedUser) {
      errorResponse(res, 404, "User not found");
    }
    successResponse(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    if (!deletedUser) {
      errorResponse(res, 404, "User not found");
    }
    successResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (error) {
    next(error);
  }
};
