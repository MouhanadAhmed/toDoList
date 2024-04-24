import * as repository from "../../utils/handlers/repository.js";

export const getAll = async (model, filters, query) => {
    return await repository.getAll(model, filters, query);
};
export const deleteById = async (model, id) => {
    return await repository.deleteOne(model, id);
};
export const insert = async (model, body) => {
    let UniqueKey = { name: body.name };
    const response = await repository.addOne(model, UniqueKey, body);
    return response;
};
export const update = async (model, id, body) => {
    return await repository.updateOne(model, id, body);
};
export const getById = async (model, id) => {
    return await repository.getById(model, id);
};
