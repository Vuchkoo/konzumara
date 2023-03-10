import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React from "react";
import { supabase } from "../../config/Supabase";

const SignUp = ({ form, setSignInOpened, setSignUpOpened, navigate }) => {
  const { fullName, email, password, isAdmin } = form.values;

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
          role: isAdmin ? "admin" : "user",
        },
      },
    });
    if (isAdmin) {
      navigate("/admin");
    } else {
      setSignUpOpened(false);
      setSignInOpened(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSignUp)}>
        <TextInput
          label="Full name"
          placeholder="Your full name"
          withAsterisk
          mr={20}
          style={{ width: 300 }}
          {...form.getInputProps("fullName")}
        />

        <TextInput
          label="Email"
          placeholder="Your email"
          rightSection={<IconAt size={14} color="gray" />}
          withAsterisk
          mt="md"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          withAsterisk
          mt="md"
          {...form.getInputProps("password")}
        />

        <Checkbox
          label="is Admin"
          mt="md"
          {...form.getInputProps("isAdmin", { type: "checkbox" })}
        />

        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUp;
