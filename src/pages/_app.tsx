import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SSRProvider } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </QueryClientProvider>
  );
}
