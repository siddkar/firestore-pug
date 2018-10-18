import { db } from '../config';
import { logger } from '../utils';

/**
 * Get all user details from firestore
 */
const getUserDetails = async () => {
    db.collection('CurrentUserDb').onSnapshot((snapshot) => {
        const changes = snapshot.docChanges();
        changes.forEach((change) => {
            logger.info(change.doc.data());
        });
    });
};

// userDao object
const userDao = {
    getUserDetails,
};

export default userDao;
