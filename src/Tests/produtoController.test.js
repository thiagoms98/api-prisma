jest.mock("../config/prisma", () => ({
  produto: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const prisma = require("../config/prisma");
const produtoController = require("../controllers/produtoController");

function criarResponseMock() {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
  };
  res.status.mockReturnValue(res);
  res.json.mockReturnValue(res);
  return res;
}

describe("produtoController com Prisma mockado", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("criar responde 400 sem acessar o banco quando o nome e vazio", async () => {
    const req = {
      body: { nome: "", preco: 100, quantidade: 5 },
    };
    const res = criarResponseMock();

    await produtoController.criar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      erro: "Nome \u00e9 obrigat\u00f3rio",
    });
    expect(prisma.produto.create).not.toHaveBeenCalled();
  });

  test("criar persiste dados validos e responde 201", async () => {
    const produtoCriado = {
      id: 1,
      nome: "Mouse",
      descricao: null,
      preco: 100,
      quantidade: 5,
    };
    prisma.produto.create.mockResolvedValue(produtoCriado);
    const req = {
      body: { nome: " Mouse ", preco: 100, quantidade: 5 },
    };
    const res = criarResponseMock();

    await produtoController.criar(req, res);

    expect(prisma.produto.create).toHaveBeenCalledWith({
      data: {
        nome: "Mouse",
        descricao: null,
        preco: 100,
        quantidade: 5,
      },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(produtoCriado);
  });
});
