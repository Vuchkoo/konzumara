import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Modal,
  Pagination,
  ScrollArea,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarSimple } from "../../components/admin/Navbar";
import EditCategories from "../../components/forms/EditCategories";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [minLoadCategories, setMinLoadCategories] = useState(0);
  const [maxLoadCategories, setMaxLoadCategories] = useState(9);
  const [categoriesCount, setCategoriesCount] = useState(null);
  const { user, loading, setLoading } = useContext(Context);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const getCategories = async () => {
    const { data, count } = await supabase
      .from("categories")
      .select("*", { count: "exact" })
      .range(minLoadCategories, maxLoadCategories);
    setCategories(data);
    setCategoriesCount(count);
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, [minLoadCategories, maxLoadCategories]);

  const handleRemoveCategory = async (e, id) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    setCategories([
      ...categories.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      }),
    ]);
  };

  const handleEditCategory = async (id) => {
    navigate(`${id}`);
    // console.log(id);
  };

  const handleChangePage = (prevPage) => {
    if (page > prevPage) {
      return (
        setPage((prevPage) => prevPage - 1),
        setMinLoadCategories((prevIndex) => prevIndex - 10),
        setMaxLoadCategories((prevIndex) => prevIndex - 10)
      );
    } else {
      return (
        setPage((prevPage) => prevPage + 1),
        setMinLoadCategories((prevIndex) => prevIndex + 10),
        setMaxLoadCategories((prevIndex) => prevIndex + 10)
      );
    }
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
          <Button color="green" mr={50} onClick={() => navigate("create")}>
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
                {categories?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <Text>{item.name}</Text>
                      </td>
                      <td>
                        <Flex>
                          <ActionIcon
                            color="yellow"
                            onClick={() => {
                              handleEditCategory(item.id);
                              console.log(item.id);
                            }}
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
          <Center mt={40}>
            <Pagination
              total={Math.floor(categoriesCount / 10 + 1)}
              page={page}
              onChange={handleChangePage}
            />
          </Center>{" "}
        </div>
        {/* <Modal
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
          <EditCategories />
        </Modal> */}
      </div>
    </div>
  );
};

export default Categories;
