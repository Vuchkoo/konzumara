import { Button, Drawer } from "@mantine/core";
import React, { useState } from "react";

const Cart = () => {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <>
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
    </>
  );
};

export default Cart;
