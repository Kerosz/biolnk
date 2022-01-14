import { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  BaseIcon,
  Text,
  Container,
  Input,
  Flex,
  Link,
  Button,
} from "@biolnk/gamut";
import { __DEV__ } from "@biolnk/core";
import { doesUsernameExist } from "~/services/supabase";

export type ClaimLinkDto = {
  username: string;
};

const Hero: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [serverError, setServerError] = useState<null | string>(null);

  const onUseranmeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    setUsername(value);
  };

  const handleClaimLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const itExists = await doesUsernameExist(username);

    if (itExists) {
      setServerError("Name already exists!");
      setUsername("");
    } else {
      window.location.href = __DEV__
        ? `http://localhost:4200/signup?username=${encodeURIComponent(
            username
          )}`
        : `https://app.biolnk.me/signup?username=${encodeURIComponent(
            username
          )}`;
    }
  };

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

      <form
        onSubmit={handleClaimLink}
        className="flex tems-center space-x-2 mt-16 sm:flex-row flex-col"
      >
        <Input
          id="username"
          type="text"
          title="Please enter a username!"
          label="Username"
          srOnlyLabel
          leftAddon="biolnk.me/"
          tightAddonSpace
          autoComplete="username"
          placeholder="name"
          borderless
          size="2xl"
          value={username}
          onChange={onUseranmeChange}
        />
        <Button
          type="submit"
          size="2xl"
          variant="primary"
          className="mt-4 w-full sm:!max-w-max"
        >
          Claim my link
        </Button>
      </form>
      {serverError && (
        <span className="block mt-2 text-red-950">{serverError}</span>
      )}
    </Container>
  );
};

export default Hero;
