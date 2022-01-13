import {
  Features,
  Footer,
  Header,
  Hero,
  MeetBiolnk,
  Testimonials,
} from "~/components/landing/index";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <MeetBiolnk />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
}
