import React, { useEffect, useState } from "react";
import { ActionIcon, Avatar, Button, Drawer, Group, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";

const Header = () => {
  const [cartOpened, setCartOpened] = useState(false);
  const [data, setData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios(`/user.json`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <header>
      <Group position="right">
        <Avatar radius="xl" size="md" src={null} color="green" />
        <Text>test@test.com</Text>
        <Button
          color="red"
          variant="light"
          uppercase
          onClick={() => navigate("/")}
        >
          SIGN OUT
        </Button>
        <ActionIcon mr={20}>
          <IconShoppingCart onClick={() => setCartOpened(true)} />
        </ActionIcon>
      </Group>
      <Drawer
        opened={cartOpened}
        onClose={() => setCartOpened(false)}
        title="Cart"
        padding="xl"
        size="xl"
        position="right"
      >
        {/* Drawer content */}
        <Cart />
      </Drawer>
    </header>
  );
};

export default Header;
