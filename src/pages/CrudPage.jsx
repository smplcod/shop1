import React from "react";
import { useState, useEffect } from "react";
import Navigation from "../Router";
import { db } from "../FirebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Button, TextField } from "@mui/material";

function CrudPage() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
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
            <Button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase Age
            </Button>
            <Button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete User
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default CrudPage;
