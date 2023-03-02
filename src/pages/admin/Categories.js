import {
  ActionIcon,
  Button,
  Flex,
  Modal,
  ScrollArea,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavbarSimple } from "../../components/admin/Navbar";
import EditCategories from "../../components/forms/EditCategories";

const Categories = () => {
  const [products, setProducts] = useState();
  const [form, setForm] = useState();
  const [editOpened, setEditOpened] = useState(false);

  const theme = useMantineTheme();

  useEffect(() => {
    axios(`/product.json`)
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRemoveCategory = (e, id) => {
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
            placeholder="Search categories"
            icon={<IconSearch />}
          />
          <Button color="green" mr={50}>
            Create
          </Button>
        </Flex>
        <div className="categories">
          <h2>Categories</h2>
          <ScrollArea
            style={{ height: 500 }}
            scrollbarSize={8}
            scrollHideDelay={1500}
          >
            <Table>
              <tbody>
                {products?.map((item) => {
                  return (
                    <tr key={item.title}>
                      <td>
                        <Text>{item.description}</Text>
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
                            onClick={(e) => handleRemoveCategory(e, item.id)}
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
        <Modal
          opened={editOpened}
          onClose={() => setEditOpened(false)}
          title="Edit category"
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
          <EditCategories onChange={handleChange} />
        </Modal>
      </div>
    </div>
  );
};

export default Categories;
