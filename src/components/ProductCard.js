import { Button, Card, Flex, Image, Text } from "@mantine/core";

const ProductCard = ({ item, onAdd }) => {
  return (
    <>
      <Card withBorder radius="md" className="product" m={5}>
        <Image
          src={item.image}
          alt={item.title}
          radius="md"
          width={150}
          height={150}
        />
        <Flex direction="column" justify="center" align="center">
          <Text mt={10} weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
          <Text size="xl" weight={700}>
            ${item.price.toFixed(2)}
          </Text>
          <Button mt={10} onClick={(e) => onAdd(e, item)}>
            Add to cart
          </Button>
        </Flex>
      </Card>
    </>
  );
};

export default ProductCard;
