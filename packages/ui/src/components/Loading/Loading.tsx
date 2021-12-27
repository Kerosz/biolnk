import React, { FC } from "react";
import Lottie from "lottie-react";
import loadingAnim from "./anim.json";

import Styles from "./Loading.module.css";

const Loading: FC = () => (
  <div className={Styles["blui-ldr"]}>
    <div className="w-64">
      <Lottie loop={true} autoplay={true} animationData={loadingAnim} />
    </div>
  </div>
);

export { Loading };
