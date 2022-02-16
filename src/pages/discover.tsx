import type { NextPage } from 'next';
import { Box, Heading } from 'grommet';
import styles from '../styles/Signup.module.css';

const Discover: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>Discover</Heading>
      </Box>
    </>
  );
};

export default Discover;
