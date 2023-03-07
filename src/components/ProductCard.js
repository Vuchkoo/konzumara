import { Button, Card, Flex, Image, Text } from "@mantine/core";

const ProductCard = ({ item, onAdd }) => {
  const { image, name, description, price, is_sale, sale_price } = item;

  return (
    <>
      <Card withBorder radius="md" className="product" m={5}>
        <Image src={image} alt={name} radius="md" width={150} height={150} />
        <Flex direction="column" justify="center" align="center">
          <Text mt={10} weight={500}>
            {name}
          </Text>
          <Text size={10} color="dimmed">
            {description}
          </Text>
          {!is_sale ? (
            <Text size="xl" weight={700}>
              ${price.toFixed(2)}
            </Text>
          ) : (
            <>
              <Text size="sm" strikethrough>
                ${price.toFixed(2)}
              </Text>
              <Text size="xl" weight={700}>
                ${sale_price.toFixed(2)}
              </Text>
            </>
          )}
          <Button mt={10} onClick={(e) => onAdd(e, item)}>
            Add to cart
          </Button>
        </Flex>
      </Card>
    </>
  );
};

export default ProductCard;
