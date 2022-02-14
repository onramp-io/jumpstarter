import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../../../aws-exports';
Amplify.configure(awsExports);

import { Box } from '@mui/material';

import styles from '../../../styles/Signup.module.css';
import Footer from '../../../frontend/components/footer';
import Navbar from '../../../frontend/components/navbar';

const MyProfile: NextPage = () => {
  const [user, setUser] = useState(null);

  const signOut = async function () {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const username = user.attributes.given_name;
        console.log('User: ', user.attributes.given_name);
        setUser(username);
      } catch (error) {
        console.log('error getting user: ', error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <Head>
        <title>JumpStarter - MyProfile</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.signup_wrapper}>
        <h1>MyProfile</h1>
        <h1>Hello {user}</h1>
        <button onClick={signOut}>Sign out</button>
      </Box>

      <Footer />
    </>
  );
};

export default MyProfile;
