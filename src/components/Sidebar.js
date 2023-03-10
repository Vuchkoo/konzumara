import {
  Button,
  Flex,
  Group,
  Radio,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { useStyles } from "./Styles";

const Sidebar = ({
  onChange,
  onCategory,
  categories,
  loadAll,
  categoriesCount,
}) => {
  const { classes } = useStyles();

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
        <Button color="green" onClick={loadAll}>
          Load all
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
