import React from "react";
import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Pagination,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";

function MainPage() {
  const { getGoods, goods, totalPagesCount, limitPerPage, searchWord } =
    React.useContext(ClientContext);

  const [current, setCurrent] = React.useState(1);
  const [products, setProducts] = React.useState(goods);

  const handlePagination = () => {
    const arr = [...goods];
    let prod = undefined;
    prod = arr.splice((current - 1) * limitPerPage, limitPerPage);
    if (searchWord) {
      prod = prod.filter((item) => {
        return item.title.includes(searchWord);
      });
    }
    setProducts(prod);
  };
  console.log(goods);

  const handleSearch = () => {
    const arr = [...products];
    // const prod = arr.splice((current - 1) * limitPerPage, limitPerPage);

    // const prod = arr
    //   .map((item, i) => (item.indexOf(searchWord) >= 0 ? i : -1))
    //   .filter((item) => item >= 0);
    // console.log(searchWord);

    // setProducts(res);

    // setProducts(res);
  };

  React.useEffect(() => {
    getGoods();
  }, []);

  React.useEffect(() => {
    handlePagination();
  }, [goods, current, searchWord]);

  // React.us
  // Toastify({
  //   text: "This is a toast with offset",
  //   offset: {
  //     x: 50,
  //     y: 10,
  //   },
  // }).showToast();

  return (
    <div className="main-page">
      <Container>
        <h2>All rollerskates</h2>
        {/* <div className="filter-block">
          <h4>Filter by price:</h4>
          <Slider
            max={minMax[1]}
            min={minMax[0]}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(_, newValue) => setFilterByPrice(newValue)}
          />
        </div> */}
        <div className="products">
          {products.map((item) => (
            <Card key={item.id} className="product-card">
              <CardMedia component="img" height="140" image={item.photo} />
              <CardContent>
                <Typography
                  className="product-card-title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.title}
                </Typography>
                <ul className="product-card-ul">
                  <li>
                    <span>Brand:</span>
                    <span>{item.brand}</span>
                  </li>
                  <li>
                    <span>Country:</span>
                    <span>{item.country}</span>
                  </li>
                  <li>
                    <span>Price:</span>
                    <span>{item.price} EUR</span>
                  </li>
                </ul>
                {/* <Button
                  onClick={() => addWatchToBasket(item)}
                  variant="outlined"
                >
                  Добавить в корзину
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pagination-block">
          <Pagination
            onChange={(_, value) => setCurrent(value)}
            count={totalPagesCount}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
