import type { AppProps } from 'next/app';
import GlobalStyles from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
      <link rel="icon" href="/marvel-favicon.png" />
    </>
  );
}

export default MyApp;
