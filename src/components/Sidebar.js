import {
  Button,
  Flex,
  Group,
  Radio,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../config/Supabase";
import { Context } from "../context/Context";
import { useStyles } from "./Styles";

const Sidebar = ({ onChange, onCategory, loadAll }) => {
  const { classes } = useStyles();
  const [categories, setCategories] = useState([]);
  const [minLoadCategories, setMinLoadCategories] = useState(0);
  const [maxLoadCategories, setMaxLoadCategories] = useState(9);
  const [categoriesCount, setCategoriesCount] = useState(null);
  const { user, loading, setLoading } = useContext(Context);

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

  const handleLoadAllCategories = () => {
    setMaxLoadCategories((prevIndex) => prevIndex + categoriesCount);
  };

  return (
    <div className="sidebar">
      <Group className={classes.header} position="apart">
        <h1>Konzumara</h1>
      </Group>
      <TextInput
        name="search"
        label="Search"
        placeholder="Search products"
        icon={<IconSearch />}
        onChange={onChange}
        // onKeyDown={onEnter}
      />
      <ScrollArea
        style={{ height: 500 }}
        scrollbarSize={8}
        scrollHideDelay={1500}
      >
        <Radio.Group mt={20} label="Categories" name="categories">
          <Flex direction="column">
            {categories?.map((item, index) => {
              return (
                <Radio
                  key={index}
                  label={item.name}
                  value={item.id}
                  onClick={(e) => onCategory(e, item.id)}
                  mb="sm"
                />
              );
            })}
          </Flex>
        </Radio.Group>
      </ScrollArea>
      {categories.length < categoriesCount && (
        <Button color="green" onClick={handleLoadAllCategories}>
          Load all
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
