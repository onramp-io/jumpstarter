import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { withStyles } from '@material-ui/core';
import { Grommet } from 'grommet';

function MyApp({ Component, pageProps }: AppProps) {
  const theme = {
    global: {
      font: {
        family: 'Roboto',
        size: '14px',
        height: '20px',
      },
    },
  };

  return (
    <Grommet theme={theme}>
      <Component {...pageProps} />
    </Grommet>
  )
}

export default MyApp
