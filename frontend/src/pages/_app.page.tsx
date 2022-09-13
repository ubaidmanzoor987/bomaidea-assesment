import type { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import '@fontsource/inter';

import store from '../store';
import theme from '../theme';
import '../styles/global.scss';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
  );
}
