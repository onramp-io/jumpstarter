import type { NextPage } from 'next';
import styles from '../../styles/Signup.module.css';
import { Box, Heading } from 'grommet';

const Checkout: NextPage = () => {
  return (
    <>
      <Box className={styles.signup_wrapper}>
        <Heading>Checkout</Heading>
      </Box>
    </>
  );
};

export default Checkout;
