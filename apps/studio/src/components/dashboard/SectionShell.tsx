import { Heading } from "@biolnk/ui";
import { FC } from "react";

export interface SectionShellProps {
  title: string;
}

const SectionShell: FC<SectionShellProps> = ({ children, title }) => {
  return (
    <section>
      <Heading
        as="h2"
        variant="gray"
        className="font-medium mb-4"
        spacing="wide"
      >
        {title}
      </Heading>

      <div className="bg-mauve-50 py-4 px-6 rounded-sm shadow-sm">
        {children}
      </div>
    </section>
  );
};

export default SectionShell;
