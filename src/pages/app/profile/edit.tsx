import type { NextPage } from "next";
import styles from "../../../styles/EditUser.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Heading,
  TextInput,
  Box,
  Notification,
  Button,
  Avatar,
  FileInput,
  Text,
} from "grommet";
import axios from "../../../axios/instance";
import { useAuth, useUserDispatch } from "@frontend/context/AuthProvider";
import { deleteUser, getAuth } from "firebase/auth";
import { Alert, AlertTitle } from "@mui/material";

const EditProfile: NextPage = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [bioValue, setBio] = useState("");
  const [errorMessage, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { firstName, lastName, bio, avatar } = useAuth();

  const router = useRouter();

  const onChangeFName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFName(e.target.value);
  };

  const onChangeLName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLName(e.target.value);
  };

  const onChangeBio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const body = {
        firstName: fName,
        lastName: lName,
        bio: bioValue,
        avatar: "",
      };
      await axios.put(`/users/update`, body);
      router.push("/app/profile");
    } catch (error) {
      setError(error.message);
    }
    setIsSubmitting(false);
  };

  const delUser = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      deleteUser(user).then(async () => {
        const res = await axios.delete(`/users/delete`);
        router.push("/");
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Box className={styles.wrapper}>
        <Heading className={styles.header}>Edit Profile</Heading>
        <Box className={styles.container}>
          <Box className={styles.avatar}>
            <Box direction="row" gap="small">
              <Avatar
                src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
                size="3xl"
                className={styles.avatarImg}
              />
            </Box>
            <FileInput
              name="file"
              placeholder="Upload a profile picture"
              onChange={(event) => {
                const fileList = event.target.files;
                for (let i = 0; i < fileList.length; i += 1) {
                  const file = fileList[i];
                }
              }}
            />
          </Box>
          <Box className={styles.form}>
            <Box className={styles.textLabel}>
              <Text className={styles.label}>First Name</Text>
              <TextInput
                type="text"
                name="name"
                placeholder={firstName}
                value={fName}
                onChange={(e) => {
                  onChangeFName(e);
                }}
              />
            </Box>
            <Box className={styles.textLabel}>
              <Text className={styles.label}>Last Name</Text>
              <TextInput
                type="text"
                name="name"
                placeholder={lastName}
                value={lName}
                onChange={(e) => {
                  onChangeLName(e);
                }}
              />
            </Box>
            <Box className={styles.textLabel}>
              <Text className={styles.label}>Bio</Text>
              <TextInput
                type="text"
                name="name"
                placeholder={bio}
                value={bioValue}
                onChange={(e) => {
                  onChangeBio(e);
                }}
                className={styles.bio}
              />
            </Box>
            <Box>
              <Button
                disabled={isSubmitting}
                type="submit"
                onClick={handleSubmit}
                className={styles.saveButton}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
        <Text onClick={delUser} className={styles.deleteUser}>
          Delete Account
        </Text>
        {errorMessage !== "" && (
          <Alert severity="error">
            <AlertTitle>{errorMessage}</AlertTitle>
          </Alert>
        )}
      </Box>
    </>
  );
};

export default EditProfile;
