# Atividade: validacao de produtos com Jest

## Objetivo

Separar as regras de validacao do controller de produtos, cobrir essas regras com testes unitarios e documentar como executar a verificacao.

## Implementacao

- `src/utils/validarProduto.js` centraliza as regras para nome, preco e quantidade.
- `src/Tests/validarProduto.test.js` testa dados validos, nome vazio, preco zero e quantidade negativa.
- `src/controllers/produtoController.js` chama a funcao compartilhada ao criar e atualizar produtos. Quando a funcao retorna uma mensagem, o controller responde com HTTP 400.
- O script `npm test` executa a suite Jest.

## Como executar

Na raiz do projeto, execute:

```sh
npm test -- --runInBand
```

O comando executa os quatro casos unitarios da validacao de produto.
