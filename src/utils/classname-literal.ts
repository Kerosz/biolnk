export default function ctl(template: any) {
  var trimmed = template.replace(/\s+/gm, " ");
  var filtered = trimmed
    .split(" ")
    .filter((c: any) => c !== "false" && c !== "true" && c !== "undefined")
    .join(" ")
    .trim();

  return filtered;
}
