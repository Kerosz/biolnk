import Confetti from "react-confetti";
import { Dialog, Flex, Link as LinkIcon, Text } from "@biolnk/gamut";
import {
  useDisclosure,
  useWindowSize,
  User,
  useClipboard,
  noop,
  getPageLink,
} from "@biolnk/core";
import useUpdateUser from "~/utils/hooks/mutations/useUpdateUser";
import { memo } from "react";
import Link from "./common/Link";

export interface ConfettiDialogProps {
  id: string;
  username: User["username"];
  pagePreference: User["page_link"];
  displayConfetti: boolean;
}

const ConfettiDialog: React.FC<ConfettiDialogProps> = ({
  id,
  username,
  pagePreference,
  displayConfetti,
}) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: displayConfetti });
  const { width, height } = useWindowSize();
  const { mutate } = useUpdateUser();

  const [_, handleCopy] = useClipboard();
  const [linkLabel, linkUrl] = getPageLink(username, pagePreference);

  const handleConfettiClose = () => {
    mutate({ data: { onboarding_process: false }, userId: id });
    handleCopy(linkUrl);
    onClose();
  };

  return (
    <>
      {isOpen && <Confetti width={width} height={height} />}
      <Dialog
        title="Hurrah, your Biolnk is live!"
        open={isOpen}
        onClose={noop}
        actions={
          <Flex>
            <Dialog.Button
              variant="text"
              size="xl"
              rounded={false}
              icon={LinkIcon}
              block
              className="!bg-mauve-200 hover:!bg-mauve-300"
              onClick={handleConfettiClose}
            >
              Copy your link
            </Dialog.Button>
          </Flex>
        }
        showX={false}
      >
        <Flex className="text-mauve-950" layout="vertical" align="center">
          <Text center>
            Add it to your socials bio, Instagram, TikTok, Twitter, or wherever
            your audience is.
          </Text>

          <Link
            url={linkUrl}
            className="block mt-8 text-2xl bg-clip-text text-transparent bg-gradient-btn"
            noIcon
          >
            {linkLabel}
          </Link>
        </Flex>
      </Dialog>
    </>
  );
};

export default memo(ConfettiDialog);
