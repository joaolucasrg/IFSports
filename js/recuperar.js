/* ==========================
   RECUPERAR SENHA
========================== */

const etapaEmail = document.getElementById("etapaEmail");
const etapaCodigo = document.getElementById("etapaCodigo");
const campoEmail = document.getElementById("email");
const emailEnviado = document.getElementById("emailEnviado");
const mensagem = document.getElementById("mensagem");
const botaoReenviar = document.getElementById("botaoReenviar");
const digitos = Array.from(document.querySelectorAll("#codigoInputs input"));

let codigoGerado = "";
let intervaloReenvio = null;


/* ---------- Mensagens ---------- */

function mostrarMensagem(texto, sucesso = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("sucesso", sucesso);
}


/* ---------- ETAPA 1: enviar código ---------- */

function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function enviarCodigo() {

    const email = campoEmail.value.trim();

    if (email === "") {
        mostrarMensagem("Digite o seu e-mail.");
        campoEmail.focus();
        return;
    }

    if (!emailValido(email)) {
        mostrarMensagem("Digite um e-mail válido.");
        campoEmail.focus();
        return;
    }

    /*
      ATENÇÃO: aqui o código é gerado no navegador só para teste.
      Em produção, o código deve ser gerado e enviado por e-mail
      pelo servidor (back-end), e a verificação também deve ser
      feita lá. Exemplo:

      fetch("/api/recuperar-senha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
      });
    */
    codigoGerado = String(Math.floor(100000 + Math.random() * 900000));
    console.log("Código de recuperação (teste):", codigoGerado);

    emailEnviado.textContent = email;
    etapaEmail.classList.add("hidden");
    etapaCodigo.classList.remove("hidden");

    mostrarMensagem("");
    limparCodigo();
    digitos[0].focus();
    iniciarContagemReenvio();
}


/* ---------- ETAPA 2: código ---------- */

function limparCodigo() {
    digitos.forEach(input => {
        input.value = "";
        input.classList.remove("preenchido", "erro");
    });
}

function lerCodigo() {
    return digitos.map(input => input.value).join("");
}

function verificarCodigo() {

    const codigo = lerCodigo();

    if (codigo.length < 6) {
        mostrarMensagem("Digite os 6 dígitos do código.");
        return;
    }

    if (codigo !== codigoGerado) {
        digitos.forEach(input => input.classList.add("erro"));
        mostrarMensagem("Código incorreto. Confira e tente novamente.");
        return;
    }

    mostrarMensagem("Código confirmado! Redirecionando...", true);

    setTimeout(() => {
        window.location.href = "novasenha.html";
    }, 1200);
}

function reenviarCodigo() {

    codigoGerado = String(Math.floor(100000 + Math.random() * 900000));
    console.log("Novo código de recuperação (teste):", codigoGerado);

    limparCodigo();
    digitos[0].focus();
    mostrarMensagem("Enviamos um novo código.", true);
    iniciarContagemReenvio();
}

function alterarEmail() {

    clearInterval(intervaloReenvio);

    etapaCodigo.classList.add("hidden");
    etapaEmail.classList.remove("hidden");

    mostrarMensagem("");
    campoEmail.focus();
}

function iniciarContagemReenvio() {

    let segundos = 30;

    clearInterval(intervaloReenvio);
    botaoReenviar.disabled = true;
    botaoReenviar.textContent = `Reenviar em ${segundos}s`;

    intervaloReenvio = setInterval(() => {

        segundos--;

        if (segundos <= 0) {
            clearInterval(intervaloReenvio);
            botaoReenviar.disabled = false;
            botaoReenviar.textContent = "Reenviar código";
            return;
        }

        botaoReenviar.textContent = `Reenviar em ${segundos}s`;

    }, 1000);
}


/* ---------- Comportamento dos campos do código ---------- */

digitos.forEach((input, i) => {

    input.addEventListener("input", () => {

        input.value = input.value.replace(/\D/g, "");
        input.classList.remove("erro");
        input.classList.toggle("preenchido", input.value !== "");

        if (input.value && i < digitos.length - 1) {
            digitos[i + 1].focus();
        }
    });

    input.addEventListener("keydown", (e) => {

        if (e.key === "Backspace" && !input.value && i > 0) {
            digitos[i - 1].focus();
        }

        if (e.key === "ArrowLeft" && i > 0) digitos[i - 1].focus();
        if (e.key === "ArrowRight" && i < digitos.length - 1) digitos[i + 1].focus();

        if (e.key === "Enter") verificarCodigo();
    });

    // Permite colar o código inteiro
    input.addEventListener("paste", (e) => {

        e.preventDefault();

        const colado = (e.clipboardData.getData("text") || "")
            .replace(/\D/g, "")
            .slice(0, 6);

        colado.split("").forEach((numero, j) => {
            digitos[j].value = numero;
            digitos[j].classList.add("preenchido");
            digitos[j].classList.remove("erro");
        });

        digitos[Math.min(colado.length, 5)].focus();
    });
});

campoEmail.addEventListener("keydown", (e) => {
    if (e.key === "Enter") enviarCodigo();
});
