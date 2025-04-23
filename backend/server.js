const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000; // Render precisa disso!

// Middleware CORS (ajuste se precisar liberar pra mais domínios)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Servir arquivos estáticos do diretório principal do projeto (um nível acima de /backend)
app.use(express.static(path.join(__dirname, "..")));

// Banco de dados SQLite
const db = new Database("contatos.db");

// Criação da tabela
db.prepare(`
  CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    assunto TEXT,
    mensagem TEXT
  )
`).run();

// Rota para envio de formulário
app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const stmt = db.prepare("INSERT INTO contatos (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)");
    stmt.run(nome, email, assunto, mensagem);
    res.status(200).json({ message: "Contato recebido com sucesso!" });
  } catch (err) {
    console.error("Erro ao inserir no banco de dados:", err);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Redireciona a rota raiz para a home, por exemplo
app.get("/", (req, res) => {
  res.redirect("/home.html"); // ou qualquer nome do seu HTML principal
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});





