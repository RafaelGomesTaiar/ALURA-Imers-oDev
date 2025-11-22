const cardContainer = document.querySelector(".card-container");
const inputBusca = document.querySelector("#input-busca");
let dados = [];

// Elementos do Modal
const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescricao = document.getElementById("modal-descricao-completa");
const modalLink = document.getElementById("modal-link");
const modalClose = document.querySelector(".modal-close");

// Carrega os dados do JSON uma vez quando a página é carregada
async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados); // Renderiza todos os cards inicialmente
}

function iniciarBusca() {
    const termoBusca = inputBusca.value.toLowerCase();

    if (termoBusca.trim() === "") {
        renderizarCards(dados); // Se a busca estiver vazia, mostra todos os livros
        return;
    }

    const resultados = dados.filter(livro => 
        livro.nome.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <img src="${dado.imagem}" alt="Capa do livro ${dado.nome}" class="card-image">
        <div class="card-content">
            <h2>${dado.nome} (${dado.ano})</h2>
            <p>${dado.descricao_curta}</p>
            <a href="${dado.link}" target="_blank">Saiba mais</a>
        </div>
        `
        // Adiciona o evento de clique para abrir o modal
        article.addEventListener('click', () => abrirModal(dado));
        cardContainer.appendChild(article);

    }
}

function abrirModal(dado) {
    modalTitulo.textContent = `${dado.nome} (${dado.ano})`;
    modalDescricao.textContent = dado.descricao_completa;
    modalLink.href = dado.link;
    modal.style.display = "flex"; // Mostra o modal
}

function fecharModal() {
    modal.style.display = "none"; // Esconde o modal
}

// Eventos para fechar o modal
modalClose.addEventListener('click', fecharModal);
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        fecharModal();
    }
});

// Inicia o carregamento dos dados assim que o script é executado
carregarDados();

// Adiciona um "escutador" para o evento de digitação no campo de busca
inputBusca.addEventListener("input", iniciarBusca);
