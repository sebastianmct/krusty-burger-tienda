// Solo se usa con "npm run coverage".
// Karma únicamente mide los archivos que alguna prueba importa; este archivo importa todo src/
// para que el porcentaje de cobertura incluya también lo que todavía NO tiene pruebas.
const contexto = import.meta.webpackContext("../", {
  recursive: true,
  regExp: /^\.\/(components|context|data|hooks|pages|services|utils)\/.*\.jsx?$/,
});
contexto.keys().forEach(contexto);
