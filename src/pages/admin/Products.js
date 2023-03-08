import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  Pagination,
  ScrollArea,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconEdit, IconSearch, IconTrash } from "@tabler/icons";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarSimple } from "../../components/admin/Navbar";
import EditProduct from "../../components/forms/EditProduct";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const Products = () => {
  const [editOpened, setEditOpened] = useState(false);
  const { products, setProducts, categories, setCategories, user } =
    useContext(Context);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);

  console.log(user);

  const handleRemoveProduct = async (e, id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    setProducts([
      ...products.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      }),
    ]);
  };

  const handleEditProduct = async (id) => {
    navigate(`${id}`);
    // console.log(id);
  };

  const lastProduct = page * productsPerPage;
  const firstProduct = lastProduct - productsPerPage;
  const currentProducts = products.slice(firstProduct, lastProduct);

  const handleChangePage = (prevPage) => {
    page > prevPage
      ? setPage((prevPage) => prevPage - 1)
      : setPage((prevPage) => prevPage + 1);
  };

  // console.log(user);

  return (
    <div className="grid">
      <NavbarSimple />
      <div className="wrapper">
        <Flex justify="space-between" p={40}>
          <TextInput
            ml={50}
            placeholder="Search products"
            icon={<IconSearch />}
          />
          <Button color="green" mr={50} onClick={() => navigate("create")}>
            Create
          </Button>
        </Flex>
        <div className="products">
          <h2>Products</h2>
          {/* <ScrollArea
            style={{ height: 500 }}
            scrollbarSize={8}
            scrollHideDelay={1500}
          > */}
          <Table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sale</th>
                <th>Sale Price</th>
                <th>Category ID</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <Image
                        src={item.image}
                        alt={item.title}
                        radius="md"
                        width={50}
                        height={50}
                      />
                    </td>
                    <td>
                      <Text>{item.name}</Text>
                    </td>
                    <td>
                      <Text>{item.description}</Text>
                    </td>
                    <td>
                      <Text>${item.price.toFixed(2)}</Text>
                    </td>
                    <td>
                      <Text>{item.quantity}</Text>
                    </td>
                    <td>
                      <Text>
                        {item.is_sale ? <IconCheck color="green" /> : null}
                      </Text>
                    </td>
                    <td>
                      <Text>
                        {item.sale_price
                          ? `$${item.sale_price.toFixed(2)}`
                          : null}
                      </Text>
                    </td>
                    <td>
                      <Text>{item.category_id}</Text>
                    </td>
                    <td>
                      <Flex>
                        <ActionIcon
                          color="yellow"
                          onClick={() => {
                            handleEditProduct(item.id);
                            console.log(item.id);
                          }}
                        >
                          <IconEdit />
                        </ActionIcon>
                        <ActionIcon
                          ml={10}
                          color="red"
                          onClick={(e) => handleRemoveProduct(e, item.id)}
                        >
                          <IconTrash />
                        </ActionIcon>
                      </Flex>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {/* </ScrollArea> */}
        </div>
        <Center mt={40}>
          <Pagination
            total={Math.round(products.length / 6)}
            page={page}
            onChange={handleChangePage}
          />
        </Center>
      </div>
    </div>
  );
};

export default Products;
