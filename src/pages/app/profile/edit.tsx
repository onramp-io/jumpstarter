import type { NextPage } from 'next';
import styles from '../../../styles/Signup.module.css';
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
} from 'grommet';
import axios from 'axios';

const EditProfile: NextPage = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [bio, setBio] = useState('');
  const [errorMessage, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        `http://localhost:3000/api/users/user`,
        {
          fName,
          lName,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      router.push('/app/profile');
    } catch (error) {
      setError(error.message);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/api/users/user`).then((res) => {
        setFName(res.data.fName);
        setLName(res.data.lName);
        setBio(res.data.bio);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Box className={styles.login_wrapper}>
        <Heading>Edit Profile</Heading>
        <>
          <Box direction="row" gap="small">
            <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
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
          <TextInput
            type="text"
            name="name"
            placeholder={fName}
            value={fName}
            onChange={(e) => {
              onChangeFName(e);
            }}
            className={styles.login_input}
          />
          <TextInput
            type="text"
            name="name"
            placeholder={lName}
            value={lName}
            onChange={(e) => {
              onChangeLName(e);
            }}
            className={styles.login_input}
          />
          <TextInput
            type="text"
            name="name"
            placeholder={bio}
            value={bio}
            onChange={(e) => {
              onChangeBio(e);
            }}
            className={styles.login_input}
          />
          {errorMessage !== '' && (
            <Notification title="Error" message={errorMessage} />
          )}
          <Box className="auth-buttons">
            <Button
              primary
              disabled={isSubmitting}
              type="submit"
              onClick={handleSubmit}
              className={styles.login_button}
            >
              Submit
            </Button>
          </Box>
        </>
      </Box>
    </>
  );
};

export default EditProfile;
