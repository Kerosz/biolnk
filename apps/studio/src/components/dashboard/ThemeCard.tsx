import CSSstring from "~/utils/CSSstring";
import { ChangeEvent, FC } from "react";
import { Flex, Input } from "@biolnk/gamut";
import { ctl } from "@biolnk/utils";
import { Theme } from "~/types";

export interface ThemeCardProps extends Theme {
  userCurrentTheme: string;
  onThemeChange(event: ChangeEvent<HTMLInputElement>): void;
  disableSelect?: boolean;
}

const ThemeCard: FC<ThemeCardProps> = ({
  id,
  name,
  userCurrentTheme,
  onThemeChange,
  style,
  disableSelect = false,
}) => {
  const isSelected =
    userCurrentTheme.toLowerCase().trim() === name.toLowerCase().trim();

  const rootClass = ctl(`
      rounded-xl relative p-0.5 xs:p-1 cursor-pointer transform-gpu duration-300
      ${!isSelected && "hover:scale-105"}
      ${disableSelect && "select-none opacity-70"}
    `);

  return (
    <label
      htmlFor={id}
      className={rootClass}
      style={{
        borderWidth: "3px",
        borderColor: isSelected ? "hsl(206 100% 50.0%)" : "transparent",
      }}
    >
      <div
        className="rounded-lg select-none border border-mauve-500"
        style={CSSstring(style.background.css)}
      >
        <div className="pt-8 pb-6 px-5 relative z-10">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={`btn__key--${idx}`}
                className="mb-3 last:mb-0 h-6"
                style={CSSstring(style.button.css)}
              />
            ))}
        </div>
        <Flex
          align="center"
          justify="center"
          className="h-10 bg-blackAlpha-700 text-mauve-50 text-sm rounded-b-lg"
        >
          {name}
        </Flex>
      </div>
      <Input
        id={id}
        type="radio"
        name="page-theme"
        className="sr-only"
        value={name}
        checked={isSelected}
        onChange={onThemeChange}
        disabled={disableSelect}
      />
    </label>
  );
};

export default ThemeCard;
