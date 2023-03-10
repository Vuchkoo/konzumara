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
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../config/Supabase";

const EditCategories = ({ onChange }) => {
  const [categories, setCategories] = useState([]);

  const form = useForm({
    initialValues: {
      name: "",
    },
  });
  const navigate = useNavigate();

  const params = useParams();
  const getCategories = async (id) => {
    const { data } = await supabase
      .from("categories")
      .select()
      .match({ id: id })
      .single();
    console.log(data);
    form?.setValues(data);
  };

  useEffect(() => {
    getCategories(params.id);
    console.log(params);
  }, []);

  const { name } = form.values;

  const SaveEditedCategory = async () => {
    const { error } = await supabase
      .from("categories")
      .update({
        name: name,
      })
      .eq("id", params.id);
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
        <h2>Edit category</h2>
      </Center>
      <form onSubmit={form.onSubmit(SaveEditedCategory)}>
        <TextInput
          mt="md"
          label="Category"
          // onChange={onChange}
          value={params.name}
          placeholder="Category"
          {...form.getInputProps("name")}
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
