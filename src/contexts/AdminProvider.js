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

const reducer = (state, action) => {
  if (action.type === "GET_GOODS") {
    return {
      ...state,
      goods: action.payload,
    };
  }
  // if (action.type === "GET_GOODS_TO_EDIT") {
  //   return {
  //     ...state,
  //     watchToEdit: action.payload,
  //   };
  // }
  return state;
};

function AdminProvider({ children }) {
  const usersCollectionRef = collection(db, "goods");

  const [state, dispatch] = React.useReducer(reducer, {
    goods: [],
    goodsToEdit: null,
  });

  const sendNewGoods = async (newGoods) => {
    await addDoc(usersCollectionRef, {
      title: newGoods.title,
      price: Number(newGoods.price),
      brand: newGoods.brand,
      photo: newGoods.photo,
      country: newGoods.country,
    });
  };

  const getGoods = async () => {
    const data = await getDocs(usersCollectionRef);
    dispatch({
      type: "GET_GOODS",
      payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    });
  };

  const deleteGoods = async (id) => {
    // fetch(`${watchesApi}/${id}`, {
    //   method: "DELETE",
    // }).then(() => getWatches());
    const userDoc = doc(db, "goods", id);
    await deleteDoc(userDoc);
    getGoods();
  };

  const data = {
    countries1,
    countries2,
    getGoods,
    goods: state.goods,
    deleteGoods,
    sendNewGoods,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
