import {
  Box,
  Button,
  Center,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAt } from "@tabler/icons";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(Context);
  const form = useForm({ initialValues: { email: "", password: "" } });
  const { email, password } = form.values;

  const onSignInSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      alert("Invalid email or password");
    } else {
      setUser(data.session);
      navigate("products");
    }
  };

  return (
    <Center style={{ height: 600 }}>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={onSignInSubmit}>
          <TextInput
            name="email"
            label="Email"
            rightSection={<IconAt size={14} color="gray" />}
            placeholder="Email"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            name="password"
            mt="md"
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />

          <Group position="center" mt="md">
            <Button type="submit" uppercase>
              Sign in
            </Button>
          </Group>
        </form>
      </Box>
    </Center>
  );
};

export default AdminSignIn;
