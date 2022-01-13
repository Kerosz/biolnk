import Image from "next/image";
import Frame from "~assets/images/frame.png";
import LockScreen from "~assets/images/lock-screen.jpg";
import PageScreen from "~assets/images/page-mock.jpg";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { Container, Flex } from "@biolnk/gamut";
import type { FC } from "react";

/**
 * @TODO Improve the animations for small screens
 */
const MeetBiolnk: FC = () => {
  const { scrollYProgress } = useViewportScroll();
  const meetAnim = useTransform(
    scrollYProgress,
    [0, 0.23, 0.28, 1],
    [0, -220, -220, 0]
  );
  const bioAnim = useTransform(
    scrollYProgress,
    [0, 0.23, 0.28, 1],
    [0, 220, 220, 0]
  );
  const lockAnim = useTransform(scrollYProgress, [0.15, 0.23], [0, -718]);

  return (
    <Container className="flex flex-col pt-36 pb-28 items-center relative">
      <Flex className="!absolute top-80 overflow-hidden">
        <motion.div
          className="overflow-hidden text-right w-[50vw] transform-gpu will-change-transform"
          style={{
            x: meetAnim,
          }}
        >
          <h2 className="text-[200px] leading-none font-bold overflow-hidden">
            Meet
          </h2>
        </motion.div>
        <motion.div
          className="overflow-hidden text-left w-[50vw]"
          style={{
            x: bioAnim,
          }}
        >
          <h2 className="text-[200px] leading-none font-bold overflow-hidden tracking-tighter">
            Biolnk
          </h2>
        </motion.div>
      </Flex>
      <div className="w-[400px] relative z-20">
        <Image
          width={400}
          height={778}
          src={Frame}
          alt="Phone frame"
          priority
        />
        <div className="absolute overflow-hidden top-9 left-9 bottom-[35px] right-[37px] -z-10">
          <Image
            width={326}
            height={703}
            src={PageScreen}
            alt="Lisa's Biolnk Page"
          />
          <motion.div
            className="absolute top-0"
            style={{
              y: lockAnim,
            }}
          >
            <Image
              width={327}
              height={710}
              src={LockScreen}
              alt="Phone lock screen"
              priority
              className="rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default MeetBiolnk;
