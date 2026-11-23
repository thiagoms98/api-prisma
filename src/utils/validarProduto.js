function validarProduto(nome, preco, quantidade) {
  if (!nome || nome.trim() === "") {
    return "Nome \u00e9 obrigat\u00f3rio";
  }

  if (preco === undefined || Number(preco) <= 0) {
    return "Pre\u00e7o deve ser maior que zero";
  }

  if (quantidade === undefined || Number(quantidade) < 0) {
    return "Quantidade n\u00e3o pode ser negativa";
  }

  return null;
}

module.exports = validarProduto;
