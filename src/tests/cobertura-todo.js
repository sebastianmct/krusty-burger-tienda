const contexto = import.meta.webpackContext("../", {
  recursive: true,
  regExp:
    /^\.\/(components|context|data|hooks|pages|services|utils)\/.*\.jsx?$/,
});
contexto.keys().forEach(contexto);
