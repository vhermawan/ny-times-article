import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalContextProvider } from '@/context/globalContext';

const QueryClients = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      cacheTime: 60 * 1000, // 60seconds
      staleTime: 0 * 10 * 1000, // 0seconds
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={QueryClients}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalContextProvider>
          <Component {...pageProps} />
        </GlobalContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
