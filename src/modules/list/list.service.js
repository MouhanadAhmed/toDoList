import slugify from "slugify";
import { getAll, deleteOne, addOne, updateOne, getById } from "../../utils/handlers/repository.js";
export const getAllList = async (model, filters, query) => {
    return await getAll(model, filters, query);
};
export const deleteListById = async (model, id) => {
    return await deleteOne(model, id);
};
export const insertList = async (model, body) => {
    model.slug = slugify(model.name);
    let UniqueKey = { name: body.name };
    const response = await addOne(model, UniqueKey, body);
    return response;
};
export const updateListById = async (model, id, body) => {
    body.name ? (body.slug = slugify(body.name)) : "";
    return await updateOne(model, id, body);
};
export const getList = async (model, id) => {
    return await getById(model, id);
};
