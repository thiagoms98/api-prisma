require("dotenv").config({ quiet: true });
const express = require("express");
const cors = require("cors");
const prismaPadrao = require("./config/prisma");
const criarProdutoRoutes = require("./routes/produtoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");

function criarApp(prisma = prismaPadrao) {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("API de produtos funcionando");
  });
  app.use("/produtos", criarProdutoRoutes(prisma));
  app.use("/categorias", categoriaRoutes);
  return app;
}

const app = criarApp();

if (require.main === module) {
  const porta = Number(process.env.PORT) || 3000;
  app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });
}

module.exports = app;
module.exports.criarApp = criarApp;
