import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withStyles } from '@material-ui/core';
import { Grommet } from 'grommet';
import { NavBar } from '@frontend/components/grommetNavbar';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = {
    global: {
      font: {
        family: 'Arial',
        size: '14px',
        height: '20px',
      },
    },
  };

  return (
    <Grommet theme={theme}>
      <NavBar />
      <Component {...pageProps} />
    </Grommet>
  )
}

export default MyApp
