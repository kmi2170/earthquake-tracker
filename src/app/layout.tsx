import { Metadata } from 'next';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { EqMapContextProvider } from '../context/eqMapContext ';
import QueryProvider from '../context/QueryProvider';
import { EqDateContextProvider } from '../context/eqDateContext';
import { EqMagContextProvider } from '../context/eqMagContext';
import theme from '../styles/theme';

export const metadata: Metadata = {
  title: 'Earthquake Tracker',
  description: [
    'Next.js project with TypeScript, React-QUery, React-Leaflet, Material-UI,.',
    'Display worldwide earthquake event information  up to the last 90 days,',
    'in Map and Table',
  ].join(' '),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <QueryProvider>
              <EqMagContextProvider>
                <EqDateContextProvider>
                  <EqMapContextProvider>{children}</EqMapContextProvider>
                </EqDateContextProvider>
              </EqMagContextProvider>
            </QueryProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
