const validarProduto = require("../utils/validarProduto");

describe("validarProduto", () => {
  test("returns null for valid data", () => {
    expect(validarProduto("Mouse", 100, 10)).toBeNull();
  });

  test("returns an error when the name is empty", () => {
    expect(validarProduto("", 100, 10)).toBe("Nome \u00e9 obrigat\u00f3rio");
  });

  test("returns an error when the price is zero or negative", () => {
    expect(validarProduto("Mouse", 0, 10)).toBe(
      "Pre\u00e7o deve ser maior que zero",
    );
  });

  test("returns an error when the quantity is negative", () => {
    expect(validarProduto("Mouse", 100, -1)).toBe(
      "Quantidade n\u00e3o pode ser negativa",
    );
  });
});
