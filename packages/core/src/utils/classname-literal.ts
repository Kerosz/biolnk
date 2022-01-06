export function ctl(template: any) {
  const trimmed = template.replace(/\s+/gm, " ");
  const filtered = trimmed
    .split(" ")
    .filter((c: any) => c !== "false" && c !== "true" && c !== "undefined")
    .join(" ")
    .trim();

  return filtered;
}
