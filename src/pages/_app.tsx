import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from 'react-query';

import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../utils/theme';

import { SEO } from '../components/SEO';
import '../styles/globals.css';
import { EqDataContextProvider } from '../context';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const queryClient = React.useRef(new QueryClient());

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient.current}>
          <Head>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
            <SEO />
          </Head>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <EqDataContextProvider>
            <Component {...pageProps} />
          </EqDataContextProvider>
          {/* 
            <ReactQueryDevtools />
            */}
        </QueryClientProvider>
      </ThemeProvider>
      )
    </StyledEngineProvider>
  );
};

export default MyApp;
