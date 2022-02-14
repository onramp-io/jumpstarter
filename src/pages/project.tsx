import type { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mui/material';
import styles from '../styles/Signup.module.css';
import home from '../styles/Home.module.css';
import Navbar from '../frontend/components/navbar';
import Footer from '../frontend/components/footer';

const Project: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <h1>Project XYZ</h1>
      </Box>
    </>
  );
};

export default Project;
