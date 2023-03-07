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
import { IconArrowBackUp } from "@tabler/icons";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { categories, productForm } = useContext(Context);
  const {
    name,
    description,
    price,
    is_sale,
    sale_price,
    image,
    quantity,
    category_id,
  } = productForm.values;

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
      <form onSubmit={productForm.onSubmit(createNewProduct)}>
        <TextInput
          mt="md"
          label="Image URL"
          {...productForm.getInputProps("image")}
          placeholder="Image URL"
        />

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

        <NativeSelect
          data={categories?.map((item) => ({
            value: item.id,
            label: item.name,
          }))}
          mt="md"
          label="Category"
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
