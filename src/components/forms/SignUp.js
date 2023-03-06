import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React, { useState } from "react";
import { supabase } from "../../config/Supabase";

const SignUp = ({
  form,
  handleChange,
  setSignInOpened,
  setSignUpOpened,
  navigate,
}) => {
  const { fullName, email, password, role } = form.values;
  const [checked, setChecked] = useState(false);

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
          role: checked ? "admin" : "user",
        },
      },
    });
    console.log(data);
    if (checked) {
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
          // {...form.getInputProps("password")}
        />

        <Checkbox
          name="checkbox"
          label="is Admin"
          mt="md"
          onChange={() => (checked ? setChecked(false) : setChecked(true))}
        />

        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUp;
