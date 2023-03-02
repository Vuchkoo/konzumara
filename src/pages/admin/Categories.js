import {
  ActionIcon,
  Button,
  Flex,
  ScrollArea,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavbarSimple } from "../../components/admin/Navbar";

const Categories = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios(`/product.json`)
      .then((res) => {
        setProducts(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                          <ActionIcon color="yellow">
                            <IconEdit />
                          </ActionIcon>
                          <ActionIcon ml={10} color="red">
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
      </div>
    </div>
  );
};

export default Categories;
