import React, { useEffect, useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Group,
  Modal,
  PasswordInput,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconAt, IconShoppingCart } from "@tabler/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cart from "./cart/Cart";
import SignIn from "./forms/SignIn";
import SignUp from "./forms/SignUp";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <header>
      <Group position="right">
        <Button color="green" uppercase onClick={() => setSignInOpened(true)}>
          SIGN IN
        </Button>
        <Button
          variant="light"
          color="green"
          uppercase
          onClick={() => setSignUpOpened(true)}
        >
          SIGN UP
        </Button>
        <ActionIcon mr={20}>
          <IconShoppingCart onClick={() => setCartOpened(true)} />
        </ActionIcon>
      </Group>
      <Modal
        opened={signInOpened}
        onClose={() => setSignInOpened(false)}
        title="Please sign in!"
        centered
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {/* Modal content */}
        <SignIn
          data={data}
          handleChange={handleChange}
          form={form}
          navigate={navigate}
        />
      </Modal>
      <Modal
        opened={signUpOpened}
        onClose={() => setSignUpOpened(false)}
        title="Sign up!"
        centered
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        {/* Modal content */}
        <SignUp
          data={data}
          handleChange={handleChange}
          form={form}
          navigate={navigate}
        />
      </Modal>
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
