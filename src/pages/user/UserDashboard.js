import React, { useEffect, useState } from "react";
import Header from "../../components/user/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Center, Grid } from "@mantine/core";
import axios from "axios";
import ProductCard from "../../components/ProductCard";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios(`/product.json`)
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      return setCart([...cart, { ...item }]);
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

  console.log(cart);

  return (
    <div>
      <Header cart={cart} onRemove={handleRemoveFromCart} />
      <div className="grid">
        <Sidebar />
        <div className="product-grid">
          <Grid mt={40}>
            {products?.map((item) => {
              return <ProductCard item={item} onAdd={handleAddToCart} />;
            })}
          </Grid>
          <Center mt={50}>
            <Button color="green">Load more</Button>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
