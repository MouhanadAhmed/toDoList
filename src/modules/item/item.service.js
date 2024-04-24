 import { getAll, deleteOne, addOne, updateOne, getById } from "../../utils/handlers/repository.js";

export const getAllItems = async (model, filters, query) => {
    return await getAll(model, filters, query);
};
export const deleteItemById = async (model, id) => {
    return await deleteOne(model, id);
};
export const insertItem = async (model, body) => {
    let UniqueKey = { name: body.name };
    const response = await addOne(model, UniqueKey, body);
    return response;
};
export const updateItemById = async (model, id, body) => {
    return await updateOne(model, id, body);
};
export const getItem= async (model, id) => {
    return await getById(model, id);
};
