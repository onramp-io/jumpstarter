import type { NextPage } from 'next';
import { Box, Heading } from 'grommet';
import styles from '../../styles/Signup.module.css';
import UserPreferences from '@frontend/components/preferencesComponent';

const Preferences: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>Preferences</Heading>
        <UserPreferences />
      </Box>
    </>
  );
};

export default Preferences;
