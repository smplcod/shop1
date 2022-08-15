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
  const [goods, setGoods] = useState([]);
  const usersCollectionRef = collection(db, "goods");

  const sendNewGoods = async (newGoods) => {
    await addDoc(usersCollectionRef, {
      title: newGoods.title,
      price: Number(newGoods.price),
      brand: newGoods.brand,
      photo: newGoods.photo,
      country: newGoods.country,
    });
  };

  useEffect(() => {
    const getGoods = async () => {
      const data = await getDocs(usersCollectionRef);
      setGoods(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    // getGoods();
  }, []);

  const data = {
    countries1,
    countries2,
    sendNewGoods,
    goods,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
