import { Container, Heading, Flex } from "@biolnk/gamut";
import type { FC } from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonials: FC = () => {
  return (
    <section className="bg-mauve-300 pb-28 md:px-9 sm:px-6 px-4">
      <Container className="py-24 bg-black rounded-3xl">
        <h2 className="text-mauve-300 sm:text-5xl text-4xl font-semibold !leading-normal">
          Trusted by thousands of{" "}
          <span className="text-mauve-950">
            artists, writers, musicians, podcasters, youtubers, gamers,
            developers, hobbyists, brands...
          </span>
        </h2>

        <Flex className="xs:justify-between justify-center flex-wrap mt-20">
          <TestimonialCard
            name="Selena Gomez"
            username="selenagomez"
            image="https://qatejhwdylvqgwcegrjn.supabase.in/storage/v1/object/public/avatars/selena.jpg"
          />

          <TestimonialCard
            name="GivesYouWings"
            username="redbull"
            image="https://qatejhwdylvqgwcegrjn.supabase.in/storage/v1/object/public/avatars/redbull.jpg"
          />
          <TestimonialCard
            name="AC Milan"
            username="acmilan"
            image="https://qatejhwdylvqgwcegrjn.supabase.in/storage/v1/object/public/avatars/milan.png"
          />
          <TestimonialCard
            name="Alicia Keys"
            username="aliciakeys"
            image="https://qatejhwdylvqgwcegrjn.supabase.in/storage/v1/object/public/avatars/alicia.jpg"
          />
          <TestimonialCard
            name="Comedy Central"
            username="comedycentral"
            image="https://qatejhwdylvqgwcegrjn.supabase.in/storage/v1/object/public/avatars/comedy.jpg"
          />
        </Flex>
      </Container>
    </section>
  );
};

export default Testimonials;
