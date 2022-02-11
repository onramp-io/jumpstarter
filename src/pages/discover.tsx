import type { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mui/material';
import styles from '../styles/Signup.module.css';
import home from '../styles/Home.module.css';
import Navbar from '../frontend/components/navbar';
import Footer from '../frontend/components/footer';

const Discover: NextPage = () => {
  return (
    <>
      <Head>
        <title>JumpStarter - Discover</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Box className={styles.signup_wrapper}>
        <h1>Discover</h1>
      </Box>
      <Footer />
    </>
  );
};

export default Discover;
