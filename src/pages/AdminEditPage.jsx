import React from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { AdminContext } from "../contexts/AdminProvider";
import { useParams } from "react-router-dom";

function AdminEditPage() {
  const { id } = useParams();

  const {
    sendNewGoods,
    countries1,
    getGoodsToEdit,
    goodsToEdit,
    saveEditedGoods,
  } = React.useContext(AdminContext);

  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [country, setCountry] = React.useState("");

  const handleSubmit = () => {
    const newGoods = {
      title: title.trim(),
      price,
      brand: brand.trim(),
      photo: photo.trim(),
      country: country.trim(),
    };

    for (let i in newGoods) {
      if (!newGoods[i]) {
        alert("All fields must be filled!");
        return;
      }
    }
    saveEditedGoods(id, newGoods);
    setTitle("");
    setPrice("");
    setBrand("");
    setPhoto("");
    setCountry("");
  };

  React.useEffect(() => {
    getGoodsToEdit(id);
  }, []);

  React.useEffect(() => {
    if (goodsToEdit) {
      setTitle(goodsToEdit.title);
      setPrice(goodsToEdit.price);
      setBrand(goodsToEdit.brand);
      setPhoto(goodsToEdit.photo);
      setCountry(goodsToEdit.country);
    }
  }, [goodsToEdit]);
  // console.log(goodsToEdit);
  return (
    <div className="admin-edit-page">
      <Container>
        <h2>Edit goods</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            label="Price"
            variant="standard"
            type="number"
          />
          <TextField
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            label="Brand"
            variant="standard"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Photo"
            variant="standard"
          />
          <FormControl variant="standard">
            <InputLabel>Country</InputLabel>
            <Select
              defaultValue={country}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              label="Country"
            >
              {countries1.map((item, key) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" type="submit">
            Edit goods
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminEditPage;
