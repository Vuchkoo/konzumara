import { Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React from "react";
import { NavbarSimple } from "../../components/admin/Navbar";

const Orders = () => {
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
          {/* <Button color="green" mr={50}>
            Create
          </Button> */}
        </Flex>
        <div className="orders">
          <h2>Orders</h2>
        </div>
      </div>
    </div>
  );
};

export default Orders;
