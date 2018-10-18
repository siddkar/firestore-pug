import { storage } from '../config';
import { logger } from '../utils';

const getImages = async () => {
    // Create a reference to the file we want to download
    const url = '0-2years/Female/71dSGY6iT8L._UX522_.jpg';
    let downloadUrl;
    try {
        downloadUrl = await storage.child(url).getDownloadURL();
        logger.info('URL is', downloadUrl);
    } catch (err) {
        logger.error(err);
    }
    /* fetch(downloadUrl).then((response) => {
        if (response.ok) {
            return response.blob();
        }
    }).then((myBlob) => {
        const objectURL = URL.createObjectURL(myBlob);
        logger.info(`Object URL: ${objectURL}`);
    }).catch(err => logger.error(err)); */
    return downloadUrl;
};

const fetchImage = {
    getImages,
};

export default fetchImage;
