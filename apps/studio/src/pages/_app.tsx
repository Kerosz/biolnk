import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SupabaseProvider } from "~/lib/supabase";
import queryClient from "../lib/reactQuery";
import useTheme from "~/hooks/useTheme";

import type { AppProps } from "next/app";

import "~/globals.css";

function App({ Component, pageProps }: AppProps) {
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SupabaseProvider>
        <Component {...pageProps} />
      </SupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;