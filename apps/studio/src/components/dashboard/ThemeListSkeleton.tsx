import Skeleton from "react-loading-skeleton";
import { FC } from "react";

const ThemeListSkeleton: FC = () => {
  return (
    <ul className="grid grid-cols-4 gap-7">
      {Array(9)
        .fill(0)
        .map((_, idx) => (
          <Skeleton key={idx} height={230} width={163} />
        ))}
    </ul>
  );
};

export default ThemeListSkeleton;
