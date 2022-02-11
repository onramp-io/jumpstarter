import type { NextPage } from 'next';
import home from '../../styles/Home.module.css';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

const Navbar: NextPage = () => {
  return (
    <div className={home.grid}>
      <Link href="/">
        <a className={home.card}>
          <HomeIcon />
        </a>
      </Link>

      <Link href="/app/create">
        <a className={home.card}>
          <h2>Create a new project</h2>
        </a>
      </Link>
      <Link href="/discover">
        <a className={home.card}>
          <h2>Discover</h2>
        </a>
      </Link>
      <Link href="/login">
        <a className={home.card}>
          <h2>Login</h2>
        </a>
      </Link>
      <Link href="/signup">
        <a className={home.card}>
          <h2>Signup</h2>
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
