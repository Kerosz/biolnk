import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import queryClient from "../lib/reactQuery";
import useTheme from "~/hooks/useTheme";

import type { AppProps } from "next/app";

import "~/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
