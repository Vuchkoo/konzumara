import Header from "../components/Header";
import { Grid, Text, Button, Card, Group } from "@mantine/core";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="grid">
        <Sidebar />
        <div className="product-grid">
          <Grid mt={40}>
            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>

            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>

            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>

            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>

            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>

            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>

            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>

            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>

            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>

            <Card withBorder radius="md" className="product" m={5}>
              <img alt="test" />
              <Group position="apart" mt="md">
                <div>
                  <Text weight={500}>Test</Text>
                  <Text size="xs" color="dimmed">
                    Test
                  </Text>
                </div>
              </Group>
              <Text size="xl" weight={700}>
                $168.00
              </Text>
              <Button>Add to cart</Button>
            </Card>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Home;
