import {
  ActionIcon,
  Box,
  Button,
  FileInput,
  Group,
  TextInput,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import React from "react";

const EditProduct = ({ onChange }) => {
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* <FileInput
          name="file"
          mt="md"
          label={<IconUpload />}
          onChange={onChange}
        /> */}

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
            Save
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default EditProduct;
