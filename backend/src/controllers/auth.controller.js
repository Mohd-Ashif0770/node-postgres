import {
  getProfileService,
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUserService(name, email, password);

    if (!user) {
      return errorResponse(res, 400, "User registration failed");
    }

    return successResponse(res, 201, "User Registration completed", user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUserService(email, password);

    //set token as cookie
    res.cookie("token", token, { httpOnly: true });

    return successResponse(res, 200, "Login completed", user);
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");

    return successResponse(res, 200, "User logout successfully");
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const { user } = await getProfileService(req.user.id);
    successResponse(res, 200, "User profile fetched", user);
  } catch (error) {
    next(error);
  }
};
