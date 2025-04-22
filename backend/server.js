console.log("Iniciando servidor...");
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

// Configuração CORS para aceitar requisições do GoLive

app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500"], // Adiciona ambos os domínios
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

const db = new sqlite3.Database("contatos.db");

db.run(`
  CREATE TABLE IF NOT EXISTS contatos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT,
    assunto TEXT,
    mensagem TEXT
  )
`, (err) => {
  if (err) {
    console.error("Erro ao criar tabela:", err.message);
  } else {
    console.log("Tabela 'contatos' verificada/criada com sucesso.");
  }
});



app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const stmt = db.prepare("INSERT INTO contatos (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)");
  stmt.run(nome, email, assunto, mensagem, function (err) {
    if (err) {
      console.error("Erro ao inserir no banco de dados:", err.message);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  
    console.log("Novo contato inserido com ID:", this.lastID);
    res.status(200).json({ message: "Contato recebido com sucesso!" });
  });
  

});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
