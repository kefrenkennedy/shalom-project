import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '@/styles/theme';
import { AppProvider } from '@/hooks';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  );
}
