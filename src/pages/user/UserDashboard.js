import React from "react";
import Header from "../../components/user/Header";
import {
  Grid,
  Text,
  Button,
  Card,
  Group,
  Pagination,
  LoadingOverlay,
  Loader,
  Center,
} from "@mantine/core";
import Sidebar from "../../components/Sidebar";

const UserDashboard = () => {
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
          <Center mt={50}>
            <Button color="green">Load more</Button>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
