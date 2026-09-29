
if(localStorage.getItem("tipoUsuario") !== "aluno"){

    window.location.href="index.html";

}




function carregarTreinos(){

    let lista = document.getElementById("listaTreinos");

    lista.innerHTML = "";

    let treinos = pegarTreinos();

    treinos.forEach(treino => {

        let presentes = treino.inscritos.length;

        lista.innerHTML += `

        <div class="training">

            <div class="date">

                <strong>
                    ${treino.data.split("-")[2]}
                </strong>

                <span>
                    ${treino.data.split("-")[1]}
                </span>

            </div>

            <div class="training-info">

                <h3>
                    ${treino.esporte}
                </h3>

                <p>
                    🕒 ${treino.horario}
                </p>

            </div>

            <div class="available">

                👥 ${presentes} presentes

            </div>

            <button onclick="inscreverTreino(${treino.id})">

                Marcar presença

            </button>

        </div>

        `;

    });

    atualizarNumeros();

}






function inscreverTreino(id){


let treinos =
pegarTreinos();



let treino =
treinos.find(t=>t.id===id);



let aluno =
localStorage.getItem("usuarioLogado");




if(treino.inscritos.includes(aluno)){


alert("Você já marcou sua presença nessa modalidade!");

return;


}



treino.inscritos.push(aluno);



localStorage.setItem(

"treinos",

JSON.stringify(treinos)

);



alert("presença Marcada!");



carregarTreinos();

carregarMeusTreinos();


}








function carregarMeusTreinos(){


let area =
document.getElementById("meusTreinos");



area.innerHTML="";



let aluno =
localStorage.getItem("usuarioLogado");



let treinos =
pegarTreinos();



treinos.forEach(treino=>{


if(treino.inscritos.includes(aluno)){



area.innerHTML += `


<div class="treino-card">


<h4>
${treino.esporte}
</h4>


<div class="info-treino">

📅 ${treino.data}

<br>

🕒 ${treino.horario}


</div>


</div>


`;



}


});


}








function atualizarNumeros(){



let aluno =
localStorage.getItem("usuarioLogado");


let treinos =
pegarTreinos();



let meus =
treinos.filter(t=>

t.inscritos.includes(aluno)

);




document.getElementById(
"contadorMeusTreinos"
).innerHTML = meus.length;



document.getElementById(
"contadorDisponiveis"
).innerHTML = treinos.length;



if(treinos.length>0){


document.getElementById(
"proximoAluno"
).innerHTML =
treinos[0].horario;


}



}







carregarTreinos();

carregarMeusTreinos();