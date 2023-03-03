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
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarSimple } from "../../components/admin/Navbar";
import EditProduct from "../../components/forms/EditProduct";
import { Context } from "../../context/Context";

const Products = () => {
  const [form, setForm] = useState();
  const [editOpened, setEditOpened] = useState(false);
  const { products, setProducts } = useContext(Context);

  const navigate = useNavigate();
  const theme = useMantineTheme();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const handleRemoveProduct = (e, id) => {
    setProducts([
      ...products.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      }),
    ]);
  };

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
          <ScrollArea
            style={{ height: 500 }}
            scrollbarSize={8}
            scrollHideDelay={1500}
          >
            <Table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item) => {
                  return (
                    <tr key={item.title}>
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
                        <Text>{item.title}</Text>
                      </td>
                      <td>
                        <Text>{item.description}</Text>
                      </td>
                      <td>
                        <Text>${item.price.toFixed(2)}</Text>
                      </td>
                      <td>
                        <Flex>
                          <ActionIcon
                            color="yellow"
                            onClick={() => setEditOpened(true)}
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
          </ScrollArea>
        </div>
        <Center mt={40}>
          <Pagination total={10} />
        </Center>
        <Modal
          opened={editOpened}
          onClose={() => setEditOpened(false)}
          title="Edit product"
          centered
          overlayColor={
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2]
          }
          overlayOpacity={0.55}
          overlayBlur={3}
        >
          {/* Modal content */}
          <EditProduct onChange={handleChange} />
        </Modal>
      </div>
    </div>
  );
};

export default Products;
