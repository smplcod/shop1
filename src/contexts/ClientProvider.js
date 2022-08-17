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
  query,
  orderBy,
  startAt,
  limit,
  startAfter,
} from "firebase/firestore";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_GOODS") {
    return {
      ...state,
      goods: action.payload,
    };
  }
  if (action.type === "GET_PAGES_COUNT") {
    return {
      ...state,
      totalPagesCount: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const goodsCollectionRef = collection(db, "goods");

  const [state, dispatch] = React.useReducer(reducer, {
    goods: [],
    totalPagesCount: 1,
  });

  const [searchWord, setSearchWord] = React.useState("");
  const [prodLength, setProdLength] = React.useState(undefined);

  const limitPerPage = 6;
  // const [last, setLast] = React.useState(null);

  const getGoods = async () => {
    const first = query(collection(db, "goods"));
    const data = await getDocs(first);
    if (prodLength === undefined) setProdLength(data.docs.length);
    // const totalPagesCount = Math.ceil(setProdLength / limitPerPage);
    dispatch({
      type: "GET_GOODS",
      payload: data.docs.map((doc) => ({ ...doc.data() })),
    });
    dispatch({
      type: "GET_PAGES_COUNT",
      payload: Math.ceil(data.docs.length / limitPerPage),
    });
  };

  const data = {
    getGoods,
    limitPerPage,
    goods: state.goods,
    totalPagesCount: state.totalPagesCount,
    setSearchWord,
    searchWord,
    setProdLength,
    prodLength,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
