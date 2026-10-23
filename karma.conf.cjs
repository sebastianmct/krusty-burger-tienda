// Configuración de Karma: abre un navegador, carga las pruebas (Jasmine) y muestra los resultados.
// Se usa con:  npm test   |   npm run test:watch   |   npm run coverage
const conCobertura = process.env.COBERTURA === "1";

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"], // Jasmine escribe las pruebas, webpack las empaqueta (JSX incluido)

    // Primero el archivo de configuración común y luego todas las pruebas (*.test.js / *.test.jsx)
    files: [
      { pattern: "public/assets/**/*", included: false, watched: false },
      { pattern: "src/tests/setup.js", watched: false },
      { pattern: "src/tests/**/*.test.js", watched: false },
      { pattern: "src/tests/**/*.test.jsx", watched: false },
      ...(conCobertura ? [{ pattern: "src/tests/cobertura-todo.js", watched: false }] : []),
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
      resolve: { extensions: [".js", ".jsx"] },
      module: {
        rules: [
          // Permite importar archivos sin escribir la extensión: import x from "../utils/formato"
          { test: /\.m?js$/, resolve: { fullySpecified: false } },
          // JSX y JavaScript moderno
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "esbuild-loader",
            options: { loader: "jsx", jsx: "automatic", target: "es2020" },
          },
          // Los estilos se importan como texto: import css from "./x.css?inline"
          { test: /\.css$/, resourceQuery: /inline/, type: "asset/source" },
          // Cobertura: mide qué líneas del código de src/ se ejecutaron en las pruebas
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
      jasmine: { random: false }, // las pruebas corren en el orden en que están escritas
    },

    reporters: conCobertura ? ["spec", "coverage"] : ["spec"],
    specReporter: { suppressPassed: false, suppressSkipped: true },
    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "text-summary" }, { type: "text" }, { type: "html" }],
    },

    proxies: {
      "/assets/": "/base/public/assets/",
    },

    browsers: ["ChromeHeadlessSinSandbox"],
    customLaunchers: {
      ChromeHeadlessSinSandbox: { base: "ChromeHeadless", flags: ["--no-sandbox"] },
    },

    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,
  });
};
