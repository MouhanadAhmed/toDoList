import jwt from "jsonwebtoken";
import axios from "axios";
import { catchAsyncError } from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";
import { userModel } from "./user.model.js";
import { deleteOne, addOne, getAll, updateOne, getById } from '../../utils/handlers/refactor.js';
import bcrypt from 'bcrypt'
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
export const addUser = addOne(userModel,"User");
/**
 * This is Get All users Controller 

 */
export const getAllUsers = getAll(userModel,"Users");
/**
 * This is Update user Controller

 */
export const updateUser = updateOne(userModel,"User");
/**
 * This is Delete user Controller 

 */
export const deleteUser = deleteOne(userModel,"User");

/**
 * This is Get user by Id Controller 

 */
export const getUserById = getById(userModel, 'User');

/**
 * This is Update user Controller 

 */
export const changePassword = catchAsyncError(async (req,res,next) => {
    const {id}= req.params;
    req.body.changePasswordAt = Date.now();
    if(req.body.name) req.body.slug= slugify(req.body.name);
    req.body.password = await bcrypt.hash(req.body.password,7)
    let document = await userModel.findByIdAndUpdate(id,req.body,{new:true})
    document && res.status(200).json({message:"Success", document});
    !document &&   next(new AppError(`Invalid user Id`,404))
});