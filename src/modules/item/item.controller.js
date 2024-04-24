
import { catchAsyncError } from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";
import { itemModel } from "./item.model.js";
import { insertItem, getAllItems, deleteItemById, getItem, updateItemById } from "./item.service.js";

export const addItem = catchAsyncError(async (req, res, next) => {
    let body = { ...req.body };
    let result = await insertItem(itemModel, body);
    result === "false" && next(new AppError("Item alredy exists", 403));
    result !== "false" && res.status(201).json({ message: "success", result });
});
export const getAll = catchAsyncError(async (req, res, params) => {
    const filters = params.chatId ? { chat: req.params.chatId } : {};
    const result = await getAllItems(itemModel, filters, req.query);
    result.Items = result.documents;
    delete result.documents;
    res.status(200).json({ result });
});
export const updateItem = catchAsyncError(async (req, res, next) => {
    let body = { ...req.body };
    let { id } = req.params;
    let result = await updateItemById(itemModel, id, body);
    result === null && next(new AppError("Invalid item Id", 403));
    result !== null &&
        res.status(200).json({ message: "success", updatedItem: result });
});
export const removeItem = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await deleteItemById(itemModel, id);
    result === null && next(new AppError("Item not found", 404));
    result !== null &&
        res.status(200).json({ message: "success", deletedItem: result });
});
export const getItemById = catchAsyncError(async (req, res, next) => {
    let { id } = req.params;
    let result = await  getItem(itemModel, id);
    console.info("result", result);
    result === null && next(new AppError("Item not found", 404));
    result !== null &&
        res.status(200).json({ message: "success", Item: result });
});
