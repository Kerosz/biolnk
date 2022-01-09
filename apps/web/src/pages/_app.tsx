import seoConfig from "web.seo";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

import "~/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </>
  );
}

export default App;
