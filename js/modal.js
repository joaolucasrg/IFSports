const modalidades = {
            futebol:   { nome: "Futebol Society", icone: "⚽",    horarios: [] },
            natacao:   { nome: "Natação",         icone: "🏊‍♂️", horarios: [] },
            atletismo: { nome: "Atletismo",       icone: "🏃‍♂️", horarios: [] },
            basquete:  { nome: "Basquete",        icone: "🏀",    local: "Ginásio IFCN", 
                grupos: [
                    { titulo: "Manhã", horarios: [
                        {dia: "Sexta-feira", hora: "07:00 às 08:30"}
                    ] },
                    { titulo: "Tarde", horarios: [
                        {dia: "Quarta-feira", hora: "13:00 às 14:30"},
                        {dia: "Quinta-feira", hora: "13:00 às 14:30"},
                    ] }
                ] },
            futsal:    { nome: "Futsal",          icone: "⚽",    local: "Ginásio IFCN",
                grupos: [
                    { titulo: "Masculino", horarios: [
                        { dia: "Quinta-feira", hora: "20:00 às 21:45" },
                        { dia: "Sexta-feira",  hora: "20:00 às 21:45" }
                    ] },
                    { titulo: "Feminino", horarios: [
                        { dia: "Segunda-feira", hora: "12:00" },
                        { dia: "Quarta-feira",  hora: "12:00" }
                    ] }
                ], horarios: [] },
            handebol:  { nome: "Handebol",        icone: "🤾", local: "Ginásio IFCN",
                grupos: [
                    { titulo: "Noite", horarios: [
                        { dia: "Quarta-feira", hora: "18:00 às 20:00"},
                        { dia: "Quinta-feira", hora: "18:00 às 20:00"},
                        { dia: "Sexta-feira", hora: "18:00 às 20:00"}
                    ]}
                ] },
            volei:     { nome: "Vôlei",           icone: "🏐",    horarios: [] },
            tenismesa:     { nome: "Tênis de mesa",   icone: "🏓",    horarios: [] }
        };
 
        const modalEl = document.getElementById("modalHorarios");
        let botaoOrigem = null;
 
        function abrirModal(chave) {
 
            const m = modalidades[chave];
            botaoOrigem = document.activeElement;
 
            document.getElementById("modalIcone").textContent = m.icone;
            document.getElementById("modalTitulo").textContent = "Treinos de " + m.nome;
 
            const conteudo = document.getElementById("modalConteudo");
 
            const grupos = m.grupos ||
                (m.horarios.length ? [{ titulo: "", horarios: m.horarios }] : []);
 
            if (grupos.length === 0) {
                conteudo.innerHTML =
                    '<p class="modal-vazio">Ainda não há horários cadastrados para esta modalidade.</p>';
            } else {
                conteudo.innerHTML = grupos.map(g =>
                    '<section class="modal-grupo">' +
                    (g.titulo ? `<h4>${g.titulo}</h4>` : "") +
                    '<ul class="modal-horarios">' +
                    g.horarios.map(h =>
                        `<li><strong>${h.dia}</strong><span>${h.hora}</span></li>`
                    ).join("") + '</ul></section>'
                ).join("") +
                (m.local
                    ? `<div class="modal-local"><div class="modal-local-icone">📍</div><p>Local: <strong>${m.local}</strong></p></div>`
                    : "");
            }
 
            modalEl.hidden = false;
            modalEl.classList.remove("aberto");
            void modalEl.offsetWidth; // reinicia a animação
            modalEl.classList.add("aberto");
            document.body.classList.add("modal-aberto");
            modalEl.querySelector(".modal-fechar").focus();
 
        }
 
        function fecharModal() {
            modalEl.hidden = true;
            modalEl.classList.remove("aberto");
            document.body.classList.remove("modal-aberto");
            if (botaoOrigem) botaoOrigem.focus();
        }
 
        // Fecha clicando fora da caixa
        modalEl.addEventListener("click", e => {
            if (e.target === modalEl) fecharModal();
        });
 
        // Fecha com ESC
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && !modalEl.hidden) fecharModal();
        });