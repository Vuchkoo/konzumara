import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowBackUp } from "@tabler/icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const CreateCategory = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const form = useForm({
    initialValues: {
      name: "",
    },
  });
  const { name } = form.values;

  const createNewCategory = async () => {
    const { error } = await supabase.from("categories").insert({
      name: name,
      user_id: user.id,
    });
    navigate("/admin/categories");
  };

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
      <form onSubmit={form.onSubmit(createNewCategory)}>
        <TextInput
          mt="md"
          label="Category name"
          {...form.getInputProps("name")}
          placeholder="Category name"
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
