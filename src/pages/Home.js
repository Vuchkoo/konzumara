import Header from "../components/Header";
import { Grid, Text, Button, Card, Center, Flex, Image } from "@mantine/core";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
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
    console.log(item);
    setCart(item);
    // const itExists = cart.some((cart) => {
    //   return cart.id === item.id;
    // });
    // if (itExists) {
    //   setCart(
    //     cart?.map((cart) => {
    //       if (cart.id === item.id) {
    //         return { ...cart, quantity: cart.quantity + 1 };
    //       }
    //       return cart;
    //     })
    //   );
    // } else {
    //   return setCart([...cart, { ...item }]);
    // }
  };

  console.log(cart);

  return (
    <div>
      <Header cart={cart} />
      <div className="grid">
        <Sidebar />
        <div className="product-grid">
          <Grid mt={40}>
            {products?.map((item) => {
              return (
                <Card withBorder radius="md" className="product" m={5}>
                  <Image
                    src={item.image}
                    alt="item.title"
                    radius="md"
                    width={150}
                    height={150}
                  />
                  <Flex direction="column" justify="center" align="center">
                    <Text mt={10} weight={500}>
                      {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                      {item.description}
                    </Text>
                    <Text size="xl" weight={700}>
                      ${item.price.toFixed(2)}
                    </Text>
                    <Button
                      mt={10}
                      onClick={() => setCart([...cart, { ...item }])}
                    >
                      Add to cart
                    </Button>
                  </Flex>
                </Card>
              );
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

export default Home;
