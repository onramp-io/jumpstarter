import type { NextPage } from 'next';
import home from '../../styles/Home.module.css';
import { Home } from 'grommet-icons';
import Link from 'next/link';
import { Box, Text } from 'grommet';

const Navbar: NextPage = () => {
  return (
    <Box className={home.grid}>
      <Link href="/">
        <a className={home.card}>
          <Home />
        </a>
      </Link>

      <Link href="/app/create">
        <a className={home.card}>
          <Text>Create a new project</Text>
        </a>
      </Link>
      <Link href="/discover">
        <a className={home.card}>
          <Text>Discover</Text>
        </a>
      </Link>
      <Link href="/login">
        <a className={home.card}>
          <Text>Login</Text>
        </a>
      </Link>
      <Link href="/signup">
        <a className={home.card}>
          <Text>Signup</Text>
        </a>
      </Link>
    </Box>
  );
};

export default Navbar;
