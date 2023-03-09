import { LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/Supabase";

export const Context = createContext(null);

const Loading = () => {
  return <LoadingOverlay visible={true} overlayBlur={2} />;
};

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [minLoadProducts, setMinLoadProducts] = useState(0);
  const [maxLoadProducts, setMaxLoadProducts] = useState(9);
  const [productsCount, setProductsCount] = useState(null);

  const productForm = useForm({
    initialValues: {
      name: "",
      description: "",
      price: undefined,
      is_sale: undefined,
      sale_price: undefined,
      image: undefined,
      quantity: undefined,
      category_id: undefined,
    },
  });

  const value = {
    products,
    setProducts,
    categories,
    setCategories,
    loading,
    setLoading,
    productForm,
    user,
    setUser,
    minLoadProducts,
    setMinLoadProducts,
    maxLoadProducts,
    setMaxLoadProducts,
    productsCount,
  };

  const getProducts = async () => {
    const { data, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .range(minLoadProducts, maxLoadProducts);
    setProducts(data);
    setProductsCount(count);
    setLoading(false);
  };

  const getCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select();
    setCategories(data);
    setLoading(false);
  };

  const getSession = async () => {
    supabase.auth.getSession().then(({ data }) => {
      // console.log(data);

      if (data && data.session) {
        setUser(data.session.user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event.session);
      if (event === "SIGNED_IN") {
        setUser(session);
        setLoading(false);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    getProducts();
    getCategories();
    getSession();
  }, [minLoadProducts, maxLoadProducts]);

  return (
    <Context.Provider value={value}>
      {!loading ? children : <Loading />}
    </Context.Provider>
  );
};

// const AuthContext = createContext({ user: null, setUser: () => {} });

// export const useAuth = () => {
//   const auth = useContext(AuthContext);
//   return auth;
// };
