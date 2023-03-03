import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const value = { user, setUser, products, setProducts, loading, setLoading };

  useEffect(() => {
    axios(`/product.json`)
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
    axios(`/user.json`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
