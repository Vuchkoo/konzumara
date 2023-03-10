import { useContext, useState } from "react";
import { Navbar, Group, Center } from "@mantine/core";
import {
  IconLogout,
  IconArticle,
  IconShoppingCart,
  IconCategory2,
} from "@tabler/icons";
import { useStyles } from "../Styles";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
import { Context } from "../../context/Context";

export const NavbarSimple = () => {
  const [active, setActive] = useState("");
  const { classes, cx } = useStyles();
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);

  const navLinks = [
    { link: "", label: "Products", icon: IconArticle },
    { link: "", label: "Categories", icon: IconCategory2 },
    { link: "", label: "Orders", icon: IconShoppingCart },
  ];
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    alert("Successfully signed out!");
    navigate("/admin");
  };

  return (
    <div className="navbar">
      <Navbar width={{ sm: 300 }} p="lg">
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            <h1>Konzumara</h1>
          </Group>
          {navLinks.map((item) => (
            <a
              className={cx(classes.link, {
                [classes.linkActive]: item.label === active,
              })}
              href={item.link}
              key={item.label}
              onClick={(e) => {
                e.preventDefault();
                setActive(item.label);
                navigate(`/admin/${item.label.toLowerCase()}`);
              }}
            >
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <span>{item.label}</span>
            </a>
          ))}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          <Center>
            <a href="#" className={classes.link} onClick={handleSignOut}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Sign Out</span>
            </a>
          </Center>
        </Navbar.Section>
      </Navbar>
    </div>
  );
};
