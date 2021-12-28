import queryClient from "../lib/reactQuery";
import useTheme from "~/utils/hooks/useTheme";
import ErrorBoundary from "~/components/common/ErrorBoundary";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SupabaseProvider } from "~/lib/supabase";
import { Toaster } from "@biolnk/ui";

import type { AppProps } from "next/app";

import "~/globals.css";

function App({ Component, pageProps }: AppProps) {
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SupabaseProvider>
        <Toaster position="bottom-right" />
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </SupabaseProvider>
    </QueryClientProvider>
  );
}

export default App;
