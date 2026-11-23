const request = require("supertest");
const appModule = require("../server");
const prisma = require("../config/prisma");

const ROLLBACK_TESTE = "ROLLBACK_TESTE_INTEGRACAO";

async function executarComRollback(callback) {
  let resultado;

  try {
    await prisma.$transaction(
      async (transacao) => {
        resultado = await callback(appModule.criarApp(transacao));
        throw new Error(ROLLBACK_TESTE);
      },
      { timeout: 10000 },
    );
  } catch (error) {
    if (error.message !== ROLLBACK_TESTE) {
      throw error;
    }
  }

  return resultado;
}

describe("Testes de integracao da API de produtos com rollback", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("GET /produtos retorna status 200 e uma lista", async () => {
    const response = await executarComRollback((app) =>
      request(app).get("/produtos"),
    );

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /produtos cria o produto dentro da transacao e o reverte", async () => {
    const quantidadeAntes = await prisma.produto.count();
    const response = await executarComRollback((app) =>
      request(app).post("/produtos").send({
        nome: "Teclado Jest Rollback",
        descricao: "Registro temporario do teste de integracao",
        preco: 100,
        quantidade: 5,
      }),
    );

    expect(response.statusCode).toBe(201);
    expect(response.body.nome).toBe("Teclado Jest Rollback");
    expect(response.body.id).toBeDefined();
    await expect(prisma.produto.count()).resolves.toBe(quantidadeAntes);
    await expect(
      prisma.produto.findUnique({ where: { id: response.body.id } }),
    ).resolves.toBeNull();
  });

  test("POST /produtos rejeita nome vazio sem persistir dados", async () => {
    const quantidadeAntes = await prisma.produto.count();
    const response = await executarComRollback((app) =>
      request(app).post("/produtos").send({
        nome: "",
        descricao: "Teste de validacao",
        preco: 100,
        quantidade: 5,
      }),
    );

    expect(response.statusCode).toBe(400);
    expect(response.body.erro).toBe("Nome \u00e9 obrigat\u00f3rio");
    await expect(prisma.produto.count()).resolves.toBe(quantidadeAntes);
  });
});
