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

  const onSignInSubmit = (e) => {
    e.preventDefault();
    navigate("/user/dashboard");
    console.log(form);
  };

  const onSignUpSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };
  console.log(data);

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
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={onSignInSubmit}>
            <TextInput
              name="email"
              label="Email"
              onChange={handleChange}
              rightSection={<IconAt size={14} color="gray" />}
              placeholder="Email"
              // {...form.getInputProps("email")}
              // onChange={(event) => setForms(event.currentTarget.value)}
            />

            <PasswordInput
              name="password"
              mt="md"
              label="Password"
              onChange={handleChange}
              placeholder="Password"
              // {...form.getInputProps("password")}
            />

            <Group position="center" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
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
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={onSignUpSubmit}>
            <Flex>
              <TextInput
                name="firstName"
                label="First name"
                placeholder="Your first name"
                withAsterisk
                onChange={handleChange}
                mr={20}
              />

              <TextInput
                name="lastName"
                label="Last name"
                placeholder="Your last name"
                withAsterisk
                onChange={handleChange}
              />
            </Flex>

            <TextInput
              name="email"
              label="Email"
              placeholder="Your email"
              rightSection={<IconAt size={14} color="gray" />}
              withAsterisk
              mt="md"
              onChange={handleChange}
            />

            <PasswordInput
              name="password"
              label="Password"
              placeholder="Password"
              withAsterisk
              mt="md"
              onChange={handleChange}
              // {...form.getInputProps("password")}
            />

            <Group position="center" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
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
        <div className="cart-main">
          <div className="cart-card">
            <div className="cart-item">
              <img alt="test" style={{ width: "100px", height: "150px" }} />
              <div className="item-details">
                <h3>Title</h3>
                <p>Description</p>
                <p>Quantity: ?</p>
              </div>{" "}
            </div>
            <div className="item-quantity">
              <Button variant="light" compact color="dark" size="xs">
                x
              </Button>
              <h3>$$$</h3>
              <Button>-</Button>
              <Button>+</Button>
            </div>
          </div>
        </div>
        <div className="cart-footer">
          <div className="price">
            <h3>SUBTOTAL</h3>
            <div>
              <h4>$</h4>
            </div>
          </div>
          <Button color="green">ORDER</Button>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
