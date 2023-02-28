import React, { useEffect, useState } from "react";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Drawer,
  Flex,
  Group,
  Modal,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconAt, IconShoppingCart } from "@tabler/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";

const Header = () => {
  const [cartOpened, setCartOpened] = useState(false);
  const [signInOpened, setSignInOpened] = useState(false);
  const [signUpOpened, setSignUpOpened] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [data, setData] = useState();

  const navigate = useNavigate();
  const theme = useMantineTheme();

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
