import { CSSProperties } from "react";

/**
 * Function found here
 * @see https://stackoverflow.com/questions/33331570/use-inline-style-in-react-with-plain-css-string
 *
 * @example
 * <div
 *   style={CSSstring("opacity: 0.8; background-color: green;")}
 * />
 *
 * @param {string} input CSS as string
 * @returns {CSSProperties}
 */
export default function CSSstring(input: string): CSSProperties {
  const css_json = `{"${input
    .replace(/; /g, '", "')
    .replace(/: /g, '": "')
    .replace(";", "")}"}`;

  const obj = JSON.parse(css_json);

  const keyValues = Object.keys(obj).map((key) => {
    var camelCased = key.replace(/-[a-z]/g, (g) => g[1].toUpperCase());
    return { [camelCased]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}
