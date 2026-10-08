/* ==========================
   NOVA SENHA
========================== */

const campoNova = document.getElementById("novaSenha");
const campoRepetir = document.getElementById("repetirSenha");
const botaoSalvar = document.getElementById("botaoSalvar");
const mensagem = document.getElementById("mensagem");

const TAMANHO_MINIMO = 6;


function mostrarMensagem(texto, sucesso = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("sucesso", sucesso);
}


function salvarSenha() {

    const nova = campoNova.value;
    const repetida = campoRepetir.value;

    if (nova === "" || repetida === "") {
        mostrarMensagem("Preencha os dois campos.");
        return;
    }

    if (nova.length < TAMANHO_MINIMO) {
        mostrarMensagem(`A senha precisa ter pelo menos ${TAMANHO_MINIMO} caracteres.`);
        campoNova.focus();
        return;
    }

    if (nova !== repetida) {
        mostrarMensagem("As senhas não são iguais.");
        campoRepetir.focus();
        return;
    }

    /*
      ATENÇÃO: aqui a senha ainda não é salva em lugar nenhum.
      Em produção, envie para o servidor (back-end), que deve
      confirmar que o código de recuperação foi validado antes
      de trocar a senha. Exemplo:

      fetch("/api/nova-senha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ senha: nova })
      });
    */

    botaoSalvar.disabled = true;
    mostrarMensagem("Senha alterada com sucesso! Redirecionando para o login...", true);

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1800);
}


[campoNova, campoRepetir].forEach(campo => {
    campo.addEventListener("keydown", (e) => {
        if (e.key === "Enter") salvarSenha();
    });
});
