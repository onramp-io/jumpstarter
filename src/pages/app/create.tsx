import { Box, Heading } from 'grommet';
import type { NextPage } from 'next';
import styles from '../../styles/Signup.module.css';

const Create: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>Create a new project</Heading>
      </Box>
    </>
  );
};

export default Create;
