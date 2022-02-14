import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import Navbar from '@frontend/components/navbar';

Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
