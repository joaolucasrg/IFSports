let tipoUsuario = "aluno";

function selecionarTipo(tipo) {
    tipoUsuario = tipo;

    document.getElementById("alunoBtn").classList.remove("active");
    document.getElementById("professorBtn").classList.remove("active");

    if (tipo === "aluno") {
        document.getElementById("alunoBtn").classList.add("active");

    } else {
        document.getElementById("professorBtn").classList.add("active");

    }
}


function fazerLogin() {

    let usuario = document.getElementById("usuario").value;
    let senha = document.getElementById("senha").value;
    let mensagem = document.getElementById("mensagem");

    console.log("Tentando login...");
    console.log("Tipo:", tipoUsuario);
    console.log("Usuário:", usuario);

    if (tipoUsuario === "aluno") {

        if (usuario === "20260001" && senha === "1234") {

            localStorage.setItem("tipoUsuario", "aluno");
            localStorage.setItem("usuarioLogado", usuario);

            window.location.href = "aluno.html";

        } else {

            mensagem.innerHTML = "Usuário ou senha inválidos!";
        }

    } else {

        if (usuario === "20260002" && senha === "1234") {

            localStorage.setItem("tipoUsuario", "professor");
            localStorage.setItem("usuarioLogado", usuario);

            window.location.href = "tliniprofessor.html";

        } else {

            mensagem.innerHTML = "Usuário ou senha inválidos!";
        }
    }
}


// Botão Entrar
document.getElementById("botao").addEventListener("click", function(event) {
    event.preventDefault();
    fazerLogin();
});


// Pressionar ENTER no usuário
document.getElementById("usuario").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        fazerLogin();
    }

});


// Pressionar ENTER na senha
document.getElementById("senha").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        fazerLogin();
    }

});
