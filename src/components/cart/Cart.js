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
import React, { useContext } from "react";
import { Context } from "../../context/Context";

const Cart = ({
  cart,
  onRemove,
  onAdd,
  onMinus,
  setSignInOpened,
  totalPrice,
  onOrderSubmit,
}) => {
  const { user } = useContext(Context);

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
              <div key={item.id} className="cart-card">
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
                  {!item.is_sale ? (
                    <Text mt={10} mb={10} weight={700}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  ) : (
                    <>
                      <Text mt={10} size="sm" strikethrough>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Text>
                      <Text mb={10} weight={700}>
                        ${(item.sale_price * item.quantity).toFixed(2)}
                      </Text>
                    </>
                  )}
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
            <h4>${totalPrice.toFixed(2)}</h4>
          </div>
        </div>
        {!user ? (
          <Button onClick={() => setSignInOpened(true)} color="green" fullWidth>
            ORDER
          </Button>
        ) : (
          <Button onClick={onOrderSubmit} color="green" fullWidth>
            ORDER
          </Button>
        )}
      </div>
    </>
  );
};

export default Cart;
