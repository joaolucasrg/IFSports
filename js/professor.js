// =================================
// ÁREA DO PROFESSOR
// =================================



// Verificar acesso

if(localStorage.getItem("tipoUsuario") !== "professor"){

    window.location.href="index.html";

}






// Criar treino

function criarTreino(){



    let modalidade =
    document.getElementById("modalidade").value;


    let data =
    document.getElementById("data").value;


    let horario =
    document.getElementById("horario").value;







    if(
        modalidade === "" ||
        data === "" ||
        horario === ""
    ){

        alert("Preencha todos os campos!");

        return;

    }






    let treinos = pegarTreinos();





    let novoTreino = {


        id: Date.now(),


        esporte: modalidade,


        data:data,


        horario:horario,

        inscritos:[]


    };







    treinos.push(novoTreino);





    localStorage.setItem(

        "treinos",

        JSON.stringify(treinos)

    );






    alert(
        "Treino criado com sucesso!"
    );





    limparFormulario();


    carregarTreinosProfessor();

}





// Limpar campos


function limparFormulario(){


    document.getElementById("modalidade").value="";

    document.getElementById("data").value="";

    document.getElementById("horario").value="";


}









// Mostrar treinos


function carregarTreinosProfessor(){



    let lista =
    document.getElementById(
        "listaProfessor"
    );



    lista.innerHTML="";




    let treinos =
    pegarTreinos();







    treinos.forEach(treino=>{


        lista.innerHTML +=



        `

        <div class="treino-card">


            <h4>
            ${treino.esporte}
            </h4>



            <div class="info-treino">


            📅 ${treino.data}
            <br>


            🕒 ${treino.horario}
            <br>


            👥 ${treino.inscritos.length} Marcaram presença


            </div>





            <div class="acoes">


                <button
                class="botao-excluir"
                onclick="excluirTreino(${treino.id})">


                Excluir


                </button>


            </div>



        </div>

        `;



    });




    atualizarEstatisticas();


}









// Excluir treino


function excluirTreino(id){



    let treinos =
    pegarTreinos();




    treinos =
    treinos.filter(
        treino =>
        treino.id !== id
    );





    localStorage.setItem(

        "treinos",

        JSON.stringify(treinos)

    );





    carregarTreinosProfessor();



}









// Estatísticas


function atualizarEstatisticas(){



    let treinos =
    pegarTreinos();




    let totalTreinos =
    document.getElementById(
        "totalTreinos"
    );



    let totalAtletas =
    document.getElementById(
        "totalAtletas"
    );



    let proximo =
    document.getElementById(
        "proximoTreino"
    );





    if(totalTreinos){

        totalTreinos.innerHTML =
        treinos.length;

    }






    let atletas = 0;



    treinos.forEach(t=>{


        atletas +=
        t.inscritos.length;


    });





    if(totalAtletas){

        totalAtletas.innerHTML =
        atletas;

    }






    let agora = new Date();

let proximosTreinos = treinos
    .map(treino => {

        let dataHora = new Date(
            `${treino.data}T${treino.horario}`
        );

        return {
            ...treino,
            dataHora: dataHora
        };

    })
    .filter(treino => treino.dataHora >= agora)
    .sort((a, b) => a.dataHora - b.dataHora);


if(proximosTreinos.length > 0){

    let proximoTreino = proximosTreinos[0];

    let partesData = proximoTreino.data.split("-");

    let dataFormatada =
        `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

    proximo.innerHTML = `
    <strong>${proximoTreino.horario}</strong>
    <span>${dataFormatada}</span>
`;

}else{

    proximo.innerHTML = "--";

}


}









// iniciar página

carregarTreinosProfessor();