/* =========================
   BANCO DE PERGUNTAS
========================= */

const perguntas = [
    {
        pergunta: "Quanto é 48 + 27?",
        alternativas: ["65", "75", "85", "70"],
        correta: 1,
        categoria: "Operações"
    },

    {
        pergunta: "Quanto é 96 ÷ 8?",
        alternativas: ["10", "11", "12", "14"],
        correta: 2,
        categoria: "Operações"
    },

    {
        pergunta: "Qual fração representa a metade de um inteiro?",
        alternativas: ["1/3", "1/4", "1/2", "2/3"],
        correta: 2,
        categoria: "Frações"
    },

    {
        pergunta: "Qual é o resultado de 3/4 + 1/4?",
        alternativas: ["1/2", "1", "2", "3/4"],
        correta: 1,
        categoria: "Frações"
    },

    {
        pergunta: "Qual número é maior?",
        alternativas: ["0,25", "0,5", "0,75", "0,2"],
        correta: 2,
        categoria: "Números decimais"
    },

    {
        pergunta: "Quanto é 10% de 200?",
        alternativas: ["10", "20", "30", "40"],
        correta: 1,
        categoria: "Porcentagem"
    },

    {
        pergunta: "Um quadrado possui lado de 5 cm. Qual é seu perímetro?",
        alternativas: ["10 cm", "15 cm", "20 cm", "25 cm"],
        correta: 2,
        categoria: "Geometria"
    },

    {
        pergunta: "Qual é a área de um retângulo com 6 cm de comprimento e 4 cm de largura?",
        alternativas: ["10 cm²", "20 cm²", "24 cm²", "28 cm²"],
        correta: 2,
        categoria: "Geometria"
    },

    {
        pergunta: "Qual dos números abaixo é múltiplo de 5?",
        alternativas: ["23", "31", "42", "45"],
        correta: 3,
        categoria: "Múltiplos"
    },

    {
        pergunta: "João tinha R$ 20,00 e gastou R$ 7,50. Quanto sobrou?",
        alternativas: ["R$ 11,50", "R$ 12,50", "R$ 13,50", "R$ 14,50"],
        correta: 1,
        categoria: "Problemas"
    }
];


/* =========================
   ELEMENTOS DA PÁGINA
========================= */

const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const botaoIniciar = document.getElementById("botao-iniciar");
const botaoProxima = document.getElementById("botao-proxima");
const botaoReiniciar = document.getElementById("botao-reiniciar");

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");

const numeroPergunta = document.getElementById("numero-pergunta");
const categoriaElemento = document.getElementById("categoria");

const pontuacaoElemento = document.getElementById("pontuacao");
const vidasElemento = document.getElementById("vidas");

const feedbackElemento = document.getElementById("feedback");

const barraProgresso = document.getElementById("barra-progresso");

const pontuacaoFinal = document.getElementById("pontuacao-final");
const acertosFinal = document.getElementById("acertos-final");
const errosFinal = document.getElementById("erros-final");

const mensagemFinal = document.getElementById("mensagem-final");
const iconeResultado = document.getElementById("icone-resultado");


/* =========================
   VARIÁVEIS DO JOGO
========================= */

let perguntaAtual = 0;
let pontuacao = 0;
let vidas = 3;
let acertos = 0;
let erros = 0;


/* =========================
   INICIAR JOGO
========================= */

function iniciarJogo() {

    perguntaAtual = 0;
    pontuacao = 0;
    vidas = 3;
    acertos = 0;
    erros = 0;

    atualizarPontuacao();
    atualizarVidas();

    mostrarTela(telaJogo);

    mostrarPergunta();
}


/* =========================
   MOSTRAR PERGUNTA
========================= */

function mostrarPergunta() {

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent = pergunta.pergunta;
    categoriaElemento.textContent = pergunta.categoria;

    numeroPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    const progresso =
        ((perguntaAtual) / perguntas.length) * 100;

    barraProgresso.style.width = `${progresso}%`;

    alternativasElemento.innerHTML = "";

    feedbackElemento.textContent = "";
    feedbackElemento.className = "feedback";

    botaoProxima.classList.add("escondido");

    pergunta.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.classList.add("alternativa");

        botao.textContent = alternativa;

        botao.setAttribute(
            "aria-label",
            `Alternativa ${indice + 1}: ${alternativa}`
        );

        botao.addEventListener("click", () => {

            verificarResposta(indice, botao);

        });

        alternativasElemento.appendChild(botao);
    });
}


/* =========================
   VERIFICAR RESPOSTA
========================= */

function verificarResposta(indiceEscolhido, botaoEscolhido) {

    const pergunta = perguntas[perguntaAtual];

    const botoes =
        document.querySelectorAll(".alternativa");

    // Impede que o jogador clique novamente
    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indiceEscolhido === pergunta.correta) {

        // Resposta correta
        botaoEscolhido.classList.add("correta");

        pontuacao += 10;
        acertos++;

        feedbackElemento.textContent =
            "🎉 Muito bem! Resposta correta! +10 pontos";

        feedbackElemento.classList.add("certo");

        atualizarPontuacao();

    } else {

        // Resposta errada
        botaoEscolhido.classList.add("errada");

        botoes[pergunta.correta].classList.add("correta");

        vidas--;
        erros++;

        feedbackElemento.textContent =
            "❌ Ops! Essa não é a resposta correta.";

        feedbackElemento.classList.add("errado");

        atualizarVidas();

    }

    botaoProxima.classList.remove("escondido");

    // Se não houver mais vidas, encerra o jogo
    if (vidas <= 0) {

        botaoProxima.textContent = "Ver resultado";

        feedbackElemento.textContent =
            "💔 Você ficou sem vidas!";
    }
}


/* =========================
   PRÓXIMA PERGUNTA
========================= */

function proximaPergunta() {

    if (vidas <= 0 || perguntaAtual >= perguntas.length - 1) {

        finalizarJogo();

        return;
    }

    perguntaAtual++;

    mostrarPergunta();
}


/* =========================
   FINALIZAR JOGO
========================= */

function finalizarJogo() {

    barraProgresso.style.width = "100%";

    pontuacaoFinal.textContent =
        `${pontuacao} pontos`;

    acertosFinal.textContent = acertos;
    errosFinal.textContent = erros;

    if (vidas <= 0) {

        iconeResultado.textContent = "💪";

        mensagemFinal.textContent =
            "Você se esforçou bastante! Continue praticando e tente novamente.";

    } else if (pontuacao === 100) {

        iconeResultado.textContent = "🏆";

        mensagemFinal.textContent =
            "Incrível! Você acertou todas as perguntas!";

    } else if (pontuacao >= 70) {

        iconeResultado.textContent = "🌟";

        mensagemFinal.textContent =
            "Muito bem! Você demonstrou que entende bastante de Matemática.";

    } else if (pontuacao >= 50) {

        iconeResultado.textContent = "👏";

        mensagemFinal.textContent =
            "Bom trabalho! Continue estudando para melhorar ainda mais.";

    } else {

        iconeResultado.textContent = "📚";

        mensagemFinal.textContent =
            "Continue praticando! Cada tentativa ajuda você a aprender.";

    }

    mostrarTela(telaFinal);
}


/* =========================
   ATUALIZAR PONTUAÇÃO
========================= */

function atualizarPontuacao() {

    pontuacaoElemento.textContent =
        `⭐ ${pontuacao} pontos`;
}


/* =========================
   ATUALIZAR VIDAS
========================= */

function atualizarVidas() {

    let coracoes = "";

    for (let i = 0; i < vidas; i++) {
        coracoes += "❤️";
    }

    for (let i = vidas; i < 3; i++) {
        coracoes += "🖤";
    }

    vidasElemento.textContent = coracoes;

    vidasElemento.setAttribute(
        "aria-label",
        `${vidas} vidas restantes`
    );
}


/* =========================
   TROCAR DE TELA
========================= */

function mostrarTela(tela) {

    document.querySelectorAll(".tela").forEach(secao => {
        secao.classList.remove("ativa");
    });

    tela.classList.add("ativa");
}


/* =========================
   EVENTOS
========================= */

botaoIniciar.addEventListener("click", iniciarJogo);

botaoProxima.addEventListener("click", proximaPergunta);

botaoReiniciar.addEventListener("click", iniciarJogo);


/* =========================
   ACESSIBILIDADE
========================= */

document.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        if (!telaJogo.classList.contains("ativa")) {
            return;
        }

        const botaoVisivel =
            document.querySelector(
                ".botao.secundaria:not(.escondido)"
            );

        if (botaoVisivel) {
            botaoVisivel.click();
        }
    }
});