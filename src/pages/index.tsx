import type { NextPage } from 'next';
import { Heading, Text, Box } from 'grommet';
import styles from '../styles/Signup.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>Welcome to JumpStarter!</Heading>
        <Text>
          JumpStarter is a platform for people to jumpstart their projects, way
          better than kicking. Join today!
        </Text>
      </Box>
    </>
  );
};

export default Home;
