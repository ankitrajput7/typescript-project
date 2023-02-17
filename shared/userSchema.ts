import Joi, { string } from "joi";
import { Request, Response, NextFunction } from "express";


/**
 * Creating Joi validating object 
 */
const userSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': `Name should be a type of 'text'`,
        'string.empty': `Name cannot be an empty field`,
        'string.min': `Name should have a minimum length of {#limit}`,
        'string.max': `Name should have a maximum length of {#limit}`,
        'any.required': `Name is a required field`
    }),
    email: Joi.string().email().required().messages({
        'string.base': `Email should be a type of 'text'`,
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email is not valid`,
        'any.required': `Email is a required field`
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': `Password should be a type of 'text'`,
        'string.empty': `Password cannot be an empty field`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'any.required': `Password is a required field`
    }),
    mobileNo: Joi.string().min(10).max(10).pattern(new RegExp('^[0-9]{10,10}$')).required().messages({
        'string.base': `Mobile Number should be a type of 'number'`,
        'string.empty': `Mobile Number cannot be an empty field`,
        'string.min': `Mobile Number have a minimum length of {#limit}`,
        'string.max': `Mobile Number have a maximum length of {#limit}`,
        'string.pattern': `Mobile Number should have a maximum length of 10.`,
        'any.required': `Mobile Number is a required field`
    })
});


/**
 * Middleware for validating payload data on registering a new user
 */
async function validUserSchema(req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body;

        const validateUser = userSchema.validate(userData);
        if (validateUser.error) {
            return res.send({
                StatusCode: 200,
                Status: "false",
                Message: validateUser.error.details[0].message,
                data: []
            })
        }
        next();
    } catch (error) {
        return res.send({ status: 200, message: error });
    }
}


export default validUserSchema;
