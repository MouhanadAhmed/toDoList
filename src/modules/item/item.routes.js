import express from "express";
import { validation } from "../../utils/middleware/validation.js";
import * as itemControllers from "./item.controller.js";
import {
    createItemSchema,
    deleteItemSchema,
    getItemByIdSchema,
    updateItemchema,
} from "./item.validator.js";
const UserRouter = express.Router();
UserRouter.route("/")
    .post(validation(createItemSchema), itemControllers.addItem)
    .get(itemControllers.getAll);

UserRouter.route("/:id")
    .get(validation(getItemByIdSchema), itemControllers.getItemById)
    .put(validation(updateItemchema), itemControllers.updateItem)
    .delete(validation(deleteItemSchema), itemControllers.removeItem);
export default UserRouter;
