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
  return state;
};

function ClientProvider({ children }) {
  const goodsCollectionRef = collection(db, "goods");

  const [state, dispatch] = React.useReducer(reducer, {
    goods: [],
  });

  const limitPerPage = 8;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [last, setLast] = React.useState(null);
  console.log(currentPage);
  const getGoods = async () => {
    const first = query(collection(db, "goods"));
    const data = await getDocs(first);
    // Task  Посчитать кол-во страниц
    const totalPages = Math.ceil(data.docs.length / limitPerPage);
    console.log(totalPages);

    const newData =
      // const data = await getDocs(goodsCollectionRef);

      // const q1 = query(
      //   goodsCollectionRef,
      //   startAfter(currentPage),
      //   limit(limitPerPage)
      // );
      // const querySnapshot = await getDocs(q1);

      dispatch({
        type: "GET_GOODS",
        payload: data.docs.map((doc) => ({ ...doc.data() })),
      });
  };

  const handlePagination = async () => {
    const next = query(collection(db, "goods"), startAfter(last), limit(6));
    const data = await getDocs(next);
    const lastVisible = data.docs[data.docs.length - 1];
    setLast(lastVisible);
    dispatch({
      type: "GET_GOODS",
      payload: data.docs.map((doc) => ({ ...doc.data() })),
    });
  };

  const data = {
    getGoods,
    goods: state.goods,
    handlePagination,
    setCurrentPage,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
