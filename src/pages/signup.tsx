import { useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Link from 'next/link';

import styles from '../styles/Signup.module.css';
import { Heading, TextInput, Box, Button, Notification } from 'grommet';
import { createUserWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { auth } from '../firebase/client/client';
import axios from 'axios';

const Signup: NextPage = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setError] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const router = useRouter();

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

  const handleSignUp = async () => {
    setIsSigningUp(true);
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const token = await getIdToken(data.user);
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const body = {
        firstName: fName,
        lastName: lName,
        email: email,
      };
      const response = await axios.post(
        'http://localhost:3000/api/users/create',
        body,
        {
          headers,
        }
      );
      console.log('response: ', response);
      router.push('/login');
    } catch (error) {
      setError(error.message);
    }
    setIsSigningUp(false);
  };

  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>Create a new account</Heading>
        <Box>
          <TextInput
            type="text"
            name="name"
            placeholder="First Name"
            value={fName}
            onChange={(e) => {
              onChangeFName(e);
            }}
            className={styles.signup_input}
          />
          <TextInput
            type="text"
            name="name"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => {
              onChangeLName(e);
            }}
            className={styles.signup_input}
          />
          <TextInput
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              onChangeEmail(e);
            }}
            className={styles.signup_input}
          />
          <TextInput
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
            <Notification title="Error" message={errorMessage} />
          )}
          <Box className="auth-buttons">
            <Button
              primary
              disabled={isSigningUp}
              type="submit"
              onClick={handleSignUp}
              className={styles.signup_button}
            >
              Sign up
            </Button>
          </Box>
        </Box>
        <Box className={styles.account_exists}>
          Already have an account?
          <Link href="/login">Login</Link>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
