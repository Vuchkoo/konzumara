import {
  Button,
  Flex,
  Group,
  Image,
  Indicator,
  ScrollArea,
  Text,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import React from "react";

const Cart = ({ cart, onRemove, onAdd, onMinus }) => {
  // console.log(cart);
  return (
    <>
      <Group position="center" pb={10}>
        <Text>Cart</Text>
        <Indicator
          position="bottom-end"
          label={cart.length}
          size={14}
          showZero={false}
        >
          <Flex justify="center" align="center">
            <IconShoppingCart />
          </Flex>
        </Indicator>
      </Group>
      <ScrollArea
        style={{ height: 500 }}
        scrollbarSize={8}
        scrollHideDelay={1500}
      >
        <div className="cart-main">
          {cart.map((item) => {
            return (
              <div key={item.name} className="cart-card">
                <div className="cart-item">
                  <Image
                    src={item.image}
                    alt={item.name}
                    radius="md"
                    width={80}
                    height={100}
                  />
                  <Flex
                    direction="column"
                    justify="center"
                    className="item-details"
                  >
                    <Text>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                  </Flex>
                </div>
                <div className="item-quantity">
                  <Button
                    variant="light"
                    compact
                    color="dark"
                    size="xs"
                    onClick={(e) => onRemove(e, item.id)}
                  >
                    x
                  </Button>
                  <h3>${(item.price * item.quantity).toFixed(2)}</h3>
                  <Button onClick={(e) => onMinus(e, item)}>-</Button>
                  <Button onClick={(e) => onAdd(e, item)}>+</Button>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="cart-footer">
        <div className="price">
          <h3>SUBTOTAL</h3>
          <div>
            <h4>
              $
              {cart
                .reduce((acc, cart) => {
                  return cart.quantity * cart.price + acc;
                }, 0)
                .toFixed(2)}
            </h4>
          </div>
        </div>
        <Button color="green" fullWidth>
          ORDER
        </Button>
      </div>
    </>
  );
};

export default Cart;
