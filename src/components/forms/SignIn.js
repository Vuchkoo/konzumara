import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ data, form, navigate, handleChange }) => {
  const onSignInSubmit = (e) => {
    if (
      data.user[0].email === form.email &&
      data.user[0].password === form.password
    ) {
      navigate("/user/dashboard");
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
          // {...form.getInputProps("email")}
          // onChange={(event) => setForms(event.currentTarget.value)}
        />

        <PasswordInput
          name="password"
          mt="md"
          label="Password"
          onChange={handleChange}
          placeholder="Password"
          // {...form.getInputProps("password")}
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
