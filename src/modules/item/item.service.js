import { getAll, deleteOne, addOne, updateOne, getById, findOne } from "../../utils/handlers/repository.js";
import { listModel } from "../list/list.model.js";

export const getAllItems = async (model, filters, query) => {
    const result = await getAll(model, filters, query);
    result.Items = result.documents;
    delete result.documents;
    return result;
};
export const deleteItemById = async (model, id) => {
    let deletedItem = await deleteOne(model, id);
    await updateOne(listModel,deletedItem.list,
        {
            $pull:{
                items:deletedItem._id
            }
        },
        {new:true}
        );
    return deletedItem;
};
export const insertItem = async (model, body) => {
    let UniqueKey = { name: body.name, list: body.list };
    let itemWithSameName = await findOne(model, UniqueKey);
    if(itemWithSameName) {
        return {error: 'Duplicate item "' + body.name + '" with the same name in list id "' + body.list + '"' };
    }
    let newItem = await addOne(model, body);
    await updateOne(listModel, body.list, 
        {
            $addToSet:{
                items:newItem._id
            }
        }
        ,{new:true});
    return newItem
};
export const updateItemById = async (model, id, body) => {
    return await updateOne(model, id, body);
};
export const getItem = async (model, id) => {
    return await getById(model, id);
};
