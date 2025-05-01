// import { initializeApp, getApps, getApp } from "firebase/app";

// // Your Firebase configuration
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: "mern-auth-803f1.firebaseapp.com",
//     projectId: "mern-auth-803f1",
//     storageBucket: "mern-auth-803f1.appspot.com",
//     messagingSenderId: "264213743920",
//     appId: "1:264213743920:web:cda328d92d80e0e105e0f5"
// };

// // Use existing app if already initialized
// export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // ✅ Import this

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-803f1.firebaseapp.com",
    projectId: "mern-auth-803f1",
    storageBucket: "mern-auth-803f1.appspot.com",
    messagingSenderId: "264213743920",
    appId: "1:264213743920:web:cda328d92d80e0e105e0f5"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app); // ✅ Create storage instance

export { app, storage }; // ✅ Export it