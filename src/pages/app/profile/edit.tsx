import type { NextPage } from "next";
import styles from "../../../styles/EditUser.module.css";
import { useContext, useEffect, useReducer, useState } from "react";
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
import axios from "axios";
import { useAuth } from "@frontend/context/AuthProvider";
import { deleteUser, getAuth } from "firebase/auth";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import urls from 'helpers/urls';

const EditProfile: NextPage = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [bioValue, setBio] = useState("");
  const [avatarImg, setAvatar] = useState<File>(null);
  const [errorMessage, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { firstName, lastName, bio, avatar, accessToken, setUser } = useAuth();

  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const headers = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      if (avatarImg) {
        // 1. Get the AWS S3 signed url
        const uploadConfig = await axios.get(urls.upload, headers);

        // 2. Upload the file to the signed url
        const userAvatar = await axios.put(
          uploadConfig.data.uploadConfig.url,
          avatarImg,
          {
            headers: {
              "Content-type": avatarImg.type,
            },
          }
        );

        // 3. Update the user profile
        const body = {
          firstName: fName || firstName,
          lastName: lName || lastName,
          bio: bioValue || bio,
          avatarImgUrl: uploadConfig.data.uploadConfig.randomKey,
        };

        const updateUserProfile = await axios.put(
          urls.userUpdate,
          body,
          headers
        );

        setUser({
          firstName: fName || firstName,
          lastName: lName || lastName,
          bio: bioValue || bio,
          avatar: uploadConfig.data.uploadConfig.randomKey,
        });
      } else {
        const body = {
          firstName: fName || firstName,
          lastName: lName || lastName,
          bio: bioValue || bio,
          avatarImgUrl: avatar,
        };
        const updateUserProfile = await axios.put(
          urls.userUpdate,
          body,
          headers
        );

        setUser({
          firstName: fName || firstName,
          lastName: lName || lastName,
          bio: bioValue || bio,
          avatar: avatar,
        });
      }

      const redirectUrl = urls.profileRedirect;
      router.push(redirectUrl);
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
        const res = await axios.delete(urls.deleteUser);
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
              {avatar ? (
                <>
                  <Avatar
                    src={process.env.AWS_BUCKET_URL + avatar}
                    size="3xl"
                    className={styles.avatarImg}
                  />
                </>
              ) : (
                <>
                  <Avatar
                    src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
                    size="3xl"
                    className={styles.avatarImg}
                  />
                </>
              )}
            </Box>
            <FileInput
              name="image"
              type="File"
              placeholder="Upload a profile picture"
              onChange={(e) => {
                setAvatar(e.target.files[0]);
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
                  setFName(e.target.value);
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
                  setLName(e.target.value);
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
                  setBio(e.target.value);
                }}
                className={styles.bio}
              />
            </Box>
            <Box>
              {isSubmitting ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                <>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    onClick={handleSubmit}
                    className={styles.saveButton}
                  >
                    Save Changes
                  </Button>
                </>
              )}
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
