import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../frontend/components/footer';
import Navbar from '../frontend/components/navbar';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>JumpStarter</title>
        <meta name="description" content="Lets JumpStart projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <h1 className={styles.title}>Welcome to JumpStarter!</h1>
      <p className={styles.description}>
        JumpStarter is a platform for people to jumpstart their projects, way
        better than kicking. Join today!
      </p>
      <Footer />
    </div>
  );
};

export default Home;
