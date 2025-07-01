// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage"; // ✅ Add this line

const firebaseConfig = {
  apiKey: "AIzaSyBer4nlf9q4yp-i1ljqzcaOhmBz1JwmsRQ",
  authDomain: "sharespace-e42d8.firebaseapp.com",
  projectId: "sharespace-e42d8",
  storageBucket: "sharespace-e42d8.appspot.com",
  messagingSenderId: "128283955443",
  appId: "1:128283955443:web:796a0a0700facca1e6e786",
  measurementId: "G-WS6SW80RBC"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app); // ✅ Initialize storage

export { auth, provider, storage }; // ✅ Export storage
