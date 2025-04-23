document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o recarregamento da página

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    try {
      const response = await fetch("https://hands-work-v.onrender.com/contato", { ... })

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
        const errorData = await response.json();
        alert("Erro ao enviar mensagem: " + (errorData.error || "Erro desconhecido."));
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
    }
  });
});



