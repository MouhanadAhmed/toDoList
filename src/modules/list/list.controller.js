
import { catchAsyncError } from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";
import { listModel } from "./list.model.js";
import { insertList , updateListById, getList, getAllList, deleteListById} from "./list.service.js";

export const addList = catchAsyncError(async (req, res, next) => {
    let body = { ...req.body };
    let result = await insertList(listModel, body);
    result === "false" && next(new AppError("List alredy exists", 403));
    result !== "false" && res.status(201).json({ message: "success", result });
});
export const getAll = catchAsyncError(async (req, res, params) => {
    const filters = {};
    const result = await getAllList(listModel, filters, req.query);
    res.status(200).json({ result });
});
export const updateList = catchAsyncError(async (req, res, next) => {
    let body = { ...req.body };
    let { id } = req.params;
    let result = await updateListById(listModel, id, body);
    result === null && next(new AppError("Invalid list Id", 403));
    result !== null &&
        res.status(200).json({ message: "success", updatedList: result });
});
export const removeList = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await deleteListById(listModel, id);
    result === null && next(new AppError("List not found", 404));
    result !== null &&
        res.status(200).json({ message: "success", deletedList: result });
});
export const getListById = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await getList(listModel, id);
    result === null && next(new AppError("List not found", 404));
    result !== null &&
        res.status(200).json({ message: "success", List: result });
});
