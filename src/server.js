require("dotenv").config();
const express = require("express");
const cors = require("cors");
const produtoRoutes = require("./routes/produtoRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API de produtos funcionando");
});
app.use("/produtos", produtoRoutes);
app.use("/categorias", categoriaRoutes);

if (require.main === module) {
  const porta = Number(process.env.PORT) || 3000;
  app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });
}

module.exports = app;
