import React from "react";
import { Navbar, Group, TextInput, Flex, Radio } from "@mantine/core";
import { IconLogout, IconSearch, IconCategory } from "@tabler/icons";
import { useStyles } from "./Styles";

export function NavbarSimple() {
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
    <Navbar height={700} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
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
      </Navbar.Section>

      {/* <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section> */}
    </Navbar>
  );
}
