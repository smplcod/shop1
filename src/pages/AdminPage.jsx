import React from "react";
import { AdminContext } from "../contexts/AdminProvider";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

function AdminPage() {
  const { getGoods, goods, deleteGoods } = React.useContext(AdminContext);

  React.useEffect(() => {
    getGoods();
  }, []);

  return (
    <div className="admin-page">
      <Container>
        <h2>Admin all goods</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Photo</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goods.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.price} EUR</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>
                  <img width={100} src={item.photo} alt="" />
                </TableCell>
                <TableCell>
                  <Delete onClick={() => deleteGoods(item.id)} />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${item.id}`}>
                    <Edit />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminPage;
