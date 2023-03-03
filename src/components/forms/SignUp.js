import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React from "react";
import { supabase } from "../../config/Supabase";

const SignUp = ({ form, handleChange, setSignInOpened, setSignUpOpened }) => {
  const { fullName, email, password } = form.values;

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    setSignUpOpened(false);
    setSignInOpened(true);
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSignUp)}>
        <TextInput
          name="fullName"
          label="Full name"
          placeholder="Your full name"
          withAsterisk
          onChange={handleChange}
          mr={20}
          style={{ width: 300 }}
          // {...form.getInputProps("fullName")}
        />

        <TextInput
          name="email"
          label="Email"
          placeholder="Your email"
          rightSection={<IconAt size={14} color="gray" />}
          withAsterisk
          mt="md"
          onChange={handleChange}
          // {...form.getInputProps("email")}
        />

        <PasswordInput
          name="password"
          label="Password"
          placeholder="Password"
          withAsterisk
          mt="md"
          onChange={handleChange}
          // // {...form.getInputProps("password")}
          // {...form.getInputProps("password")}
        />

        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUp;
