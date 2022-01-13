import { Heading } from "@biolnk/gamut";
import type { FC } from "react";

export interface FeatureCardProps {
  title: string;
  description: string;
}

/**
 * @TODO Improve feature cards according to the design
 */
const FeatureCard: FC<FeatureCardProps> = ({ title, description }) => {
  return (
    <div className="bg-mauve-50 p-8 rounded-3xl shadow-xl">
      <Heading as="h3" className="!text-3xl font-medium pb-6">
        {title}
      </Heading>

      <p className="text-lg text-mauveDark-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
