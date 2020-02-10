import * as Joi from "joi";

export const createImgModel = Joi.object().keys({
    id: Joi.number().required().default('2'),
    name: Joi.string().required().default('Name'),
    path: Joi.string().required().default('Path'),
    pictures: Joi.string().default('img')
}).options({allowUnknown: true});


// export const createImgModel = Joi.object({
//     id: Joi.number().required().default(1),
//     name: Joi.string().required().default('Name'),
//     path: Joi.string().required().default('Path'),
//     pictures: Joi.string().default('img')
// }).options({allowUnknown: true});