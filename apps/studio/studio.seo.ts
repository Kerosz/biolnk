import { NextSeoProps } from "next-seo";

const seoConfig: NextSeoProps = {
  title: "Dashboard",
  titleTemplate: "%s — Biolnk Studio",
  description:
    "Combine all your online content into one short, easy Biolink. Create Biolink pages for things like blogs, merch, multimedia and so much more.",
  canonical: "https://app.biolnk.me",
  openGraph: {
    type: "website",
    description:
      "Combine all your online content into one short, easy Biolink.",
    locale: "en_IE",
    url: "https://app.biolnk.me",
    site_name: "Biolnk Studio",
  },
  twitter: {
    handle: "@chirila_",
    site: "@chirila_",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      property: "dc:creator",
      content: "Chirila Andrei",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      httpEquiv: "x-ua-compatible",
      content: "IE=edge; chrome=1",
    },
  ],
};

export default seoConfig;
