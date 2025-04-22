const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

app.use(cors());
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
`);

app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const stmt = db.prepare("INSERT INTO contatos (nome, email, assunto, mensagem) VALUES (?, ?, ?, ?)");
  stmt.run(nome, email, assunto, mensagem, function (err) {
    if (err) {
      console.error("Erro ao inserir no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }

    res.status(200).json({ message: "Contato recebido com sucesso!" });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
