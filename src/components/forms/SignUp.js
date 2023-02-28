import {
  Box,
  Button,
  Flex,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { IconAt } from "@tabler/icons";
import React from "react";

const SignUp = ({ data, form, handleChange }) => {
  const onSignUpSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={onSignUpSubmit}>
        <Flex>
          <TextInput
            name="firstName"
            label="First name"
            placeholder="Your first name"
            withAsterisk
            onChange={handleChange}
            mr={20}
          />

          <TextInput
            name="lastName"
            label="Last name"
            placeholder="Your last name"
            withAsterisk
            onChange={handleChange}
          />
        </Flex>

        <TextInput
          name="email"
          label="Email"
          placeholder="Your email"
          rightSection={<IconAt size={14} color="gray" />}
          withAsterisk
          mt="md"
          onChange={handleChange}
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

        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default SignUp;
