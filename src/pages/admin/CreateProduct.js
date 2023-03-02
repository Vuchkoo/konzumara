import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = ({ onChange }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Group>
        <ActionIcon color="blue" onClick={() => navigate("/admin/products")}>
          <IconArrowBackUp />
        </ActionIcon>
        <Text>Go back</Text>
      </Group>
      <Center>
        <h2>Create a new product</h2>
      </Center>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          name="image"
          mt="md"
          label="Image URL"
          onChange={onChange}
          placeholder="Image URL"
        />

        <TextInput
          name="name"
          mt="md"
          label="Name"
          onChange={onChange}
          placeholder="Name"
        />

        <TextInput
          name="category"
          mt="md"
          label="Category"
          onChange={onChange}
          placeholder="Category"
        />

        <TextInput
          name="price"
          mt="md"
          label="Price"
          onChange={onChange}
          placeholder="Price"
        />

        <Group position="center" mt="md">
          <Button type="submit" color="green" uppercase>
            Create
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default CreateProduct;
