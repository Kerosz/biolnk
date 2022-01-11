import Link from "../Link";
import dynamic from "next/dynamic";
import { FC, useCallback } from "react";
import { BaseIcon, Button, EyeOff, Flex, Heading, Text } from "@biolnk/gamut";
import { useLocalStorage } from "@biolnk/core";

export interface SensitiveContentAgreementProps {
  defaultAgreement: boolean;
  pageID: string;
}

const SENSITIVE_AGREEMENT_KEY = (id: string) => `bl__${id}--nsfw-agreement`;

const SensitiveContentAgreement: FC<SensitiveContentAgreementProps> = ({
  defaultAgreement,
  pageID,
}) => {
  const [nsfw, setNsfw] = useLocalStorage(
    SENSITIVE_AGREEMENT_KEY(pageID),
    defaultAgreement
  );

  const agreeToSensitiveContent = useCallback(() => {
    return setNsfw(false);
  }, []);

  return (
    <div
      className={`${
        nsfw ? "fixed" : "hidden"
      } flex justify-center items-center inset-0 z-40`}
    >
      <div
        aria-hidden
        className={`${
          nsfw ? "fixed" : "hidden"
        } z-30 inset-0 bg-blackAlpha-700`}
      />
      <div
        className={`${nsfw ? "!absolute" : "!hidden"} z-40 max-w-xl w-full
        border border-mauve-400 bg-mauve-200 shadow-md rounded-md`}
        role="dialog"
        aria-modal="true"
      >
        <Flex layout="vertical" className="p-4 text-center items-center">
          <Heading
            as="h2"
            size="md"
            className="font-medium pb-5 flex items-center"
          >
            <BaseIcon icon={EyeOff} size={24} className="mr-2" />
            Sensitive Content
          </Heading>

          <Text className="mb-8">
            You must be at least eighteen years old to view this page. Are you
            over eighteen and willing to see sensitive content?
          </Text>

          <Flex className="space-x-2 xs:space-x-3 w-full">
            <Button
              size="lg"
              block
              // @ts-ignore
              as={Link}
              url="/"
            >
              Nope
            </Button>
            <Button
              size="lg"
              variant="colored"
              className="!bg-red-800 hover:!bg-red-900 active:!bg-red-800"
              onClick={agreeToSensitiveContent}
              block
            >
              Continue
            </Button>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SensitiveContentAgreement), {
  ssr: false,
});
