import React from 'react';
import { useRouter } from 'next/router';

import { Amplify, withSSRContext } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../../../aws-exports';
Amplify.configure(awsExports);

import { Box, Heading, Button } from 'grommet';

import styles from '../../../styles/Signup.module.css';

function MyProfile({ user }) {
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
      <Box className={styles.signup_wrapper}>
        <Heading>MyProfile</Heading>
        <Heading>Hello {user}</Heading>
        <Button primary onClick={signOut}>
          Sign out
        </Button>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    const username = user.attributes.given_name;
    return {
      props: {
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
