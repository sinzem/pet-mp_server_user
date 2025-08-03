import express from 'express';
import userRouter from '../entities/user/userRouter';
import mailerRouter from '../entities/mailer/mailerRouter';
import authRouter from '../entities/autorization/authRouter';

const router = express.Router()

router.use('/user', userRouter);
router.use('/mailer', mailerRouter);
router.use('/auth', authRouter)

export default router;