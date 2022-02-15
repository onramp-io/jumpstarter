import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@frontend/components/layout'
import { Grommet } from 'grommet';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grommet plain>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Grommet>
  )
}

export default MyApp
