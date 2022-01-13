import { Container, Text } from "@biolnk/gamut";
import type { FC } from "react";

/**
 * @TODO Add back the features once we get the cards improvemts
 */
const Features: FC = () => {
  return (
    <section className="bg-mauve-300">
      <Container as="div" className="pt-32 pb-28 flex flex-col items-center">
        <h2 className="text-7xl bg-clip-text text-transparent bg-gradient-btn-active font-semibold max-w-6xl text-center pb-8">
          The link between you and your audience.
        </h2>
        <Text center className="xs:!text-xl !text-lg max-w-4xl">
          With Biolnk you can create pages for things like blogs, merch,
          multimedia and so much more. Everything included, no subscription or
          upgrades needed.
        </Text>

        {/* <div className="grid lg:grid-cols-3 md:grid-cols-2 w-full xl:gap-8 gap-4 mt-20">
          <FeatureCard
            title="Add all your links"
            description="Biolnk makes it super simple to create and manage new links, allowing your audience to engage with your online content through a custom page that reflects your brand."
          />
          <FeatureCard
            title="Your own look and feel"
            description="Customize your biolink page to fit your brand with your logo, the right colors, background image and much more. You get one link you can share anywhere, on platforms."
          />
          <FeatureCard
            title="Effortless integrations"
            description="Has a plug and play feel, easily integrate with all your favorite tools and APIs including Google Analytics and more."
          />
        </div> */}
      </Container>
    </section>
  );
};

export default Features;
