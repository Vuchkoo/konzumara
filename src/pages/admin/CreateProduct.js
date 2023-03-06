import {
  ActionIcon,
  Box,
  Button,
  Center,
  Checkbox,
  Group,
  NativeSelect,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowBackUp } from "@tabler/icons";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const CreateProduct = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      price: undefined,
      is_sale: undefined,
      sale_price: undefined,
      image: undefined,
      quantity: undefined,
      category_id: undefined,
    },
  });

  const {
    name,
    description,
    price,
    is_sale,
    sale_price,
    image,
    quantity,
    category_id,
  } = form.values;
  const { categories, setCategories } = useContext(Context);

  const createNewProduct = async () => {
    const { error } = await supabase.from("products").insert({
      name: name,
      description: description,
      price: price,
      is_sale: is_sale,
      sale_price: sale_price,
      image: image,
      quantity: quantity,
      category_id: category_id,
    });
    navigate("/admin/products");
  };

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
      <form onSubmit={form.onSubmit(createNewProduct)}>
        <TextInput
          mt="md"
          label="Image URL"
          {...form.getInputProps("image")}
          placeholder="Image URL"
        />

        <TextInput
          mt="md"
          label="Name"
          {...form.getInputProps("name")}
          placeholder="Name"
        />

        <TextInput
          mt="md"
          label="Description"
          {...form.getInputProps("description")}
          placeholder="Description"
        />

        <NativeSelect
          data={categories?.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          mt="md"
          label="Category"
          onClick={() => console.log(form.values)}
          {...form.getInputProps("category_id")}
        />

        <NumberInput
          mt="md"
          label="Price"
          {...form.getInputProps("price", { type: "number" })}
          placeholder="Price"
        />

        <NumberInput
          mt="md"
          label="Quantity"
          {...form.getInputProps("quantity", { type: "number" })}
          placeholder="Quantity"
        />

        <NumberInput
          mt="md"
          label="Sale price"
          {...form.getInputProps("sale_price", { type: "number" })}
          placeholder="Sale price"
        />

        <Checkbox
          label="is Sale"
          mt="md"
          // onChange={() => (checked ? setChecked(false) : setChecked(true))}
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
