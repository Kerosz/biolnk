module.exports ={
  extends: ["next/core-web-vitals", "prettier"],
  settings: {
    next: {
      rootDir: [
        "apps/docs/",
        "apps/studio/",
        "packages/ui/",
        "packages/config/",
        "packages/utils/",
      ],
    },
  },
  rules: {
    "react/no-unescaped-entities": [
      "error",
      {
        forbid: [">", "}", '"'],
      },
    ],
    "react-hooks/exhaustive-deps": "off"
  },
}
