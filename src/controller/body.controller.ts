import Joi from "joi"

export const RegisterSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'live'] } })
        .required(),
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
})

export const LoginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'live'] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

})

export const PostSchema = Joi.object({
    title: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,100}$')) //means 3 to 100 characters long and only alphanumeric characters are allowed.
        .required(),
    content: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,800}$')) //means 3 to 500 characters long and only alphanumeric characters are allowed.
        .required(),
})