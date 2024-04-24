import { getAll, deleteOne, addOne, updateOne, getById, findOne } from "../../utils/handlers/repository.js";

export const getAllItems = async (model, filters, query) => {
    return await getAll(model, filters, query);
};
export const deleteItemById = async (model, id) => {
    return await deleteOne(model, id);
};
export const insertItem = async (model, body) => {
    let UniqueKey = { name: body.name, list: body.list };
    let itemWithSameName = await findOne(model, UniqueKey);
    if(itemWithSameName) {
        return {error: 'Duplicate item "' + body.name + '" with the same name in list id "' + body.list + '"' };
    }
    return await addOne(model, body);
};
export const updateItemById = async (model, id, body) => {
    return await updateOne(model, id, body);
};
export const getItem= async (model, id) => {
    return await getById(model, id);
};
