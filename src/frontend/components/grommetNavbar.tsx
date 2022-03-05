/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @next/next/link-passhref */
import React, { useState } from "react";
import {
  Anchor,
  Avatar,
  Box,
  Button,
  DropButton,
  Header,
  Menu,
  ResponsiveContext,
  Text,
} from "grommet";
import {
  Grommet as GrommetIcon,
  Menu as MenuIcon,
  PowerShutdown,
} from "grommet-icons";
import Link from "next/link";
import { useAuth } from "@frontend/context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/client/client";
import { useRouter } from "next/router";

import navbar from "../../styles/Navbar.module.css";

import axios from "../../axios/instance";

export const NavBar = () => {
  const { firstName, avatar } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const router = useRouter();

  const logOut = async () => {
    try {
      signOut(auth)
        .then(() => {
          setIsAuthenticated(false);
          delete axios.defaults.headers.common["Authorization"];
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const RenderAvatar = () => {
    if (!avatar) {
      return (
        <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
      );
    } else {
      return <Avatar src={process.env.AWS_BUCKET_URL + avatar} />;
    }
  };

  return (
    <Header pad="large" height="xsmall" elevation="small" className="navbar">
      <ResponsiveContext.Consumer>
        {(size) =>
          size === "small" ? (
            <>
              <Box />
              {!firstName ? (
                <Menu
                  a11yTitle="Navigation Menu"
                  dropProps={{ align: { top: "bottom", right: "right" } }}
                  icon={<MenuIcon color="brand" />}
                  items={[
                    {
                      label: (
                        <Box className="navlink title" pad="small">
                          JumpStarter
                        </Box>
                      ),
                      href: "/",
                    },
                    {
                      label: <Box pad="small">Create a New Project</Box>,
                      href: "/login",
                    },
                    {
                      label: <Box pad="small">Discover</Box>,
                      href: "/discover",
                    },
                    {
                      label: <Box pad="small">Log In</Box>,
                      href: "/login",
                    },
                    {
                      label: <Box pad="small">Sign Up</Box>,
                      href: "/signup",
                    },
                  ]}
                />
              ) : (
                <Menu
                  a11yTitle="Navigation Menu"
                  dropProps={{ align: { top: "bottom", right: "right" } }}
                  icon={<MenuIcon color="brand" />}
                  items={[
                    {
                      label: (
                        <Box className="navlink" pad="small">
                          JumpStarter
                        </Box>
                      ),
                      href: "/",
                    },
                    {
                      label: <Box pad="small">Create a New Project</Box>,
                      href: "/project",
                    },
                    {
                      label: <Box pad="small">Discover</Box>,
                      href: "/discover",
                    },
                    {
                      label: <Box pad="small">Profile</Box>,
                      href: "/app/profile",
                    },
                    {
                      label: <PowerShutdown onClick={logOut} />,
                    },
                  ]}
                />
              )}
            </>
          ) : (
            <Box className={navbar.wrapper}>
              <Box direction="row" justify="start" gap="xlarge">
                {firstName && isAuthenticated ? (
                  <Link href="/app/create">
                    <Anchor
                      className="no-text-wrap"
                      href="/app/create"
                      label="Create a New Project"
                    />
                  </Link>
                ) : (
                  <Link href="/login">
                    <Anchor
                      className="no-text-wrap"
                      href="/login"
                      label="Create a New Project"
                    />
                  </Link>
                )}
                <Link href="/discover">
                  <Anchor
                    className="no-text-wrap"
                    href="/discover"
                    label="Discover"
                  />
                </Link>
              </Box>
              <Box
                flex="grow"
                align="center"
                margin={{
                  left: "xlarge",
                  right: "xlarge",
                }}
                className={navbar.brand}
              >
                <Link href="/">
                  <Anchor
                    className="no-text-wrap"
                    href="/"
                    label="JumpStarter"
                  />
                </Link>
              </Box>
              <Box direction="row" justify="end" gap="xlarge"></Box>
              {firstName && isAuthenticated && (
                <>
                  <Text className="grommetNavbar_welcomeText card">
                    Welcome back, {firstName}
                  </Text>
                  <DropButton
                    label={<RenderAvatar />}
                    className={navbar.dropdown}
                    dropAlign={{ top: "bottom", right: "right" }}
                    dropContent={
                      <Box
                        pad="large"
                        background="light-2"
                        className={navbar.dropdownWrapper}
                      >
                        <Link href="/app/profile">
                          <Anchor href="/app/profile" label="Profile" />
                        </Link>
                        <Button
                          label="Log Out"
                          onClick={logOut}
                          className={navbar.dropdownLogoutButton}
                          icon={<PowerShutdown />}
                        />
                      </Box>
                    }
                  />
                </>
              )}
              {(!firstName || !isAuthenticated) && (
                <Box direction="row" justify="end" gap="xlarge">
                  <Link href="/login">
                    <Anchor
                      className="no-text-wrap"
                      href="/login"
                      label="Log In"
                    />
                  </Link>
                  <Link href="/signup">
                    <Anchor
                      className="no-text-wrap"
                      href="/signup"
                      label="Sign Up"
                    />
                  </Link>
                </Box>
              )}
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Header>
  );
};

export default {
  title: "Layout/Header/Responsive",
};
