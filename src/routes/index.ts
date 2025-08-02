import express from 'express';
import userRouter from '../entities/user/userRouter';
import mailerRouter from '../entities/mailer/mailerRouter';

const router = express.Router()

router.use('/user', userRouter);
router.use('/mailer', mailerRouter);

export default router;