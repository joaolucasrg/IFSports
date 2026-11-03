/* =========================
   ACESSO (mesma regra do aluno.js)
   ========================= */
if (localStorage.getItem("tipoUsuario") !== "aluno") {
    window.location.href = "index.html";
}

/* =========================
   MENU DA BOLINHA (igual ao aluno.js)
   ========================= */
function togglePerfil() {
    document.getElementById("perfilMenu").classList.toggle("aberto");
}

document.addEventListener("click", function (event) {
    const perfil = document.querySelector(".perfil-container");
    const menu = document.getElementById("perfilMenu");

    if (!perfil.contains(event.target)) {
        menu.classList.remove("aberto");
    }
});

function irParaPagina() {
    window.location.href = "index.html";
}

const usuarioLogado = localStorage.getItem("usuarioLogado");
if (usuarioLogado) {
    document.getElementById("nomeAluno").textContent = usuarioLogado;
}

/* =========================
   CONFIGURAÇÃO DOS CAMPOS
   ========================= */
const CAMPOS = {
    matricula: {
        rotulo: "Matrícula",
        placeholder: "20260001",
        maxlength: 8,
        mascara: v => v.replace(/\D/g, "").slice(0, 8),
        validar: v => /^\d{8}$/.test(v) || "A matrícula deve ter 8 dígitos."
    },
    cpf: {
        rotulo: "CPF",
        placeholder: "000.000.000-00",
        maxlength: 14,
        mascara: v => v.replace(/\D/g, "").slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2"),
        validar: v => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) || "Informe um CPF completo (000.000.000-00)."
    },
    nascimento: {
        rotulo: "Data de nascimento",
        placeholder: "dd/mm/aaaa",
        maxlength: 10,
        mascara: v => v.replace(/\D/g, "").slice(0, 8)
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2"),
        validar: v => {
            const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
            if (!m) return "Use o formato dd/mm/aaaa.";
            const [, d, mes, a] = m.map(Number);
            const data = new Date(a, mes - 1, d);
            const existe = data.getFullYear() === a && data.getMonth() === mes - 1 && data.getDate() === d;
            if (!existe || data > new Date()) return "Informe uma data válida.";
            return true;
        }
    },
    email: {
        rotulo: "E-mail",
        placeholder: "nome@email.com",
        maxlength: 100,
        mascara: v => v.trim(),
        validar: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Informe um e-mail válido."
    }
};

const CHAVE_STORAGE = "dadosAluno";

let campoPendente = null;   // campo aguardando confirmação de senha
let campoEmEdicao = null;   // campo atualmente editável

/* =========================
   PONTOS DE INTEGRAÇÃO COM O BACKEND
   ========================= */

// Verifica a senha do aluno. Hoje só aceita (a validação "idênticas e preenchidas"
// é feita antes). Troque pela chamada real para a senha ser conferida no servidor.
async function verificarSenha(senha) {
    // const resp = await fetch("/api/aluno/confirmar-senha", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ senha })
    // });
    // return resp.ok;
    return true;
}

// Salva o dado no servidor. Hoje não faz nada além de simular sucesso.
async function salvarNoBackend(campo, valor) {
    // const resp = await fetch("/api/aluno/dados", {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ campo, valor })
    // });
    // if (!resp.ok) throw new Error("Falha ao salvar");
    return true;
}

/* =========================
   PERSISTÊNCIA LOCAL (enquanto não há backend)
   ========================= */
function lerDadosSalvos() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || {};
    } catch (e) {
        return {};
    }
}

function carregarDadosSalvos() {
    const salvos = lerDadosSalvos();
    Object.keys(salvos).forEach(campo => {
        const el = document.querySelector(`[data-campo="${campo}"] .dados-valor`);
        if (el && CAMPOS[campo]) el.textContent = salvos[campo];
    });
}

/* =========================
   MODAL DE SENHA
   ========================= */
const modalSenha = document.getElementById("modalSenha");
const formSenha = document.getElementById("formSenha");
const inputSenha = document.getElementById("inputSenha");
const inputSenha2 = document.getElementById("inputSenha2");
const erroSenha = document.getElementById("erroSenha");

function abrirModalSenha(campo) {
    // Só um campo em edição por vez
    if (campoEmEdicao) cancelarEdicao();

    campoPendente = campo;

    document.getElementById("campoAlvo").textContent = CAMPOS[campo].rotulo;
    formSenha.reset();
    esconderErroSenha();

    modalSenha.hidden = false;
    modalSenha.classList.add("aberto");
    document.body.classList.add("modal-aberto");

    inputSenha.focus();
}

function fecharModalSenha() {
    modalSenha.hidden = true;
    modalSenha.classList.remove("aberto");
    document.body.classList.remove("modal-aberto");
    formSenha.reset();
    campoPendente = null;
}

function mostrarErroSenha(msg) {
    erroSenha.textContent = msg;
    erroSenha.hidden = false;
    inputSenha.classList.add("invalido");
    inputSenha2.classList.add("invalido");
}

function esconderErroSenha() {
    erroSenha.hidden = true;
    inputSenha.classList.remove("invalido");
    inputSenha2.classList.remove("invalido");
}

formSenha.addEventListener("submit", async function (event) {
    event.preventDefault();

    const senha = inputSenha.value;
    const repetir = inputSenha2.value;

    if (!senha || !repetir) {
        mostrarErroSenha("Preencha os dois campos de senha.");
        return;
    }

    if (senha !== repetir) {
        mostrarErroSenha("As senhas não conferem. Digite a mesma senha nos dois campos.");
        return;
    }

    const botao = formSenha.querySelector(".btn-confirmar");
    botao.disabled = true;

    try {
        const ok = await verificarSenha(senha);

        if (!ok) {
            mostrarErroSenha("Senha incorreta.");
            return;
        }

        const campo = campoPendente;
        fecharModalSenha();
        iniciarEdicao(campo);

    } catch (e) {
        mostrarErroSenha("Não foi possível confirmar a senha. Tente novamente.");
    } finally {
        botao.disabled = false;
    }
});

[inputSenha, inputSenha2].forEach(input =>
    input.addEventListener("input", esconderErroSenha)
);

// Clicar fora do modal ou apertar Esc fecha
modalSenha.addEventListener("click", function (event) {
    if (event.target === modalSenha) fecharModalSenha();
});

document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    if (!modalSenha.hidden) fecharModalSenha();
    else if (campoEmEdicao) cancelarEdicao();
});

/* =========================
   MODO DE EDIÇÃO DO DADO
   ========================= */
function iniciarEdicao(campo) {
    const config = CAMPOS[campo];
    const item = document.querySelector(`[data-campo="${campo}"]`);
    const valorAtual = item.querySelector(".dados-valor").textContent;

    campoEmEdicao = campo;
    item.classList.add("editando");

    const area = document.createElement("div");
    area.className = "dados-edicao";
    area.innerHTML = `
        <label class="campo-label" for="inputEdicao">${config.rotulo}</label>
        <input class="campo-input" id="inputEdicao" type="${campo === "email" ? "email" : "text"}"
               maxlength="${config.maxlength}" placeholder="${config.placeholder}">
        <p class="campo-erro" id="erroEdicao" role="alert" hidden></p>
        <div class="form-acoes">
            <button type="button" class="btn-cancelar">Cancelar</button>
            <button type="button" class="btn-salvar">Salvar</button>
        </div>
    `;
    item.appendChild(area);

    const input = area.querySelector("#inputEdicao");
    input.value = valorAtual;

    input.addEventListener("input", function () {
        input.value = config.mascara(input.value);
        input.classList.remove("invalido");
        area.querySelector("#erroEdicao").hidden = true;
    });

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") salvarEdicao();
    });

    area.querySelector(".btn-cancelar").addEventListener("click", cancelarEdicao);
    area.querySelector(".btn-salvar").addEventListener("click", salvarEdicao);

    input.focus();
    input.select();
}

function encerrarEdicao() {
    if (!campoEmEdicao) return;

    const item = document.querySelector(`[data-campo="${campoEmEdicao}"]`);
    item.classList.remove("editando");

    const area = item.querySelector(".dados-edicao");
    if (area) area.remove();

    campoEmEdicao = null;
}

function cancelarEdicao() {
    encerrarEdicao();
}

async function salvarEdicao() {
    if (!campoEmEdicao) return;

    const campo = campoEmEdicao;
    const config = CAMPOS[campo];
    const item = document.querySelector(`[data-campo="${campo}"]`);
    const input = item.querySelector("#inputEdicao");
    const erro = item.querySelector("#erroEdicao");
    const botao = item.querySelector(".btn-salvar");

    const novoValor = config.mascara(input.value);
    const resultado = config.validar(novoValor);

    if (resultado !== true) {
        erro.textContent = resultado;
        erro.hidden = false;
        input.classList.add("invalido");
        input.focus();
        return;
    }

    botao.disabled = true;

    try {
        await salvarNoBackend(campo, novoValor);

        // Atualiza a interface
        item.querySelector(".dados-valor").textContent = novoValor;

        // Guarda localmente
        const salvos = lerDadosSalvos();
        salvos[campo] = novoValor;
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(salvos));

        encerrarEdicao();

    } catch (e) {
        erro.textContent = "Não foi possível salvar. Tente novamente.";
        erro.hidden = false;
        botao.disabled = false;
    }
}

/* =========================
   INICIALIZAÇÃO
   ========================= */
carregarDadosSalvos();