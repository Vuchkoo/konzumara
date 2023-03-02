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
import { useNavigate } from "react-router-dom";

const CreateCategory = ({ onChange }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <Group>
        <ActionIcon color="blue" onClick={() => navigate("/admin/categories")}>
          <IconArrowBackUp />
        </ActionIcon>
        <Text>Go back</Text>
      </Group>
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
