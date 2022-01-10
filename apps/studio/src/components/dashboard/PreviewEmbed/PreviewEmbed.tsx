import useUser from "~/utils/hooks/queries/useUser";
import { useWindowSize, getPageLink } from "@biolnk/core";

import Styles from "./PreviewEmbed.module.css";

const PreviewEmbed: React.FC = () => {
  const { width } = useWindowSize();
  const { user } = useUser();

  const [_, pageLinkUrl] = getPageLink(user?.username, user?.page_link);

  const baseWidth = 1200;
  const scaleWidth = width > 1160 ? baseWidth : width;

  return (
    <aside className={Styles["blui-embed-root"]}>
      <div
        className={Styles["blui-embed-container"]}
        style={{ transform: `scale(${scaleWidth / baseWidth})` }}
      >
        <iframe
          key="iframe-preview"
          src={pageLinkUrl}
          className={Styles["blui-embed-iframe"]}
          width="100%"
          height="100%"
          frameBorder={0}
        />
      </div>
    </aside>
  );
};

export default PreviewEmbed;
