import * as Joi from "joi";

export const createImgModel = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().required(),
    path: Joi.string().required(),
    pictures: Joi.string()
});