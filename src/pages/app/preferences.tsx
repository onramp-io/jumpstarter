import type { NextPage } from 'next';
import { Box, Heading } from 'grommet';
import styles from '../../styles/Signup.module.css';

const Preferences: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>Preferences</Heading>
      </Box>
    </>
  );
};

export default Preferences;
