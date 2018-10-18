import express from 'express';
import userRouter from './users';
import { logger } from '../utils';
import { firestoreImage } from '../controllers';

const router = express.Router();

// adding user routes
router.use('/users', userRouter);

/**
 * Route to render/get the home page.
 */
/* eslint-disable no-unused-vars */
router.get('/', (req, res, next) => {
    const homepageUrl = process.env.HOMEPAGE_URL;
    res.render('homepage', { title: 'Style Store', homepageUrl });
});

router.post('/', async (req, res) => {
    logger.info('Request Body: ', (req.body));
    const { ageDropDown: age } = req.body;
    const { genderDropDown: gender } = req.body;
    logger.info('Age is:', age, ' Gender is:', gender);
    const imgUrl = await firestoreImage.getImages();

    res.render('imagepage', {
        title: 'Images',
        age,
        gender,
        imgUrl,
    });
});

export default router;
