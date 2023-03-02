import {
  Box,
  Button,
  Center,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconAt } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios(`/user.json`)
      .then((res) => {
        setData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSignInSubmit = (e) => {
    if (data[1].email === form.email && data[1].password === form.password) {
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
