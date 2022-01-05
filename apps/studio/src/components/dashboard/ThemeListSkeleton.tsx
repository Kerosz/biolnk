import { FC } from "react";

const ThemeListSkeleton: FC = () => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-1 xs:gap-6 xl:grid-cols-4 lg:gap-3 2xl:gap-5">
      {Array(9)
        .fill(0)
        .map((_, idx) => (
          <div
            key={`card__key--${idx}`}
            className="rounded-xl relative p-0.5 xs:p-1 transform-gpu duration-300 select-none"
          >
            <div className="rounded-lg select-none border border-mauve-500 py-8 px-5 relative z-10 bg-mauve-300">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={`btn__key--${idx}`}
                    className="mb-3 last:mb-0 h-6 bg-mauve-200 shadow rounded"
                  />
                ))}
            </div>
          </div>
        ))}
    </ul>
  );
};

export default ThemeListSkeleton;
