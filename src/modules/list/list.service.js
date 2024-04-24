import slugify from "slugify";
import * as repository from "../../utils/handlers/repository.js";

export const getAllList = async (model, filters, query) => {
    return await repository.getAll(model, filters, query);
};
export const deleteListById = async (model, id) => {
    return await repository.deleteOne(model, id);
};
export const insertList = async (model, body) => {
    model.slug = slugify(model.name);
    let UniqueKey = { name: body.name };
    const response = await repository.addOne(model, UniqueKey, body);
    return response;
};
export const updateListById = async (model, id, body) => {
    body.name ? (body.slug = slugify(body.name)) : "";
    return await repository.updateOne(model, id, body);
};
export const getList = async (model, id) => {
    return await repository.getById(model, id);
};
