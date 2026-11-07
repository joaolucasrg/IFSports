/* =========================
   COMPETIÇÕES
   ========================= */

(function () {

    let modal = null;
    let botaoOrigem = null;

    // Monta a logo; se a imagem não carregar, mostra um troféu
    function criarLogo(comp) {

        const img = document.createElement("img");

        img.src = comp.logo;
        img.alt = "Logo " + comp.nome;
        img.loading = "lazy";

        img.onerror = function () {

            const fallback = document.createElement("span");

            fallback.className = "comp-logo-fallback";
            fallback.textContent = "🏆";

            img.replaceWith(fallback);

        };

        return img;

    }


    // Usa o modal que já existe na página; se não existir, cria um
    function garantirModal() {

        if (modal) return modal;

        modal = document.getElementById("modalCompeticao");

        if (!modal) {

            modal = document.createElement("div");
            modal.className = "modal-overlay";
            modal.id = "modalCompeticao";
            modal.hidden = true;

            modal.innerHTML = `
                <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalCompTitulo">
                    <div class="modal-topo">
                        <button type="button" class="modal-fechar" aria-label="Fechar">×</button>
                        <div class="modal-icone" id="modalCompIcone"></div>
                        <h3 id="modalCompTitulo"></h3>
                    </div>
                    <div class="modal-corpo" id="modalCompConteudo"></div>
                </div>
            `;

            document.body.appendChild(modal);

            modal.querySelector(".modal-fechar")
                .addEventListener("click", fecharModalCompeticao);

        }

        // Fecha clicando fora da caixa
        modal.addEventListener("click", e => {
            if (e.target === modal) fecharModalCompeticao();
        });

        // Fecha com ESC
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && !modal.hidden) fecharModalCompeticao();
        });

        return modal;

    }


    function abrirModalCompeticao(id) {

        const comp = pegarCompeticoes().find(c => c.id === id);

        if (!comp) return;

        const m = garantirModal();

        botaoOrigem = document.activeElement;

        const icone = document.getElementById("modalCompIcone");

        icone.innerHTML = "";
        icone.classList.add("com-logo");
        icone.appendChild(criarLogo(comp));

        document.getElementById("modalCompTitulo").textContent = comp.nome;

        document.getElementById("modalCompConteudo").innerHTML =
            '<section class="modal-grupo">' +
            '<h4>Datas</h4>' +
            '<ul class="modal-horarios">' +
            comp.datas.map(d =>
                `<li><strong>${d.etapa}</strong><span>${d.periodo}</span></li>`
            ).join("") +
            '</ul></section>';

        m.hidden = false;
        m.classList.remove("aberto");
        void m.offsetWidth;   // reinicia a animação
        m.classList.add("aberto");

        document.body.classList.add("modal-aberto");

        m.querySelector(".modal-fechar").focus();

    }


    function fecharModalCompeticao() {

        if (!modal) return;

        modal.hidden = true;
        modal.classList.remove("aberto");

        document.body.classList.remove("modal-aberto");

        if (botaoOrigem) botaoOrigem.focus();

    }


    function carregarCompeticoes() {

        const grid = document.getElementById("listaCompeticoes");

        if (!grid) return;   // página sem a seção: não faz nada

        grid.innerHTML = "";

        pegarCompeticoes().forEach(comp => {

            const card = document.createElement("article");
            card.className = "comp-card";

            const logoBox = document.createElement("div");
            logoBox.className = "comp-logo";
            logoBox.appendChild(criarLogo(comp));

            const nome = document.createElement("h3");
            nome.textContent = comp.nome;

            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "btn-datas";
            botao.textContent = "Datas";
            botao.addEventListener("click", () => abrirModalCompeticao(comp.id));

            card.append(logoBox, nome, botao);
            grid.appendChild(card);

        });

    }


    // Expõe para o HTML antigo (onclick="fecharModalCompeticao()") continuar funcionando
    window.abrirModalCompeticao = abrirModalCompeticao;
    window.fecharModalCompeticao = fecharModalCompeticao;

    document.addEventListener("DOMContentLoaded", carregarCompeticoes);

})();