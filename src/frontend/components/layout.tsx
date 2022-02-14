import type { NextPage } from 'next';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import Navbar from "./navbar";
import Footer from "./footer";

type LayoutProps = {
    children: React.ReactNode;
}

const Layout: NextPage = ({ children }) => {

    return (
        <>
            <Head>
                <title>JumpStarter - Discover</title>
                <meta name="description" content="Lets JumpStart projects" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
                <main>
                    {children}
                </main>
            <Footer/>
        </>
    )
}

export default Layout;