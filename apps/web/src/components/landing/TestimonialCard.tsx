import { getPageLink } from "@biolnk/core";
import { Flex } from "@biolnk/gamut";
import Image from "next/image";
import type { FC } from "react";
import Link from "../Link";

export interface TestimonialCardProps {
  name: string;
  username: string;
  image: string;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  name,
  username,
  image,
}) => {
  const [pageLabel, pageLink] = getPageLink(username, "SUBDOMAIN");

  return (
    <Flex layout="vertical" className="items-center mb-6 mx-2.5">
      <Flex className="max-w-max max-h-max h-fit mb-8">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="rounded-full"
        />
      </Flex>

      <span className="text-mauve-50 text-xl">{name}</span>
      <Link
        url={pageLink}
        className="bg-clip-text text-transparent bg-gradient-btn max-w-fit block decoration-2 underline decoration-wavy decoration-crimson-800 text-lg"
      >
        {pageLabel}
      </Link>
    </Flex>
  );
};

export default TestimonialCard;
