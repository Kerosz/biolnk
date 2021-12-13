const postcss = require("rollup-plugin-postcss");

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          require("autoprefixer"),
          require("tailwindcss"),
          require("cssnano")({ preset: "default" }),
        ],
        minimize: true,
        inject: true,
        extract: false,
      })
    );
    return config;
  },
};
