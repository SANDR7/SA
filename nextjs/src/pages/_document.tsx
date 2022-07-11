import Document, { Head, Html, Main, NextScript } from "next/document";
import { meta } from "../utils/meta";

export default class _Document extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="robots" content="follow, index" />

          <meta name="description" content={meta.description} />

          <meta name="keywords" content={meta.keywords.join(", ")} />
          <link rel="icon" href={meta.favicon.md} />

          <link rel="canonical" href={meta.domain} />

          <meta name="theme-color" content={meta.colors.theme} />
          <meta name="msapplication-TileColor" content={meta.colors.tile} />

          {/* facebook metas */}
          <meta property="og:title" content={meta.title} />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={meta.description} />
          <meta property="og:url" content={meta.domain} />
          <meta property="og:image" content={meta.thumbnail.banner} />
          <meta property="og:image:width" content={meta.thumbnail.width} />
          <meta property="og:image:height" content={meta.thumbnail.height} />

          {/* twitter metas */}
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image" content={meta.favicon.dark} />
          <meta name="twitter:description" content={meta.description} />
        </Head>
        <body className="dark:text-black-text text-white-text selection:bg-section-light selection:dark:bg-section-dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
