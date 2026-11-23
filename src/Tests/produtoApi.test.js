const request = require("supertest");
const app = require("../server");
const prisma = require("../config/prisma");

describe("Testes de integracao da API de produtos", () => {
  beforeEach(async () => {
    await prisma.produto.deleteMany();
  });

  afterEach(async () => {
    await prisma.produto.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("GET /produtos retorna status 200 e uma lista", async () => {
    const response = await request(app).get("/produtos");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /produtos cria um produto valido", async () => {
    const response = await request(app).post("/produtos").send({
      nome: "Teclado Jest",
      descricao: "Produto criado pelo teste de integracao",
      preco: 100,
      quantidade: 5,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.nome).toBe("Teclado Jest");
    expect(response.body.id).toBeDefined();
  });

  test("POST /produtos rejeita nome vazio", async () => {
    const response = await request(app).post("/produtos").send({
      nome: "",
      descricao: "Teste de validacao",
      preco: 100,
      quantidade: 5,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.erro).toBe("Nome \u00e9 obrigat\u00f3rio");
  });
});
