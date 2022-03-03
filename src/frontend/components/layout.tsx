import type { NextPage } from "next";
import Head from "next/head";
import React, { ReactNode } from "react";
import { Grommet } from "grommet";
import { NavBar } from "./grommetNavbar";
import Footer from "./footer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: NextPage = ({ children }) => {
  const theme = {
    global: {
      font: {
        family: "Arial",
        size: "16px",
        height: "18px",
      },
    },
  };

  return (
    <>
      <Head>
        <title>JumpStarter - Discover</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grommet theme={theme}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </Grommet>
    </>
  );
};

export default Layout;
