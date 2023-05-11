import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { AppProvider } from '@/hooks';
import { theme } from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  );
}
