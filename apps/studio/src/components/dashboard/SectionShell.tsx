import { Heading } from "@biolnk/ui";
import { FC } from "react";

export interface SectionShellProps {
  title: string;
}

const SectionShell: FC<SectionShellProps> = ({ children, title }) => {
  return (
    <section className="mb-10 last:mb-0">
      <Heading
        as="h2"
        variant="gray"
        className="font-medium mb-4"
        spacing="wide"
      >
        {title}
      </Heading>

      <div className="bg-mauve-50 py-3 sm:py-4 px-3.5 sm:px-6 rounded-sm shadow-sm">
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
