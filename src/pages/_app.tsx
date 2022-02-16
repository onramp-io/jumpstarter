import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withStyles } from '@material-ui/core';
import { Grommet } from 'grommet';
import { NavBar } from '@frontend/components/grommetNavbar';
import Footer from '@frontend/components/footer';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = {
    global: {
      font: {
        family: 'Arial',
        size: '16px',
        height: '18px',
      },
    },
  };

  return (
    <Grommet theme={theme}>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </Grommet>
  )
}

export default MyApp
