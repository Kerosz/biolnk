import { FC } from "react";
import { BaseIcon, Flex, Icon } from "@biolnk/gamut";

export interface EmptyShellProps {
  icon?: Icon;
  text: string;
  onPress?: () => void;
}

const EmptyShell: FC<EmptyShellProps> = ({ icon, text, onPress }) => {
  return (
    <Flex className="py-12" justify="center">
      <Flex
        as="button"
        className="border-2 border-dashed border-mauve-600 text-mauve-800 rounded-lg max-w-lg w-full p-12"
        layout="vertical"
        justify="center"
        align="center"
        onClick={onPress}
      >
        {icon && (
          <BaseIcon icon={icon} size={48} strokeWidth={1} className="mb-5" />
        )}
        <span className="text-mauveDark-700 text-sm">{text}</span>
      </Flex>
    </Flex>
  );
};

export default EmptyShell;
