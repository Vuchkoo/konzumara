import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  Pagination,
  ScrollArea,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconEdit, IconSearch, IconTrash } from "@tabler/icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarSimple } from "../../components/admin/Navbar";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [minLoadOrders, setMinLoadOrders] = useState(0);
  const [maxLoadOrders, setMaxLoadOrders] = useState(9);
  const [ordersCount, setOrdersCount] = useState(null);
  const { setLoading } = useContext(Context);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const getOrders = async () => {
    const { data, count } = await supabase
      .from("orders")
      .select("*", { count: "exact" })
      .range(minLoadOrders, maxLoadOrders);
    setOrders(data);
    setOrdersCount(count);
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, [minLoadOrders, maxLoadOrders]);

  const handleRemoveProduct = async (e, id) => {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    setOrders([
      ...orders.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      }),
    ]);
  };

  const handleChangePage = (prevPage) => {
    if (page > prevPage) {
      return (
        setPage((prevPage) => prevPage - 1),
        setMinLoadOrders((prevIndex) => prevIndex - 10),
        setMaxLoadOrders((prevIndex) => prevIndex - 10)
      );
    } else {
      return (
        setPage((prevPage) => prevPage + 1),
        setMinLoadOrders((prevIndex) => prevIndex + 10),
        setMaxLoadOrders((prevIndex) => prevIndex + 10)
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
            placeholder="Search orders"
            icon={<IconSearch />}
          />
        </Flex>
        <div className="orders">
          <h2>Orders</h2>
          {/* <ScrollArea
          style={{ height: 500 }}
          scrollbarSize={8}
          scrollHideDelay={1500}
        > */}
          <Table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <Text>{item.id}</Text>
                    </td>
                    <td>
                      <Text>{item.user_id}</Text>
                    </td>
                    <td>
                      <Text>
                        $
                        {item.total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </Text>
                    </td>
                    <td>
                      <ActionIcon
                        ml={10}
                        color="red"
                        onClick={(e) => handleRemoveProduct(e, item.id)}
                      >
                        <IconTrash />
                      </ActionIcon>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {/* </ScrollArea> */}
        </div>
        <Center mt={40}>
          <Pagination
            total={Math.floor(ordersCount / 10 + 1)}
            page={page}
            onChange={handleChangePage}
          />
        </Center>
      </div>
    </div>
  );
};

export default Orders;
