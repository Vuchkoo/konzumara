import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React, { useState } from "react";
import { supabase } from "../../config/Supabase";

// const SignIn = ({ data, form, handleChange, setUser, setSignInOpened }) => {
const SignIn = ({ form, setSignInOpened, setUser }) => {
  const { email, password } = form.values;

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      alert("Invalid email or password");
    } else {
      setUser(data.user);
      setSignInOpened(false);
      console.log(data.user);
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={handleSignIn}>
        <TextInput
          label="Email"
          rightSection={<IconAt size={14} color="gray" />}
          placeholder="Email"
          {...form.getInputProps("email")}
        />

        <PasswordInput
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
  );
};

export default SignIn;
