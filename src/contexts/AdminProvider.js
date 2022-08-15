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
  getDoc,
} from "firebase/firestore";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_GOODS") {
    return {
      ...state,
      goods: action.payload,
    };
  }
  if (action.type === "GET_GOODS_TO_EDIT") {
    return {
      ...state,
      goodsToEdit: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const goodsCollectionRef = collection(db, "goods");

  const [state, dispatch] = React.useReducer(reducer, {
    goods: [],
    goodsToEdit: null,
  });

  const sendNewGoods = async (newGoods) => {
    await addDoc(goodsCollectionRef, {
      title: newGoods.title,
      price: Number(newGoods.price),
      brand: newGoods.brand,
      photo: newGoods.photo,
      country: newGoods.country,
    }).then((docRef) => {
      const dRef = doc(db, "goods", docRef.id);
      updateDoc(dRef, { id: docRef.id });
    });
  };

  const getGoods = async () => {
    const data = await getDocs(goodsCollectionRef);
    dispatch({
      type: "GET_GOODS",
      // payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      payload: data.docs.map((doc) => ({ ...doc.data() })),
    });
  };

  const getGoodsToEdit = async (id) => {
    const docRef = doc(db, "goods", id);
    const docSnap = await getDoc(docRef);
    const res = docSnap.data();
    dispatch({
      type: "GET_GOODS_TO_EDIT",
      payload: res,
    });
  };

  const saveEditedGoods = async (id, newGoods) => {
    const goodsDoc = doc(db, "goods", id);
    await updateDoc(goodsDoc, newGoods);
  };

  const deleteGoods = async (id) => {
    const goodsDoc = doc(db, "goods", id);
    await deleteDoc(goodsDoc);
    getGoods();
  };

  const data = {
    countries1,
    countries2,
    getGoods,
    goods: state.goods,
    goodsToEdit: state.goodsToEdit,
    deleteGoods,
    sendNewGoods,
    getGoodsToEdit,
    saveEditedGoods,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
