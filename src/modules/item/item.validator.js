import Joi from "joi";

export const createItemSchema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    list: Joi.string().hex().length(24).required(),
    archived: Joi.boolean()
});
export const updateItemchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    archived: Joi.boolean().optional(),
    name: Joi.string().min(1).max(30).optional(),
});
export const deleteItemSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});
export const getItemByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});