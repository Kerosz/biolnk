import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="194x194"
            href="/favicons/favicon-194x194.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicons/android-chrome-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#e03177"
          />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <link rel="icon" href="/favicons/favicon.ico" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="apple-mobile-web-app-title" content="Biolnk Studio" />
          <meta name="application-name" content="Biolnk Studio" />
          <meta name="msapplication-TileColor" content="#fdfcfd" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="theme-color" content="#e93d82" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
