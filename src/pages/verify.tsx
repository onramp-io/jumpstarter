/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Auth } from 'aws-amplify';
import {
  Button,
  Grommet,
  Heading,
  Text,
  TextInput,
  Box,
  Notification,
} from 'grommet';

import styles from '../styles/Login.module.css';

const VerifySignup: NextPage = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const router = useRouter();

  const onChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const user = await Auth.confirmSignUp(username, code);
      console.log(user);
      router.push('/app/profile');
    } catch (error) {
      console.log('error signing in', error);
      setError(error.message);
    }
    setIsLoggingIn(false);
  };

  return (
    <>
      <Box className={styles.login_wrapper}>
        <Heading>Confirm Sign Up</Heading>
        <Box>
          <TextInput
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              onChangeUsername(e);
            }}
            className={styles.login_input}
          />
          <TextInput
            type="text"
            name="code"
            placeholder="Code"
            value={code}
            onChange={(e) => {
              onChangeCode(e);
            }}
            className={styles.login_input}
          />
          {errorMessage !== '' && (
            <Notification title="Error" message={errorMessage} />
          )}
          <Box className="auth-buttons">
            <Button
              primary
              disabled={isLoggingIn}
              type="submit"
              onClick={handleLogin}
              className={styles.login_button}
            >
              Confirm
            </Button>
          </Box>
        </Box>
        <Box className={styles.account_not_exists}>
          Don't have an account?
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default VerifySignup;
