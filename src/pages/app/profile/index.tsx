import React from 'react';

import { Box, Heading, Button, Text } from 'grommet';

import styles from '../../../styles/Signup.module.css';

import { useAuth } from '@frontend/context/AuthProvider';

function MyProfile() {
  const { firstName } = useAuth();

  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>MyProfile</Heading>
        <Heading>Hello {firstName}</Heading>
      </Box>
    </>
  );
}

export default MyProfile;
