/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Heading, TextInput, Box, Notification, Button } from 'grommet';

import styles from '../styles/Login.module.css';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const router = useRouter();

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      router.push('/app/profile');
    } catch (error) {
      setError(error.message);
    }
    setIsLoggingIn(false);
  };

  return (
    <>
      <Box className={styles.login_wrapper}>
        <Heading>Login</Heading>
        <>
          <TextInput
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              onChangeEmail(e);
            }}
            className={styles.login_input}
          />
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              onChangePassword(e);
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
              Login
            </Button>
          </Box>
        </>
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

export default Login;
