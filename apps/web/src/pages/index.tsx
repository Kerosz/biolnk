import Image from "next/image";
import Logo from "~assets/images/biolnk.png";
import { Flex } from "@biolnk/ui";

export default function HomePage() {
  return (
    <Flex as="main" align="center" justify="center" className="h-screen">
      <Image
        src={Logo}
        height={230}
        width={140}
        alt="Biolnk.me branding"
        title="Biolnk.me branding"
        priority
        placeholder="blur"
      />
    </Flex>
  );
}
