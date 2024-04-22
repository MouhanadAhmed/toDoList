import express from "express";
import { validation } from "../../utils/middleware/validation.js";
import { createUserSchema } from "../user/user.validator.js";
import * as authController from "./auth.controller.js";
import {
    changeMyPasswordSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    signInOutSchema,
    verifyRessetCodeSchema,
} from "./auth.validator.js";
const authRouter = express.Router();

// authRouter.post("/signup", validation(createUserSchema), authController.signUp);
authRouter.post("/logout", authController.logOut);
authRouter.post("/signin", validation(signInOutSchema), authController.signIn);
authRouter.get("/verify/:token", authController.verifyEmail);
authRouter.post(
    "/forgotPassword",
    validation(forgotPasswordSchema),
    authController.forgotPassword,
);
authRouter.post(
    "/verifyRessetCode",
    validation(verifyRessetCodeSchema),
    authController.verifyRessetCode,
);
authRouter.put(
    "/changeMyPassword",
    validation(changeMyPasswordSchema),
    authController.changeMyPassword,
);
authRouter.put(
    "/resetPassword",
    validation(resetPasswordSchema),
    authController.ressetPassword,
);

authRouter.put("/updateMe", authController.updateMe);
export default authRouter;
