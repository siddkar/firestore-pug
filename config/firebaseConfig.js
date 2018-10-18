import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';
import { logger } from '../utils';

// Initialize Firebase
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

// initialize firebase
firebase.initializeApp(config);

// getting instance of firestore
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

logger.info({ message: 'Connected Firestore Database!!!' });

// connecting Firestore Storage
// Get a reference to the storage service, which is used to create references in your storage bucket
// Create a storage reference from our storage service
const storage = firebase.storage().ref();
logger.info({ message: 'Connected Firestore Storage!!!' });

export { db, storage };
