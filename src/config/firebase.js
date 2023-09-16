
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDlZVUSEuH5KnZKfMndvdpce0xpJ3DtsCA",
  authDomain: "giritara-admin-web.firebaseapp.com",
  projectId: "giritara-admin-web",
  storageBucket: "giritara-admin-web.appspot.com",
  messagingSenderId: "38332971700",
  appId: "1:38332971700:web:e4bb90bec298c759d875e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fileStore= getStorage(app);
const metaDataStore = getFirestore(app);

export {fileStore , metaDataStore};