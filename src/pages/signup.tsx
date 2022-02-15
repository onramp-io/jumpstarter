import { useState } from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

import styles from '../styles/Signup.module.css';
import Navbar from '../frontend/components/navbar';
import Footer from '../frontend/components/footer';
import axios from 'axios';
import userpool from 'config/userpool';
import Link from 'next/link';

const Signup: NextPage = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const onChangeFName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFName(e.target.value);
  };

  const onChangeLName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLName(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const setCognitoUserAttribute = (key: string, val: string) => {
    const attribute = new CognitoUserAttribute({ Name: key, Value: val });
    return attribute;
  };

  const handleSignUp = async () => {
    setIsSigningUp(true);
    try {
      console.log('Signing up...');

      let attributeList = [];
      let validationData: CognitoUserAttribute[] = [];

      attributeList.push(setCognitoUserAttribute('name', fName));
      attributeList.push(setCognitoUserAttribute('family_name', lName));
      attributeList.push(setCognitoUserAttribute('email', email));

      userpool.signUp(
        email,
        password,
        attributeList,
        validationData,
        (err, result) => {
          if (err) {
            setError(err.message);
            setIsSigningUp(false);
            return;
          } else if (result) {
            console.log('User name is ' + result);
            setIsSigningUp(false);
          }
        }
      );
    } catch (err) {
      console.log(err);
      console.log(err);
    }
    setIsSigningUp(false);
  };

  return (
    <>
      <Head>
        <title>JumpStarter - Sign up</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.signup_wrapper}>
        <h1>Create a new account</h1>
        <div>
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={fName}
            onChange={(e) => {
              onChangeFName(e);
            }}
            className={styles.signup_input}
          />
          <input
            type="text"
            name="name"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => {
              onChangeLName(e);
            }}
            className={styles.signup_input}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              onChangeEmail(e);
            }}
            className={styles.signup_input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              onChangePassword(e);
            }}
            className={styles.signup_input}
          />
          {errorMessage !== '' && (
            <Alert severity="error">
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
          )}
          <div className="auth-buttons">
            <button
              disabled={isSigningUp}
              type="submit"
              onClick={handleSignUp}
              className={styles.signup_button}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className={styles.account_exists}>
          Already have an account?
          <Link href="/login">Login</Link>
        </div>
      </Box>
    </>
  );
};

export default Signup;
