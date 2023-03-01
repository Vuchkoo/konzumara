import React, { useEffect, useState } from "react";
import {
  ActionIcon,
  Avatar,
  Button,
  Drawer,
  Group,
  Indicator,
  Modal,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cart from "./cart/Cart";
import SignIn from "./forms/SignIn";
import SignUp from "./forms/SignUp";

const Header = ({ cart, onRemove, onAdd, onMinus }) => {
  const [cartOpened, setCartOpened] = useState(false);
  const [signInOpened, setSignInOpened] = useState(false);
  const [signUpOpened, setSignUpOpened] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [user, setUser] = useState();
  const [data, setData] = useState(false);

  const navigate = useNavigate();
  const theme = useMantineTheme();

  useEffect(() => {
    axios(`/user.json`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(user);

  return (
    <header>
      {!data ? (
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
            <Indicator
              position="bottom-end"
              label={cart.length}
              size={14}
              showZero={false}
              onClick={() => setCartOpened(true)}
            >
              <IconShoppingCart />
            </Indicator>
          </ActionIcon>
        </Group>
      ) : (
        <Group position="right">
          <Avatar radius="xl" size="md" src={null} color="green" />
          <Text>test@test.com</Text>
          <Button
            color="red"
            variant="light"
            uppercase
            onClick={() => setData(false)}
          >
            SIGN OUT
          </Button>
          <ActionIcon mr={20}>
            <Indicator
              position="bottom-end"
              label={cart.length}
              size={14}
              showZero={false}
              onClick={() => setCartOpened(true)}
            >
              <IconShoppingCart />
            </Indicator>
          </ActionIcon>
        </Group>
      )}
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
          user={user}
          handleChange={handleChange}
          form={form}
          navigate={navigate}
          setData={setData}
          setSignInOpened={setSignInOpened}
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
          user={user}
          handleChange={handleChange}
          form={form}
          navigate={navigate}
        />
      </Modal>
      <Drawer
        opened={cartOpened}
        onClose={() => setCartOpened(false)}
        padding="xl"
        size="xl"
        position="right"
      >
        {/* Drawer content */}
        <Cart cart={cart} onRemove={onRemove} onAdd={onAdd} onMinus={onMinus} />
      </Drawer>
    </header>
  );
};

export default Header;
