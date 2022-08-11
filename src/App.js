import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { db } from "./FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  // return <Navigation />;
  return (
    <div className="App">
      {users.map((user) => {
        return (
          <div key={user.id}>
            <h2>Name: {user.name}</h2>
            <h3>Age: {user.age}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default App;
