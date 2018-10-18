import express from 'express';
import { userDao } from '../controllers';

const userRouter = express.Router();

/**
 * Route to get all user listings.
 */
/* eslint-disable no-unused-vars */
userRouter.get('/', async (req, res, next) => {
    res.render('users', { users: await userDao.getUserDetails() });
});

export default userRouter;
