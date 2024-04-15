import jwt from "jsonwebtoken";
import { donorModel } from "../../modules/donor/model.js";
import AppError from "../services/AppError.js";
import { catchAsyncError } from "./catchAsyncError.js";
/**
 * This is Protected Routes  Controller
 * Verifies user token for the following criteria :
 * - Valid token
 * - Retrives user info.
 */
export const protectedRoutes = catchAsyncError(async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return next(
            new AppError(
                "Unauthorized: Access is denied due to missing token.",
                401,
            ),
        );
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_KEY,
        function (err, decoded) {
            if (err) {
                return next(new AppError(err.message, 401));
            } else {
                const expirationTime = decoded.exp;

                const currentTime = Math.floor(Date.now() / 1000);

                if (currentTime <= expirationTime) {
                    return decoded;
                } else {
                    return next(
                        new AppError(
                            "Token has expired. Please obtain a new token.",
                            401,
                        ),
                    );
                }
            }
        },
    );

    const user = await donorModel.findOne({
        email: decoded.email,
        nationalId: decoded.organizationId,
    });

    if (!user) return next(new AppError("Invalid userId", 404));

    req.user = user;

    next();
});
