import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { db } from "./FirebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Button, TextField } from "@mui/material";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };

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
      <TextField
        onChange={(e) => {
          setNewName(e.target.value);
        }}
        placeholder="Name..."
        variant="standard"
      />
      <TextField
        onChange={(e) => {
          setNewAge(e.target.value);
        }}
        type="number"
        placeholder="Age..."
        variant="standard"
      />
      <Button onClick={createUser} variant="outlined">
        Create User
      </Button>
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
