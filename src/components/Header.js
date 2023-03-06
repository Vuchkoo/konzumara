import React, { useContext, useState } from "react";
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
import { Context } from "../context/Context";
import { useForm } from "@mantine/form";

const Header = ({ cart, onRemove, onAdd, onMinus }) => {
  const [cartOpened, setCartOpened] = useState(false);
  const [signInOpened, setSignInOpened] = useState(false);
  const [signUpOpened, setSignUpOpened] = useState(false);
  // const [form, setForm] = useState({ email: "", password: "" });
  const [roleUser, setRoleUser] = useState(false);
  const [data, setData] = useState();
  const { user, setUser } = useContext(Context);

  const navigate = useNavigate();
  const theme = useMantineTheme();
  const form = useForm({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    form.setValues({ ...form, [e.target.name]: e.target.value });
    console.log(form.values);
  };

  return (
    <header>
      {!roleUser ? (
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
            onClick={() => setUser(false)}
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
          data={data}
          handleChange={handleChange}
          form={form}
          navigate={navigate}
          setUser={setUser}
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
          setSignInOpened={setSignInOpened}
          setSignUpOpened={setSignUpOpened}
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
