import bcrypt from "bcrypt";
import slugify from "slugify";
import { catchAsyncError } from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";
import {
    deleteOne,
    addOne,
    getAll,
    updateOne,
    getById,
} from "../../utils/handlers/refactor.js";
import { userModel } from "./user.model.js";
import { insertUser } from "./user.service.js";
/**
 * This is Add user Controller.
 * ```
 * -Verify the token is provided
 * -Retrive the user info
 * -Checking whether the user already exists or not
 * -Check if the user is an Agent
 * -Generate token for the user
 * ```
 */

/**
 * This is Add user Controller
 
 */
// export const  addUser = deleteOne(userModel, "User")
export const  addUser =catchAsyncError(async (req, res, next) => {
    let body = {...req.body};
    body.slug = slugify(body.name);
    let UniqueKey = { email: body.email };
    let result =await insertUser(
        userModel,
        UniqueKey,
        body,
        "User",
    );
    console.info("ewsult", result);
    result === "false" && next(new AppError("User alredy exists", 403));
    result !== "false" && res.status(201).json({ message: "success",result });
})
// addOne(userModel, "User");
/**
 * This is Get All users Controller
 
 */
export const getAllUsers = getAll(userModel, "Users");
/**
 * This is Update user Controller
 
 */
export const updateUser = updateOne(userModel, "User");
/**
 * This is Delete user Controller
 
 */
export const deleteUser = deleteOne(userModel, "User");

/**
 * This is Get user by Id Controller
 
 */
export const getUserById = getById(userModel, "User");

/**
 * This is Update user Controller
 
 */
export const changePassword = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    req.body.changePasswordAt = Date.now();
    if (req.body.name) req.body.slug = slugify(req.body.name);
    req.body.password = await bcrypt.hash(req.body.password, 7);
    const document = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
    });
    document && res.status(200).json({ message: "Success", document });
    !document && next(new AppError("Invalid user Id", 404));
});
