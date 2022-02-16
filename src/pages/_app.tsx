import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@frontend/components/layout';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports'

Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
