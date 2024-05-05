import slugify from "slugify";
import { getAll, deleteOne, addOne, updateOne, getById, deleteAll } from "../../utils/handlers/repository.js";
import { itemModel } from "../item/item.model.js";
export const getAllList = async (model, filters, query) => {
    const result = await getAll(model, filters, query);
    result.Lists = result.documents;
    delete result.documents;
    return result;
};
export const deleteListById = async (model, id) => {
    await deleteAll(itemModel,{list:id});
    return await deleteOne(model, id);
};
export const insertList = async (model, body) => {
    model.slug = slugify(model.name);
    let UniqueKey = { name: body.name };
    const response = await addOne(model, body, UniqueKey);
    return response;
};
export const updateListById = async (model, id, body) => {
    body.name ? (body.slug = slugify(body.name)) : "";
    return await updateOne(model, id, body);
};
export const getList = async (model, id) => {
    return await getById(model, id);
};
