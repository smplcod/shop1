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

function AdminAddPage() {
  const { arr, transferArr, countries1, countries2 } =
    React.useContext(AdminContext);

  const [title, setTitle] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [country, setCountry] = React.useState("");

  return (
    <div className="admin-add-page">
      <Container>
        <h2>Adding goods</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handleSubmit();
          }}
        >
          <TextField
            value={title}
            // onChange={(e) => setTitle(e.target.value)}
            label="Title"
            variant="standard"
          />
          <TextField
            value={brand}
            // onChange={(e) => setBrand(e.target.value)}
            label="Brand"
            variant="standard"
          />
          <TextField
            value={price}
            // onChange={(e) => setPrice(parseInt(e.target.value))}
            label="Price"
            variant="standard"
            type="number"
          />
          <TextField
            value={photo}
            // onChange={(e) => setPhoto(e.target.value)}
            label="Photo"
            variant="standard"
          />
          <FormControl variant="standard">
            <InputLabel>Country</InputLabel>
            <Select
              value={country}
              // onChange={(e) => setCountry(e.target.value)}
              label="Country"
            >
              {countries2.map((item, key) => (
                <MenuItem key={item} value={item}>
                  {countries1[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" type="submit">
            Add goods
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminAddPage;
