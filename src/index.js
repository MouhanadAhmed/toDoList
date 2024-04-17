import { globalError } from "./utils/middleware/globalErrorHandle.js";
import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import BloodRouter from "./modules/blood/blood.routes.js";
import HospitalRouter from "./modules/hospital/hospital.routes.js";

export default function init(app) {
    app.use("/api/v1/user", userRouter);
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/blood", BloodRouter);
    app.use("/api/v1/hospital", HospitalRouter);

    // Global error handler middleware
    app.use(globalError);
}
