import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC19Y4Xmf-8UxaP0i-hHBVkULYWrkp26qY",
  authDomain: "fir-24e69.firebaseapp.com",
  projectId: "fir-24e69",
  storageBucket: "fir-24e69.appspot.com",
  messagingSenderId: "481982640298",
  appId: "1:481982640298:web:7dccc61e19a934832320d3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export default app;
