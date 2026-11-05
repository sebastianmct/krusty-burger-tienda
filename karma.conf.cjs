const webpack = require("webpack");
const conCobertura = process.env.COBERTURA === "1";

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],

    files: [
      {
        pattern: "public/assets/**/*",
        watched: false,
        included: false,
        served: true,
      },
      { pattern: "src/tests/setup.js", watched: false },
      { pattern: "src/tests/**/*.test.js", watched: false },
      { pattern: "src/tests/**/*.test.jsx", watched: false },
      ...(conCobertura
        ? [{ pattern: "src/tests/cobertura-todo.js", watched: false }]
        : []),
    ],
    preprocessors: {
      "src/tests/setup.js": ["webpack"],
      "src/tests/**/*.test.js": ["webpack"],
      "src/tests/**/*.test.jsx": ["webpack"],
      "src/tests/cobertura-todo.js": ["webpack"],
    },

    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      plugins: [
        new webpack.DefinePlugin({
          "import.meta.env.BASE_URL": JSON.stringify("/krusty-burger-tienda/"),
        }),
      ],
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [
          { test: /\.m?js$/, resolve: { fullySpecified: false } },

          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "esbuild-loader",
            options: { loader: "jsx", jsx: "automatic", target: "es2020" },
          },

          { test: /\.css$/, resourceQuery: /inline/, type: "asset/source" },

          ...(conCobertura
            ? [
                {
                  test: /\.jsx?$/,
                  include: /src/,
                  exclude: /src[\\/](tests|main\.jsx|data[\\/]regiones\.js)/,
                  enforce: "post",
                  loader: "@jsdevtools/coverage-istanbul-loader",
                  options: { esModules: true },
                },
              ]
            : []),
        ],
      },
    },

    client: {
      jasmine: { random: false },
    },

    reporters: conCobertura ? ["spec", "coverage"] : ["spec"],
    specReporter: { suppressPassed: false, suppressSkipped: true },
    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "text-summary" }, { type: "text" }, { type: "html" }],
    },

    browsers: ["ChromeHeadlessSinSandbox"],
    proxies: {
      "/assets/": "/base/public/assets/",
    },
    customLaunchers: {
      ChromeHeadlessSinSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },

    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,
  });
};
