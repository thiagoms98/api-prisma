require("dotenv").config({ quiet: true });

if (!process.env.DATABASE_URL_TEST) {
  throw new Error(
    "DATABASE_URL_TEST nao foi configurada no ambiente de testes.",
  );
}

// Define a conexao antes de importar o Prisma Client ou o servidor.
process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;
