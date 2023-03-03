import {
  Box,
  Button,
  Center,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const AdminSignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSignInSubmit = (e) => {
    if (user[1].email === form.email && user[1].password === form.password) {
      e.preventDefault();
      navigate("products");
    } else {
      e.preventDefault();
      alert("Invalid email or password");
    }
  };

  return (
    <Center style={{ height: 600 }}>
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
    </Center>
  );
};

export default AdminSignIn;
