document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita o reload da página

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    try {
      const response = await fetch("http://127.0.0.1:3000/contato", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, assunto, mensagem }),
      });

      if (response.ok) {
        alert("Mensagem enviada com sucesso!");
        form.reset();
      } else {
        alert("Erro ao enviar mensagem.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro no bando de dados ao enviar mensagem.");
    }
  });
});


