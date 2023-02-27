import { Flex, Group, Radio, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React from "react";
import { useStyles } from "./Styles";

const Sidebar = () => {
  const { classes, cx } = useStyles();
  //   const [active, setActive] = useState("Billing");
  const data = [
    { label: "Example 1", value: "example1" },
    { label: "Example 2", value: "example2" },
    { label: "Example 3", value: "example3" },
  ];
  const categories = data.map((item) => (
    <Radio label={item.label} value={item.value} mb="sm" />
  ));

  return (
    <div className="sidebar">
      <Group className={classes.header} position="apart">
        <h1>Konzumara</h1>
      </Group>
      <TextInput
        label="Search"
        placeholder="Search products"
        icon={<IconSearch />}
      />
      <Radio.Group mt={20} label="Categories" name="categories">
        <Flex direction="column" mb>
          {categories}
        </Flex>
      </Radio.Group>
    </div>
  );
};

export default Sidebar;
