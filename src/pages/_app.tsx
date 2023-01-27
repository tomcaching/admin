import '@/styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

const theme = extendTheme({
  colors: {
    geocaching: {
      green: "#02874d",
      white: "#ffffff",
      light: "#e6f7ef",
      gray: {
        default: "#c1c1c1",
        light: "#efefef"
      },
      brown: {
        darker: "#5f452a",
        dark: "#83603f",
        light: "#f8edd4",
      },
    },
  },
  components: {
    Button: {
      variants: {
        geocaching: {
          bg: "geocaching.green",
          color: "geocaching.white"
        }
      }
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
