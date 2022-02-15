import type { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mui/material';
import styles from '../../styles/Signup.module.css';
import Footer from '../../frontend/components/footer';
import Navbar from '../../frontend/components/navbar';

const Create: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <h1>Create a new project</h1>
      </Box>
    </>
  );
};

export default Create;
