document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-container form');
    const nomeInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const experienciaInput = form.querySelector('textarea');
    const depoimentosContainer = document.querySelector('.depoimentos-cards');
    const stars = document.querySelectorAll('.star-rating .star');
    let selectedRating = 0;

    // Atualiza visual das estrelas
    function updateStars(rating) {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            star.classList.toggle('selected', value <= rating);
        });
    }

    // Interação com as estrelas
    stars.forEach(star => {
        star.addEventListener('click', function () {
            selectedRating = parseInt(this.getAttribute('data-value'));
            updateStars(selectedRating);
        });

        star.addEventListener('mouseover', function () {
            const hoverValue = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                const value = parseInt(s.getAttribute('data-value'));
                s.classList.toggle('hover', value <= hoverValue);
            });
        });

        star.addEventListener('mouseout', function () {
            stars.forEach(s => s.classList.remove('hover'));
        });
    });

    // Cria e insere um card no DOM usando createElement para evitar inconsistências
    function adicionarCard(depoimento) {
        const card = document.createElement('div');
        card.classList.add('depoimento-card');

        const starsDiv = document.createElement('div');
        starsDiv.classList.add('stars');
        starsDiv.textContent = '★'.repeat(depoimento.estrelas) + '☆'.repeat(5 - depoimento.estrelas);

        const comentarioP = document.createElement('p');
        comentarioP.classList.add('comentario');
        comentarioP.textContent = `"${depoimento.texto}"`;

        const hr = document.createElement('hr');

        const nomeH4 = document.createElement('h4');
        nomeH4.textContent = depoimento.nome;

        card.appendChild(starsDiv);
        card.appendChild(comentarioP);
        card.appendChild(hr);
        card.appendChild(nomeH4);

        depoimentosContainer.appendChild(card);
    }

    // Carrega depoimentos salvos no localStorage
    function carregarDepoimentos() {
        const dadosSalvos = localStorage.getItem('depoimentos');
        if (dadosSalvos) {
            const depoimentos = JSON.parse(dadosSalvos);
            depoimentos.forEach(adicionarCard);
        }
    }

    // Salva novo depoimento no localStorage
    function salvarDepoimento(depoimento) {
        let depoimentos = JSON.parse(localStorage.getItem('depoimentos')) || [];
        depoimentos.push(depoimento);
        localStorage.setItem('depoimentos', JSON.stringify(depoimentos));
    }

    // Submissão do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const experiencia = experienciaInput.value.trim();

        if (!nome || !email || !experiencia || selectedRating === 0) {
            alert('Por favor, preencha todos os campos e selecione uma nota.');
            return;
        }

        const novoDepoimento = {
            nome: nome,
            texto: experiencia,
            estrelas: selectedRating
        };

        adicionarCard(novoDepoimento);
        salvarDepoimento(novoDepoimento);

        form.reset();
        selectedRating = 0;
        updateStars(0);

        document.getElementById('depoimentos').scrollIntoView({ behavior: 'smooth' });
    });

    // Inicializar a página com depoimentos salvos
    carregarDepoimentos();
});

const botaoApagar = document.getElementById('apagar-depoimentos');

// Atalho secreto: Ctrl + Alt + D revela o botão
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'd') {
        botaoApagar.style.display = 'inline-block';
    }
});

// Evento de clique no botão para apagar tudo
botaoApagar.addEventListener('click', function () {
    const confirmar = confirm('Tem certeza que deseja apagar todos os depoimentos?');
    if (confirmar) {
        localStorage.removeItem('depoimentos');
        const container = document.querySelector('.depoimentos-cards');
        container.innerHTML = '';
        botaoApagar.style.display = 'none'; // Oculta novamente após uso
        alert('Todos os depoimentos foram apagados.');
    }
});



// Seleciona elementos
const overlay = document.getElementById("overlay-modal");
const modal = document.getElementById("modal");
const btnFechar = document.getElementById("fecharModal");

// Seleciona título, texto e imagem do modal
const modalTitulo = document.querySelector(".modal-texto h2");
const modalTexto = document.querySelector(".modal-texto p");
const modalImg = document.querySelector(".modal-conteudo img");

// Pega todas as maçãs
const frutas = document.querySelectorAll(".fruta-container img");

// Lista de conteúdos sustentáveis variados
const conteudos = [
  { titulo: "Curiosidade 🌍", texto: "Você sabia que uma garrafa plástica pode levar até 450 anos para se decompor no meio ambiente?", img: "static/img/garrafa-pet.jpg" },
  { titulo: "Curiosidade 💡", texto: "Reciclar uma lata de alumínio economiza energia suficiente para manter uma TV ligada por 3 horas.", img: "static/img/lata-aluminio.jpg" },
  { titulo: "Impacto Ambiental 🌊", texto: "Veja a diferença: rios poluídos perdem vida, enquanto rios limpos garantem biodiversidade.", img: "static/img/rio.jpg" },
  { titulo: "Importância das árvores 🌳", texto: "Uma árvore adulta pode absorver até 22 kg de CO₂ por ano e liberar oxigênio suficiente para duas pessoas.", img: "static/img/arvore.jpeg" },
  { titulo: "Energia do Sol ☀️", texto: "Segundo dados da Nasa, a Terra recebe em apenas 1 hora de sol mais energia do que toda a humanidade consome em 1 ano.", img: "static/img/painel-solar.jpg" },
  { titulo: "Produto Sustentável 🛍️", texto: "Sacola reutilizável: substitui centenas de sacolas plásticas descartáveis.", img: "static/img/sacola.jpg" },
  { titulo: "Carro x Bicicleta 🚲", texto: "Se 1 pessoa trocar o carro pela bicicleta em apenas 8 km por dia, evita emitir 750 kg de CO₂ por ano.", img: "static/img/bicicleta.jpg" },
  { titulo: "Alimentos e desperdício 🍽️", texto: "Cerca de 1/3 de toda a comida produzida no mundo vai parar no lixo.", img: "static/img/desperdicio.jpg" }
];

// Função para abrir modal
function abrirModal(index) {
  modalTitulo.textContent = conteudos[index].titulo;
  modalTexto.textContent = conteudos[index].texto;
  modalImg.src = conteudos[index].img;
  modalImg.alt = conteudos[index].titulo;

  overlay.style.display = "block";
  modal.style.display = "block";

  setTimeout(() => {
    modal.style.opacity = "1";
    modal.style.transform = "translate(-50%, -50%) scale(1)";
  }, 10);
}

// Função para fechar modal
function fecharModal() {
  modal.style.opacity = "0";
  modal.style.transform = "translate(-50%, -50%) scale(0.8)";
  
  setTimeout(() => {
    overlay.style.display = "none";
    modal.style.display = "none";
  }, 200);
}

// Eventos
frutas.forEach((fruta, index) => {
  fruta.addEventListener("click", () => abrirModal(index));
});

btnFechar.addEventListener("click", fecharModal);
overlay.addEventListener("click", fecharModal);


// Animação de fade-up em elementos visíveis na rolagem
document.addEventListener('DOMContentLoaded', () => {
  const elementosParaAnimar = document.querySelectorAll(
    '.card, .fruta-container img, .form-container, .section-header, .sobre-content p, .arvore-container, .depoimentos-cards, .sobre-container, .arvore, .inicio-content '
  );

  // Aplica classe base .fade-up
  elementosParaAnimar.forEach(el => {
    el.classList.add('fade-up');
  });

  const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // Remove para permitir reaparecer com animação
    }
  });
}, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});


document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Apenas se quiser animar uma vez e não sumir ao sair da tela:
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => observer.observe(card));
});


let estagioAtual = 0;
const folhasImgs = [
    "./static/img/leaf.png",
    "./static/img/maple.png",
];

function criarFolha() {
    const folha = document.createElement('img');
    folha.classList.add('folha');

    // Define a imagem com base no estágio atual
    folha.src = folhasImgs[estagioAtual];

    // posição horizontal aleatória
    folha.style.left = Math.random() * window.innerWidth + 'px';

    // duração e atraso aleatório
    const duracao = 5 + Math.random() * 5;
    folha.style.animationDuration = duracao + 's';

    // tamanho aleatório
    const tamanho = 20 + Math.random() * 30;
    folha.style.width = `${tamanho}px`;

    document.body.appendChild(folha);

    setTimeout(() => folha.remove(), duracao * 1000);
}

// Começa a gerar folhas
setInterval(criarFolha, 500);

// Altera imagem a cada 60 segundos (1 minuto)
setInterval(() => {
    estagioAtual = (estagioAtual + 1) % folhasImgs.length;
}, 60000);



const toggle = document.querySelector(".toggle");
  const navLinks = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });