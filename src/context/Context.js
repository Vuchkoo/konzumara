import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../config/Supabase";

export const Context = createContext(null);

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const value = {
    user,
    setUser,
    products,
    setProducts,
    categories,
    setCategories,
    loading,
    setLoading,
  };

  useEffect(() => {
    const getProducts = async () => {
      const { data, error } = await supabase.from("products").select();
      setProducts(data);
      setLoading(false);
    };

    const getCategories = async () => {
      const { data, error } = await supabase.from("categories").select();
      setCategories(data);
      setLoading(false);
    };

    if (loading) {
      setProducts(getProducts());
      setCategories(getCategories());
      // setLoading(true);
    }
  }, []);

  return (
    <Context.Provider value={value}>{!loading && children}</Context.Provider>
  );
};
