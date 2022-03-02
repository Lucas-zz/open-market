import joi from "joi";

const signInSchema = joi.object({
    email: joi.string().email().trim().required(),
    password: joi.string().min(6).required(),
});

export default signInSchema;