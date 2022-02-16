import type { NextPage } from 'next';
import { Box } from 'grommet';
import styles from '../styles/Signup.module.css';
import { Heading } from 'grommet';

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
