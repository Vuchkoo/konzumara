import { LoadingOverlay } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/Supabase";

export const Context = createContext({ user: null, setUser: () => {} });

const Loading = () => {
  return <LoadingOverlay visible overlayBlur={2} />;
};

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    loading,
    setLoading,
    productForm,
    user,
    setUser,
  };

  const getSession = async () => {
    supabase.auth.getSession().then(({ data }) => {
      console.log(data, "nesto");
      if (data && data.session) {
        setUser(data.session.user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };
  const onAuthStateChange = async () => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === "SIGNED_IN") {
        setUser(session.user);
        setLoading(false);
      }
      if (event === "SIGNED_OUT") {
        setUser(null);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    onAuthStateChange();
    getSession();
  }, []);

  console.log(loading);

  return (
    <Context.Provider value={value}>
      {!loading ? children : <Loading />}
      {/* {!loading && children} */}
    </Context.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(Context);
  return auth;
};
