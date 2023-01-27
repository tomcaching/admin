import '@/styles/globals.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

// TODO: Use loop to generate this?
const expandColor = (value: string) => {
  return {
    100: value,
    200: value,
    300: value,
    400: value,
    500: value,
    600: value,
    700: value,
    800: value,
    900: value,
  }
}

const theme = extendTheme({
  colors: {
    geocaching: {
      green: expandColor("#02874d"),
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
      defaultProps: {
        colorScheme: "geocaching.green"
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
