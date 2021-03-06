import { useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Link from "next/link";

import styles from "../styles/Signup.module.css";
import { Heading, TextInput, Box, Button, Notification } from "grommet";
import { createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../firebase/client/client";
import axios from "../axios/instance";

import { Alert, AlertTitle } from "@mui/material";

const Signup: NextPage = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");
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
      await createUserWithEmailAndPassword(auth, email, password);
      const body = {
        firstName: fName,
        lastName: lName,
        email: email,
      };
      await axios.post('/users/create', body);
      router.push('/app/preferences');
    } catch (error) {
      setError("Invalid email or password");
    }
    setIsSigningUp(false);
  };

  return (
    <>
      {/**
       * {styles.signupWrapper}
       */}
      <Box className="">
        {/**
         * {styles.container}
         */}
        <Box className="auth_container">
          <Heading className={styles.header}>Create a new account</Heading>
          {/**
           *
           * {styles.form}
           */}
          <Box className="auth_inputs">
            <TextInput
              type="text"
              name="name"
              placeholder="First Name"
              value={fName}
              onChange={(e) => {
                onChangeFName(e);
              }}
              className={styles.signupInput}
            />
            <TextInput
              type="text"
              name="name"
              placeholder="Last Name"
              value={lName}
              onChange={(e) => {
                onChangeLName(e);
              }}
              className={styles.signupInput}
            />
            <TextInput
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                onChangeEmail(e);
              }}
              className={styles.signupInput}
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                onChangePassword(e);
              }}
              className={styles.signupInput}
            />
            {errorMessage !== "" && (
              <Alert severity="error">
                <AlertTitle>{errorMessage}</AlertTitle>
              </Alert>
            )}
            <Box className="auth-buttons">
              <Button
                primary
                disabled={isSigningUp}
                type="submit"
                onClick={handleSignUp}
                className={styles.signupButton}
              >
                Sign up
              </Button>
            </Box>
          </Box>
          <Box className={styles.accountExists}>
            Already have an account?
            <Link href="/login">
              <a className={styles.loginLink}>Login</a>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Signup;
