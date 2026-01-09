import { ApiError } from "../utils/ApiError.js";

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            throw new ApiError(
                403, 
                `Role: ${req.user?.role} is not authorized to access this resource`
            );
        }
        next();
    };
};