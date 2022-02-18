import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@frontend/components/layout';
import { PrivateRouteProvider } from '@frontend/context/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PrivateRouteProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PrivateRouteProvider>
  );
}

export default MyApp;
