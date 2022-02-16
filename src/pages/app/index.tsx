import type { NextPage } from 'next';
import { Box, Heading } from 'grommet';
import styles from '../../styles/Signup.module.css';

const Homepage: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>Homepage</Heading>
      </Box>
    </>
  );
};

export default Homepage;
