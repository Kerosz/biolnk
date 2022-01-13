import {
  BaseIcon,
  Heading,
  Text,
  Container,
  Input,
  Flex,
  Link,
  Button,
} from "@biolnk/gamut";
import type { FC } from "react";

const Hero: FC = () => {
  return (
    <Container className="flex flex-col pt-20 items-center">
      <Flex
        className="h-20 w-20 bg-gradient-btn-active rounded-full justify-center items-center text-mauve-50 mb-6"
        aria-label="Link Icon"
      >
        <BaseIcon icon={Link} size={36} strokeWidth={2} />
      </Flex>

      <h1 className="sm:text-[88px] xs:text-6xl text-5xl text-center max-w-7xl font-bold xs:leading-none tracking-tight pb-6">
        All your online content into one short, easy Biolink.
      </h1>
      <Text center className="xs:!text-xl !text-lg max-w-5xl">
        With Biolnk you can create pages for things like blogs, merch,
        multimedia and so much more. Everything included, no subscription or
        upgrades needed.
      </Text>

      <Flex className="items-center space-x-2 mt-16 sm:flex-row flex-col">
        <Input
          id="username"
          type="text"
          title="Please enter a username!"
          label="Username"
          srOnlyLabel
          leftAddon="biolnk.me/"
          tightAddonSpace
          autoComplete="username"
          placeholder="username"
          borderless
          size="2xl"
        />
        <Button
          size="2xl"
          variant="primary"
          className="mt-3.5 w-full sm:!max-w-max"
        >
          Claim my link
        </Button>
      </Flex>
    </Container>
  );
};

export default Hero;
