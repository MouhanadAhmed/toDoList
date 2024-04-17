import {
    deleteOne,
    addOne,
    getAll,
    updateOne,
    getById,
} from "../../utils/handlers/refactor.js";
import { bloodModel } from "./blood.model.js";
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
export const addBlood = addOne(bloodModel, "Blood");
/**
 * This is Get All users Controller
 
 */
export const getAllBlood = getAll(bloodModel, "Blood");
/**
 * This is Update user Controller
 
 */
export const updateUser = updateOne(bloodModel, "User");
/**
 * This is Delete user Controller
 
 */
export const deleteUser = deleteOne(bloodModel, "User");

/**
 * This is Get user by Id Controller
 
 */
export const getUserById = getById(bloodModel, "User");
