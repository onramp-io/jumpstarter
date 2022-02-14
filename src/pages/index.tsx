import LandingComponent from '@frontend/landingComponent';
import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../frontend/components/footer';
import Navbar from '../frontend/components/navbar';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>JumpStarter</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingComponent />
    </>
  );
};

export default Home;
