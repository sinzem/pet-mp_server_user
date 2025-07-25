import express from 'express';
import userRouter from "../entities/user/userRouter";

const router = express.Router()

router.use('/user', userRouter);

export default router;