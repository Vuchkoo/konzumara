import {
  ActionIcon,
  Box,
  Button,
  Center,
  Checkbox,
  FileInput,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowBackUp } from "@tabler/icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { user, setLoading } = useContext(Context);
  const productForm = useForm({
    initialValues: {
      name: "",
      description: "",
      price: "",
      is_sale: "",
      sale_price: "",
      image: "",
      quantity: "",
      category_id: "",
    },
  });

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const createNewProduct = async () => {
    const { error } = await supabase
      .from("products")
      .insert(productForm.values);
    navigate("/admin/products");
  };

  const selectCategory = categories?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  console.log(productForm.values);

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
      <form onSubmit={productForm.onSubmit(createNewProduct)}>
        <FileInput placeholder="Pick file" label="Image" />

        <TextInput
          mt="md"
          label="Name"
          {...productForm.getInputProps("name")}
          placeholder="Name"
        />

        <TextInput
          mt="md"
          label="Description"
          {...productForm.getInputProps("description")}
          placeholder="Description"
        />

        <Select
          label="Category"
          placeholder="Choose a category"
          data={selectCategory}
          mt="md"
          onClick={() => console.log(productForm.values)}
          {...productForm.getInputProps("category_id")}
        />

        <NumberInput
          mt="md"
          label="Price"
          {...productForm.getInputProps("price", { type: "number" })}
          placeholder="Price"
        />

        <NumberInput
          mt="md"
          label="Quantity"
          {...productForm.getInputProps("quantity", { type: "number" })}
          placeholder="Quantity"
        />

        <NumberInput
          mt="md"
          label="Sale price"
          {...productForm.getInputProps("sale_price", { type: "number" })}
          placeholder="Sale price"
        />

        <Checkbox
          label="is Sale"
          mt="md"
          {...productForm.getInputProps("is_sale", { type: "checkbox" })}
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
