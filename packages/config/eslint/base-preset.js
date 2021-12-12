module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  settings: {
    next: {
      rootDir: [
        "apps/docs/",
        "apps/web/",
        "packages/ui/",
        "packages/config/",
        "packages/tsconfig/",
      ],
    },
  },
  "rules": {
    "react/no-unescaped-entities": [
      "error",
      {
        "forbid": [">", "}", "\""]
      }
    ]
  }
};
