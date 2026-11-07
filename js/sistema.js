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

const COMPETICOES = [
    {
        id: "intercampi",
        nome: "Jogos Intercampi",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_RQ3eiorgFUFZ3fHGdGv2R4IdKnkaqiHD_dP_rZ_L-Q&s=10",
        datas: [
            { etapa: "Etapa Polo",      periodo: "16/06 a 19/06" },
            { etapa: "Etapa Estadual",  periodo: "24/08 a 29/08" },
            { etapa: "Etapa Nordeste",  periodo: "13/09 a 18/09" },
            { etapa: "Etapa Nacional",  periodo: "19/10 a 23/10" }
        ]
    },
    {
        id: "jerns",
        nome: "JERNS",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyYPYQHDqjEgeSsgrzFB-FnBW93lB1Yx5dOkIRHfyVwjL0TyPuBD0e6bg&s=10",
        datas: [
            { etapa: "Fase Regional", periodo: "10/08 a 29/08" },
            { etapa: "Fase Final",    periodo: "09/11 a 30/11" }
        ]
    },
    {
        id: "juverns",
        nome: "JUVERNS",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2KKMH-_EMC_eNnRaIR4vV0eO-st3tbp_SGDCHEndNujeZjgRQOzD5TvY&s=10",
        datas: [
            { etapa: "Período", periodo: "30/06 a 04/07" }
        ]
    },
    {
        id: "jomec",
        nome: "JOMEC",
        logo: "https://jomec.lmcampeao.com.br/Imagens/JOMEC.png",
        datas: [
            { etapa: "Período", periodo: "13/10 a 30/10" }
        ]
    }
];

function pegarCompeticoes(){

    return COMPETICOES;

}