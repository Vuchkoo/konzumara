import { Flex, Group, Radio, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { useContext } from "react";
import { Context } from "../context/Context";
import { useStyles } from "./Styles";

const Sidebar = ({ onEnter, onChange }) => {
  const { classes } = useStyles();
  const { categories } = useContext(Context);

  return (
    <div className="sidebar">
      <Group className={classes.header} position="apart">
        <h1>Konzumara</h1>
      </Group>
      <TextInput
        label="Search"
        name="search"
        placeholder="Search products"
        icon={<IconSearch />}
        onChange={onChange}
        onKeyDown={onEnter}
      />
      <Radio.Group mt={20} label="Categories" name="categories">
        <Flex direction="column" mb>
          {categories?.map((item, index) => {
            return (
              <Radio
                key={index}
                label={item.name}
                value={item.id}
                onClick={() => console.log(item.id)}
                mb="sm"
              />
            );
          })}
        </Flex>
      </Radio.Group>
    </div>
  );
};

export default Sidebar;
