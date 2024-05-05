import { globalError } from "./utils/middleware/globalErrorHandle.js";
import userRouter from "./modules/user/user.routes.js";
import listRouter from "./modules/list/list.routes.js";
import itemRouter from "./modules/item/item.routes.js";
import authRouter from "./modules/auth/auth.routes.js";

// import AppError from "./utils/services/AppError.js";

export default function init(app) {
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/list", listRouter);
    app.use("/api/v1/item", itemRouter);
    app.use("/api/v1/auth", authRouter);

    // Global error handler middleware
    app.use(globalError);
    // // Fallback route for non-existing paths
    // app.all("*", (req, res,next) => {
    //     // res.status(404).json({
    //     //     success: false,
    //     //     error: `Path ${req.originalUrl} not found.`,
    //     // });
    //     next(new AppError(`Path ${req.originalUrl} not found.`, 404))
    //     // `Path ${req.originalUrl} not found.`
    // });
}
