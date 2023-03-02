import { Box, Button, Center, Group, TextInput } from "@mantine/core";

const CreateCategory = ({ onChange }) => {
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Center>
        <h2>Create a new category</h2>
      </Center>
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
            Create
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default CreateCategory;
