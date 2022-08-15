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

  // const [goods, setGoods] = useState([]);
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
    // setGoods(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    dispatch({
      type: "GET_GOODS",
      payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    });
  };
  // getGoods();

  const data = {
    countries1,
    countries2,
    // sendNewGoods,
    goods: state.goods,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
