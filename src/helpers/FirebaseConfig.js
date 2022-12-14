import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2udzNjPVBULO_Jo8xOQF_vzFg7qRCCrQ",
  authDomain: "shop-1-mirrow.firebaseapp.com",
  projectId: "shop-1-mirrow",
  storageBucket: "shop-1-mirrow.appspot.com",
  messagingSenderId: "585595896237",
  appId: "1:585595896237:web:60a2e8238b8eeace022124",
};

const app = initializeApp(firebaseConfig);

// auth
export const auth = getAuth(app);
// auth end

export const db = getFirestore();
