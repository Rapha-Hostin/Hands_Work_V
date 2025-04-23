const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const path = require("path");
const app = express();
const port = 3000;

// Middleware CORS
app.use(cors({
  origin: '*', // ou coloque o domínio correto se for restrito
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// 👉 Servir os arquivos estáticos da raiz (um nível acima de /backend)
app.use(express.static(path.join(__dirname, "..")));

// Banco de dados
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

// Rota POST do formulário
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

// Rota GET / redireciona para home.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "home.html"));
});


// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});





