import type { NextPage } from 'next';
import { Box, Heading } from 'grommet';
import styles from '../styles/Signup.module.css';

const Project: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>Project XYZ</Heading>
      </Box>
    </>
  );
};

export default Project;
