import { Router } from "express";
import { validaSchema } from "../middlewares/validateSchemaMiddleware";
import { signIn, signUp, deleteSession } from "../controllers/authController";

import signInSchema from "../schemas/signInSchema";
import signUpSchema from "../schemas/signUpSchema";

const authRouter = Router();

authRouter.post("/sign-up", validaSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validaSchema(signInSchema), signIn);
authRouter.delete("/delete-session/:tokenNumber", deleteSession);

export default authRouter;