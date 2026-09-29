const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");
const campoCpf = document.getElementById("cpf");

// Máscara do CPF: 000.000.000-00
campoCpf.addEventListener("input", () => {
    let v = campoCpf.value.replace(/\D/g, "").slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
         .replace(/(\d{3})(\d)/, "$1.$2")
         .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    campoCpf.value = v;
});

// Validação do dígito verificador do CPF
function cpfValido(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    for (let t = 9; t < 11; t++) {
        let soma = 0;
        for (let i = 0; i < t; i++) soma += cpf[i] * (t + 1 - i);
        const digito = ((soma * 10) % 11) % 10;
        if (digito != cpf[t]) return false;
    }
    return true;
}

function erro(texto, elemento) {
    mensagem.className = "";
    mensagem.textContent = texto;
    if (elemento) elemento.classList.add("erro");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    form.querySelectorAll(".erro").forEach(el => el.classList.remove("erro"));

    const nome = form.nome.value.trim();
    const matricula = form.matricula.value.trim();
    const nascimento = form.nascimento.value;
    const email = form.email.value.trim();
    const cpf = form.cpf.value;
    const modalidades = [...form.querySelectorAll('input[name="modalidades"]:checked')]
        .map(c => c.value);

    if (nome.split(" ").length < 2) return erro("Digite seu nome completo.", form.nome);
    if (!matricula) return erro("Informe sua matrícula.", form.matricula);
    if (!nascimento) return erro("Informe sua data de nascimento.", form.nascimento);
    if (!form.email.checkValidity() || !email) return erro("Digite um e-mail válido.", form.email);
    if (!cpfValido(cpf)) return erro("CPF inválido. Confira os números.", form.cpf);
    if (modalidades.length === 0) {
        return erro("Escolha pelo menos uma modalidade.", form.querySelector(".modalidades"));
    }

    const usuario = { nome, matricula, nascimento, email, cpf, modalidades };
    console.log("Cadastro:", usuario); // troque pelo envio ao seu back-end / localStorage

    mensagem.className = "sucesso";
    mensagem.textContent = "Conta criada com sucesso!";
});
