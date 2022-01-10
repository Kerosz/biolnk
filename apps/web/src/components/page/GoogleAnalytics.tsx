import Script from "next/script";
import type { FC } from "react";

export interface GoogleAnalyticsIntegrationProps {
  trackingID: string | null;
  pageID: string;
}

const GoogleAnalyticsIntegration: FC<GoogleAnalyticsIntegrationProps> = ({
  trackingID,
  pageID,
}) => {
  return !!trackingID ? (
    <>
      <Script
        id={`${pageID}__gtag--script`}
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingID}`}
      />
      <Script
        id={`${pageID}__gtag--init`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${trackingID}');
          `,
        }}
      />
    </>
  ) : null;
};

export default GoogleAnalyticsIntegration;
