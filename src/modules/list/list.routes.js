import express from "express";
import { validation } from "../../utils/middleware/validation.js";
import * as listControllers from "./list.controller.js";
import {
    createListSchema,
    deleteListSchema,
    getListByIdSchema,
    updateListchema,
} from "./list.validator.js";
const UserRouter = express.Router();
UserRouter.route("/")
    .post(validation(createListSchema), listControllers.addList)
    .get(listControllers.getAll);

UserRouter.route("/:id")
    .get(validation(getListByIdSchema), listControllers.getListById)
    .put(validation(updateListchema), listControllers.updateList)
    .delete(validation(deleteListSchema), listControllers.removeList);
export default UserRouter;
