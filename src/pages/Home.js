import Header from "../components/Header";
import { Grid, Button, Center } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Context } from "../context/Context";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState();
  const { user, setUser, products, setProducts } = useContext(Context);
  const [index, setIndex] = useState(10);

  const handleAddToCart = (e, item) => {
    const itExists = cart.some((cart) => {
      return cart.id === item.id;
    });
    if (itExists) {
      setCart(
        cart?.map((cart) => {
          if (cart.id === item.id) {
            return { ...cart, quantity: cart.quantity + 1 };
          }
          return cart;
        })
      );
    } else {
      return setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (e, id) => {
    setCart([
      ...cart.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      }),
    ]);
  };

  const handleRemoveQuantity = (e, item) => {
    const itExists = cart.some((cart) => {
      return cart.id === item.id;
    });
    if (itExists) {
      setCart(
        cart.map((cart) => {
          if (cart.id === item.id && cart.quantity > 1) {
            return { ...cart, quantity: cart.quantity - 1 };
          }
          return cart;
        })
      );
    }
  };

  const onSearchChange = (e) => {
    setSearch({ [e.target.name]: e.target.value });
    console.log(search);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      console.log(search);
    }
  };

  const handleLoadMore = () => {
    setIndex((prevIndex) => prevIndex + 10);
  };

  return (
    <div>
      <Header
        cart={cart}
        onRemove={handleRemoveFromCart}
        onAdd={handleAddToCart}
        onMinus={handleRemoveQuantity}
      />
      <div className="grid">
        <Sidebar
          products={products}
          onEnter={onEnter}
          onChange={onSearchChange}
        />
        <div className="product-grid">
          <Grid mt={40}>
            {products?.slice(0, index).map((item, index) => {
              return (
                <ProductCard key={index} item={item} onAdd={handleAddToCart} />
              );
            })}
          </Grid>
          <Center mt={50}>
            {index < products?.length ? (
              <Button color="green" onClick={handleLoadMore}>
                Load more
              </Button>
            ) : (
              <Button color="green" disabled>
                Load more
              </Button>
            )}
          </Center>
        </div>
      </div>
    </div>
  );
};

export default Home;
