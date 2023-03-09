import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React, { useContext } from "react";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const SignIn = ({ form, setSignInOpened }) => {
  const { email, password } = form.values;
  const { user, setUser } = useContext(Context);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      alert("Invalid email or password");
    } else {
      setUser(data.session);
      setSignInOpened(false);
      // console.log(data);
    }
  };

  console.log(user);

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
