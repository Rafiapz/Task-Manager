import Joi from "joi";

export const taskValidation = Joi.object({

    title: Joi
        .string()
        .min(3)
        .required(),

    description: Joi
        .string()
        .min(6)
        .required(),
    status: Joi
        .string()
        .required()

})