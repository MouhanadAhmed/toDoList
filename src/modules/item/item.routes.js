import express from "express";
import { validation } from "../../utils/middleware/validation.js";
import * as itemControllers from "./item.controller.js";
import {
    createItemSchema,
    deleteItemSchema,
    getItemByIdSchema,
    updateItemchema,
} from "./item.validator.js";
const ItemRouter = express.Router();
ItemRouter.route("/")
    .post(validation(createItemSchema), itemControllers.addItem)
    .get(itemControllers.getAll);

ItemRouter.route("/:id/list")
    .get(validation(getItemByIdSchema), itemControllers.getAll)

ItemRouter.route("/:id")
    .put(validation(updateItemchema), itemControllers.updateItem)
    .delete(validation(deleteItemSchema), itemControllers.removeItem);
export default ItemRouter;
