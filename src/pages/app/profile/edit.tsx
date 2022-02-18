import type { NextPage } from 'next';
import styles from '../../../styles/EditUser.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  Heading,
  TextInput,
  Box,
  Notification,
  Button,
  Avatar,
  FileInput,
  Text,
} from 'grommet';
import axios from 'axios';
import { useAuth } from '@frontend/context/AuthProvider';
import { deleteUser, getAuth } from 'firebase/auth';

const EditProfile: NextPage = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [bioValue, setBio] = useState('');
  const [errorMessage, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { firstName, lastName, bio, avatar, access_token } = useAuth();

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
      const res = await axios.put(
        `http://localhost:3000/api/users/update`,
        {
          firstName: fName,
          lastName: lName,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      router.push('/app/profile');
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
        const res = await axios.delete(
          `http://localhost:3000/api/users/delete`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        router.push('/');
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
                className={styles.avatar_img}
              />
            </Box>
            <FileInput
              className={styles.avatar_input}
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
            <Box className={styles.text_label}>
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
            <Box className={styles.text_label}>
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
            <Box className={styles.text_label}>
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
              {errorMessage !== '' && (
                <Notification title="Error" message={errorMessage} />
              )}
            </Box>
            <Box>
              <Button
                disabled={isSubmitting}
                type="submit"
                onClick={handleSubmit}
                className={styles.save_button}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
        <Text onClick={delUser} className={styles.delete_user}>
          Delete Account
        </Text>
      </Box>
    </>
  );
};

export default EditProfile;
