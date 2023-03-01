import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React from "react";

const SignIn = ({ data, form, handleChange, setUser, setSignInOpened }) => {
  const onSignInSubmit = (e) => {
    if (data[0].email === form.email && data[0].password === form.password) {
      e.preventDefault();
      setUser(true);
      setSignInOpened(false);
    } else {
      e.preventDefault();
      alert("Invalid email or password");
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={onSignInSubmit}>
        <TextInput
          name="email"
          label="Email"
          onChange={handleChange}
          rightSection={<IconAt size={14} color="gray" />}
          placeholder="Email"
        />

        <PasswordInput
          name="password"
          mt="md"
          label="Password"
          onChange={handleChange}
          placeholder="Password"
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
