import Skeleton from "react-loading-skeleton";
import { FC } from "react";

const ThemeListSkeleton: FC = () => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-1 xs:gap-6 xl:grid-cols-4 lg:gap-3 2xl:gap-5">
      {Array(9)
        .fill(0)
        .map((_, idx) => (
          <Skeleton key={idx} height={230} width={163} />
        ))}
    </ul>
  );
};

export default ThemeListSkeleton;
