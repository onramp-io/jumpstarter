import { Box, Heading } from 'grommet';
import type { NextPage } from 'next';
import styles from '../../../styles/Signup.module.css';

const EditProfile: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>EditProfile</Heading>
      </Box>
    </>
  );
};

export default EditProfile;
