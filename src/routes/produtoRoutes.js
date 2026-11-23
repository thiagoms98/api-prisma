const express = require("express");
const produtoController = require("../controllers/produtoController");

function criarProdutoRoutes(prisma) {
  const router = express.Router();
  const controller = prisma
    ? produtoController.comPrisma(prisma)
    : produtoController;

  router.get("/", controller.listar);
  router.get("/:id", controller.buscarPorId);
  router.post("/", controller.criar);
  router.put("/:id", controller.atualizar);
  router.delete("/:id", controller.deletar);

  return router;
}

module.exports = criarProdutoRoutes;
