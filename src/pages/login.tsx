/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Heading, TextInput, Box, Notification, Button } from 'grommet';

import styles from '../styles/Login.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/client/client';

import { Alert, AlertTitle } from '@mui/material';

import cookie from 'js-cookie';

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
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/app/profile');
    } catch (error) {
      setError('Invalid email or password');
    }
    setIsLoggingIn(false);
  };

  return (
    <>
      {/**
       * {styles.loginWrapper}
       */}
      <Box className="">
        {/**
         * styles.container
         */}
        <Box className={`auth_container`}>
          {/**
           * ${styles.header}
           */}
          <Heading className={`auth_header`}>Login</Heading>
          {/**
           * ${styles.form}
           */}
          <Box className={`auth_inputs`}>
            <TextInput
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                onChangeEmail(e);
              }}
              className={styles.loginInput}
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                onChangePassword(e);
              }}
              className={styles.loginInput}
            />
            {errorMessage !== '' && (
              <Alert severity="error">
                <AlertTitle>{errorMessage}</AlertTitle>
              </Alert>
            )}
            <Box className="auth-buttons">
              <Button
                primary
                disabled={isLoggingIn}
                type="submit"
                onClick={handleLogin}
                className={styles.loginButton}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
        {/**
         * styles.accountNotExists
         */}
        <Box className={`auth_accountNotExists`}>
          Don't have an account?
          <Link href="/signup">
            {/**
             * styles.signupLink
             */}
            <a className={`auth_signupLink`}>Sign up</a>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Login;
