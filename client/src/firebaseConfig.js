import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDB-p4L4KHy8QKQHVBqB8RLtRaZcC8jwUw",
    authDomain: "agri-connect-system.firebaseapp.com",
    projectId: "agri-connect-system",
    storageBucket: "agri-connect-system.appspot.com",
    messagingSenderId: "914041882301",
    appId: "1:914041882301:web:8077818ddf01d10c8819d4"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)