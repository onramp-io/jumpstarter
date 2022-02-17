import React from 'react';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';

import { Box, Heading, Button, Text } from 'grommet';

import styles from '../../../styles/Signup.module.css';
import admin from '../../../firebase/admin/admin';
import { useAuth } from '@frontend/context/AuthProvider';

function MyProfile() {
  const router = useRouter();
  const { access_token } = useAuth();

  const signOut = async function () {
    try {
      router.push('/login');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>MyProfile</Heading>
        <Heading>Hello {access_token}</Heading>
        {access_token}
        <Button primary onClick={signOut}>
          Sign out
        </Button>
      </Box>
    </>
  );
}

export default MyProfile;
