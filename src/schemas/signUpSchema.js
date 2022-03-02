import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().min(3).lowercase().trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().min(6).required(),
});

export default signUpSchema;