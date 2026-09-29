// =================================
// SISTEMA PRINCIPAL iFSport
// =================================



// Criar treinos iniciais

if(!localStorage.getItem("treinos")){


    localStorage.setItem(
        "treinos",
        JSON.stringify([])
    );


}






// Pegar treinos


function pegarTreinos(){


    return JSON.parse(

        localStorage.getItem("treinos")

    ) || [];


}


function verificarHorarios(){



    let agora = new Date();




    let treinos =
    pegarTreinos();





    treinos = treinos.filter(treino=>{



        if(!treino.data || !treino.horario){

            return true;

        }





        let dataTreino = new Date(

            treino.data + "T" + treino.horario

        );





        return dataTreino > agora;



    });






    localStorage.setItem(

        "treinos",

        JSON.stringify(treinos)

    );



}








// Executa automaticamente

verificarHorarios();









// =================================
// SAIR DO SISTEMA
// =================================


function sair(){


    localStorage.removeItem(
        "usuarioLogado"
    );


    localStorage.removeItem(
        "tipoUsuario"
    );



    window.location.href =
    "tliniprofessor.html";


}