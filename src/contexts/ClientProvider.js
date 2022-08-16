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

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_GOODS") {
    return {
      ...state,
      goods: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const goodsCollectionRef = collection(db, "goods");

  const [state, dispatch] = React.useReducer(reducer, {
    goods: [],
  });

  const limit = 2;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const getGoods = async () => {
    const data = await getDocs(goodsCollectionRef);
    dispatch({
      type: "GET_GOODS",
      payload: data.docs.map((doc) => ({ ...doc.data() })),
    });
  };

  const data = {
    getGoods,
    goods: state.goods,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
