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

  return (
    <header>
      <Group position="right">
        <Button color="green" uppercase onClick={() => navigate("/")}>
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
