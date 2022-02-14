import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Amplify, withSSRContext } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../../../aws-exports';
Amplify.configure(awsExports);

import { Box } from '@mui/material';

import styles from '../../../styles/Signup.module.css';
import Footer from '../../../frontend/components/footer';

function MyProfile({ authenticated, user, message }) {
  const router = useRouter();
  const signOut = async function () {
    try {
      await Auth.signOut();
      router.push('/login');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  return (
    <>
      <Head>
        <title>JumpStarter - MyProfile</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.signup_wrapper}>
        <h1>MyProfile</h1>
        {authenticated && (
          <>
            <h1>Hello {user}</h1>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </Box>

      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    const username = user.attributes.given_name;
    console.log('User: ', username);
    return {
      props: {
        authenticated: true,
        user: username,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
}

export default MyProfile;
