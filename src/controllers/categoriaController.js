const prisma = require("../config/prisma");

// LISTAR TODOS
exports.listar = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar categorias" });
  }
};

// BUSCAR POR ID
exports.buscarPorId = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const categoria = await prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    res.status(200).json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar categoria" });
  }
};

// CRIAR
exports.criar = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome || nome.trim() === "") {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    const novaCategoria = await prisma.categoria.create({
      data: {
        nome: nome.trim(),
      },
    });

    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar categoria" });
  }
};

// ATUALIZAR
exports.atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nome } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const categoriaExistente = await prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoriaExistente) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    if (!nome || nome.trim() === "") {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    const categoriaAtualizada = await prisma.categoria.update({
      where: { id },
      data: {
        nome: nome.trim(),
      },
    });

    res.status(200).json(categoriaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao atualizar categoria" });
  }
};

// DELETAR
exports.deletar = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const categoriaExistente = await prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoriaExistente) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    await prisma.categoria.delete({
      where: { id },
    });

    res.status(200).json({ mensagem: "Categoria deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao deletar categoria" });
  }
};
