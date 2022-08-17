import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2VJX8an34O6ib252r5lCxkDSe71PDrss",
  authDomain: "smplcod-shop-1.firebaseapp.com",
  projectId: "smplcod-shop-1",
  storageBucket: "smplcod-shop-1.appspot.com",
  messagingSenderId: "809316262376",
  appId: "1:809316262376:web:8497f3eeacc8746b5b445d",
  measurementId: "G-LNGJZQR2ZQ",
};

const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);
// auth end

export const db = getFirestore();
