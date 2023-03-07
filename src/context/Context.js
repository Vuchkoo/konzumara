import { Center, Loader, LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../config/Supabase";

export const Context = createContext(null);

const Loading = () => {
  return <LoadingOverlay visible={true} overlayBlur={2} />;
};

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
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
  };

  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      const { data, error } = await supabase.from("products").select();
      setProducts(data);
      setLoading(false);
    };

    const getCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("categories").select();
      setCategories(data);
      setLoading(false);
    };

    getProducts();
    getCategories();
  }, []);

  return (
    <Context.Provider value={value}>
      {!loading ? children : <Loading />}
    </Context.Provider>
  );
};
