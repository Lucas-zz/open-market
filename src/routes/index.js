import { Router } from 'express';
import authRouter from './authRouter.js';
import productRouter from './productRouter.js';

const router = Router();

router.use(authRouter);
router.use(productRouter);

export default router;