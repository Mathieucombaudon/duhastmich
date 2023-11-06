import { Menu, Button, Flex, Title, Anchor } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { IconMessageCircle } from "@tabler/icons-react";

const Navbar = () => {
  return (
    <nav>
      <Flex
        mih={50}
        wrap="nowrap"
        w="100%"
        bg="rgba(0,0,0,0.3)"
        gap="md"
        align="center"
        justify="flex-start"
        direction="row"
      >
        <Title order={1}>Blue Hotel</Title>
        <Link className="lien" to="/">
          Home
        </Link>
        <Link className="lien" to="/contact">
          Contact
        </Link>
        <Link className="lien" to="/about">
          About
        </Link>

        <Flex direction="row" ml="50%" justify="flex-end" align="center">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button>Profile</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Login</Menu.Label>
              <Menu.Item leftSection={<IconMessageCircle />}>
                <Link to="/login">Sign In</Link>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </nav>
  );
};

export default Navbar;
