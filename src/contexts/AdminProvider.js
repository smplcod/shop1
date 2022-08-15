import React from "react";
import { countries1, countries2 } from "../helpers/Countries";
import { db } from "../helpers/FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const AdminContext = React.createContext();

function AdminProvider({ children }) {
  const arr = [1, 2, 3];
  const transferArr = (arg) => {
    return arg;
  };
  const data = {
    arr,
    transferArr,
    countries1,
    countries2,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
