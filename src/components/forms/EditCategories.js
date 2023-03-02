import { Box, Button, Group, TextInput } from "@mantine/core";
import React from "react";

const EditCategories = ({ onChange }) => {
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          name="category"
          mt="md"
          label="Category"
          onChange={onChange}
          placeholder="Category"
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

export default EditCategories;
