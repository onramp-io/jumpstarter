import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { Auth } from 'aws-amplify';

import { Alert, AlertTitle, Box } from '@mui/material';
import styles from '../styles/Login.module.css';
import Navbar from '../frontend/components/navbar';
import Footer from '../frontend/components/footer';

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
      router.push('/profile');
    } catch (error) {
      console.log('error signing in', error);
    }
    setIsLoggingIn(false);
  };

  return (
    <>
      <Head>
        <title>JumpStarter - Login</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Box className={styles.login_wrapper}>
        <h1>Confirm Sign Up</h1>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              onChangeUsername(e);
            }}
            className={styles.login_input}
          />
          <input
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
            <Alert severity="error">
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
          )}
          <div className="auth-buttons">
            <button
              disabled={isLoggingIn}
              type="submit"
              onClick={handleLogin}
              className={styles.login_button}
            >
              Confirm
            </button>
          </div>
        </div>
        <div className={styles.account_not_exists}>
          Don&apos;t have an account?
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default VerifySignup;
