import type { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mui/material';
import styles from '../../../styles/Signup.module.css';
import Footer from '../../../frontend/components/footer';
import Navbar from '../../../frontend/components/navbar';

const EditProfile: NextPage = () => {
  return (
    <>
      <Head>
        <title>JumpStarter - EditProfile</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Box className={styles.signup_wrapper}>
        <h1>EditProfile</h1>
      </Box>
      <Footer />
    </>
  );
};

export default EditProfile;
