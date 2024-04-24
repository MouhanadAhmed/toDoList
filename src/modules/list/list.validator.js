import Joi from "joi";

export const createListSchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
});
export const updateListchema = Joi.object({
    name: Joi.string().min(2).max(30),
    id: Joi.string().hex().length(24).required()
});
export const deleteListSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});
export const getListByIdSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});