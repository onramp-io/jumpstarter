import { Box } from 'grommet';
import type { NextPage } from 'next';
import home from '../../styles/Home.module.css';

const Footer: NextPage = () => {
  return (
    <Box>
      <footer className={home.footer}>Built by Team Blend 😎</footer>
    </Box>
  );
};

export default Footer;
