import {
  ActionIcon,
  Box,
  Button,
  Center,
  Checkbox,
  FileInput,
  Group,
  NativeSelect,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const EditProduct = () => {
  const { productForm, setLoading } = useContext(Context);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const params = useParams();
  const getProduct = async (id) => {
    const { data } = await supabase
      .from("products")
      .select()
      .match({ id: id })
      .single();
    console.log(data);
    productForm?.setValues(data);
  };

  useEffect(() => {
    getProduct(params.id);
    console.log(params);
  }, []);

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  console.log(productForm);

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

  const SaveEditedProduct = async () => {
    const { error } = await supabase
      .from("products")
      .update({
        name: name,
        description: description,
        price: price,
        is_sale: is_sale,
        sale_price: sale_price,
        image: image,
        quantity: quantity,
        category_id: category_id,
      })
      .eq("id", params.id);
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
        <h2>Edit product</h2>
      </Center>
      <form onSubmit={productForm.onSubmit(SaveEditedProduct)}>
        {/* <FileInput
          name="file"
          mt="md"
          label={<IconUpload />}
          onChange={onChange}
        /> */}

        {/* <TextInput
          mt="md"
          label="Image URL"
          defaultValue={params.image}
          {...productForm.getInputProps("image")}
          placeholder="Image URL"
        /> */}

        <TextInput
          mt="md"
          label="Name"
          value={params.name}
          {...productForm.getInputProps("name")}
          placeholder="Name"
        />

        <TextInput
          mt="md"
          label="Description"
          defaultValue={params.description}
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
          defaultValue={params.name}
          // onClick={() => console.log(productForm.values)}
          {...productForm.getInputProps("category_id")}
        />

        <NumberInput
          mt="md"
          label="Price"
          defaultValue={params.price}
          {...productForm.getInputProps("price", { type: "number" })}
          placeholder="Price"
        />

        <NumberInput
          mt="md"
          label="Quantity"
          defaultValue={params.quantity}
          {...productForm.getInputProps("quantity", { type: "number" })}
          placeholder="Quantity"
        />

        <NumberInput
          mt="md"
          label="Sale price"
          defaultValue={params.sale_price}
          {...productForm.getInputProps("sale_price", { type: "number" })}
          placeholder="Sale price"
        />

        <Checkbox
          label="is Sale"
          mt="md"
          // onChange={() => (checked ? setChecked(false) : setChecked(true))}
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
