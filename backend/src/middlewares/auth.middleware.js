import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response.js";

const protect = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      errorResponse(res, 401, "Unauthorized, token not provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      errorResponse(res, 401, "Invalid token provided");
    }

    req.user = decoded;
    return next();
  } catch (error) {
    next(error);
  }
};

export default protect;