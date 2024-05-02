
import { catchAsyncError } from "../../utils/middleware/catchAsyncError.js";
import AppError from "../../utils/services/AppError.js";
import { itemModel } from "./item.model.js";
import { insertItem, getAllItems, deleteItemById, getItem, updateItemById } from "./item.service.js";

export const addItem = catchAsyncError(async (req, res, next) => {
    let body = { ...req.body };
    let result = await insertItem(itemModel, body);
    result.error && next(new AppError(result.error, 403));
    !result.error && res.status(201).json({ message: "success", result });
});
export const getAll = catchAsyncError(async (req, res) => {
    const filters = req.params ? { list: req.params.id } : {};
    const result = await getAllItems(itemModel, filters, req.query);
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
    let result = await getItem(itemModel, id);
    console.info("result", result);
    result === null && next(new AppError("Item not found", 404));
    result !== null &&
        res.status(200).json({ message: "success", Item: result });
});