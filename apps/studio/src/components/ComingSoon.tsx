import { Heading, Text, Flex, Badge } from "@biolnk/gamut";
import { FC } from "react";
import Link from "./common/Link";

export interface ComingSoonProps {
  size?: "default" | "lg" | "xs" | "sm" | "md" | "xl";
  showExtras?: boolean;
  showTitle?: boolean;
}

const ComingSoon: FC<ComingSoonProps> = ({
  size = "lg",
  showExtras = true,
  showTitle = true,
}) => {
  const BUG_REPORT_URL =
    "https://github.com/Kerosz/biolnk/issues/new?assignees=&labels=bug&template=bug-report-template.md&title=";
  const FEATURE_REQUEST_URL =
    "https://github.com/Kerosz/biolnk/issues/new?assignees=&labels=feature-request&template=feature_request.md&title=%5BRequest%5D+My+feature+request+title";
  const ROADMAP_URL = "https://github.com/Kerosz/biolnk/issues";

  return (
    <section className="py-6">
      <Flex className="mb-8 flex-col sm:flex-row sm:items-center">
        {showTitle && (
          <Heading
            as="h2"
            className="font-bold uppercase !text-mauveDark-500 mb-4 sm:mb-0 sm:mr-4"
            size={size}
            spacing="tight"
          >
            We are working on it
          </Heading>
        )}
        <Badge variant="crimson">Coming soon</Badge>
      </Flex>

      {showExtras && (
        <Text size="leading" className="!leading-8">
          This feature will ship as soon as possible, meanwhile if you are
          interested in the development status, check out the{" "}
          <Link
            url={ROADMAP_URL}
            variant="hover"
            className="text-crimson-950"
            external
          >
            current roadmap
          </Link>
          . If you find any bugs feel free to{" "}
          <Link
            url={FEATURE_REQUEST_URL}
            variant="hover"
            className="text-crimson-950"
          >
            report them here
          </Link>
          , we also appreciate if you could share any ideas on how we can
          improve the app experience{" "}
          <Link
            url={BUG_REPORT_URL}
            variant="hover"
            className="text-crimson-950"
            external
          >
            here
          </Link>
        </Text>
      )}
    </section>
  );
};

export default ComingSoon;
