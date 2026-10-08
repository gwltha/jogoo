/* =====================================================
   DESAFIO MATEMÁTICO
   QUIZ + ENIGMA SECRETO
===================================================== */


/* =====================================================
   BANCO DE PERGUNTAS
===================================================== */

const perguntas = [

    {
        pergunta: "Quanto é 48 + 27?",
        alternativas: [
            "65",
            "75",
            "85",
            "70"
        ],
        correta: 1,
        categoria: "🔢 Operações"
    },


    {
        pergunta: "Quanto é 96 ÷ 8?",
        alternativas: [
            "10",
            "11",
            "12",
            "14"
        ],
        correta: 2,
        categoria: "➗ Divisão"
    },


    {
        pergunta: "Qual fração representa a metade de um inteiro?",
        alternativas: [
            "1/3",
            "1/4",
            "1/2",
            "2/3"
        ],
        correta: 2,
        categoria: "🍕 Frações"
    },


    {
        pergunta: "Qual é o resultado de 3/4 + 1/4?",
        alternativas: [
            "1/2",
            "1",
            "2",
            "3/4"
        ],
        correta: 1,
        categoria: "🍕 Frações"
    },


    {
        pergunta: "Qual número é maior?",
        alternativas: [
            "0,25",
            "0,5",
            "0,75",
            "0,2"
        ],
        correta: 2,
        categoria: "🔢 Decimais"
    },


    {
        pergunta: "Quanto é 10% de 200?",
        alternativas: [
            "10",
            "20",
            "30",
            "40"
        ],
        correta: 1,
        categoria: "💰 Porcentagem"
    },


    {
        pergunta: "Um quadrado possui lado de 5 cm. Qual é seu perímetro?",
        alternativas: [
            "10 cm",
            "15 cm",
            "20 cm",
            "25 cm"
        ],
        correta: 2,
        categoria: "📐 Geometria"
    },


    {
        pergunta: "Qual é a área de um retângulo com 6 cm de comprimento e 4 cm de largura?",
        alternativas: [
            "10 cm²",
            "20 cm²",
            "24 cm²",
            "28 cm²"
        ],
        correta: 2,
        categoria: "📐 Geometria"
    },


    {
        pergunta: "Qual dos números abaixo é múltiplo de 5?",
        alternativas: [
            "23",
            "31",
            "42",
            "45"
        ],
        correta: 3,
        categoria: "🔮 Múltiplos"
    },


    {
        pergunta: "João tinha R$ 20,00 e gastou R$ 7,50. Quanto sobrou?",
        alternativas: [
            "R$ 11,50",
            "R$ 12,50",
            "R$ 13,50",
            "R$ 14,50"
        ],
        correta: 1,
        categoria: "🛍️ Problemas"
    }

];


/* =====================================================
   ENIGMA
===================================================== */

/*
    Cada emoji esconde uma letra.

    🦋 = A
    🌙 = U
    ⭐ = R
    🌸 = A

    No final:

    🦋 🌙 ⭐ 🌸
       A U R A
*/


const pistasEnigma = {

    1: {
        emoji: "🦋",
        letra: "A"
    },

    3: {
        emoji: "🌙",
        letra: "U"
    },

    6: {
        emoji: "⭐",
        letra: "R"
    },

    8: {
        emoji: "🌸",
        letra: "A"
    }

};


/* =====================================================
   ELEMENTOS HTML
===================================================== */

const telaInicial =
    document.getElementById("tela-inicial");

const telaJogo =
    document.getElementById("tela-jogo");

const telaFinal =
    document.getElementById("tela-final");


const botaoIniciar =
    document.getElementById("botao-iniciar");

const botaoProxima =
    document.getElementById("botao-proxima");

const botaoReiniciar =
    document.getElementById("botao-reiniciar");


const perguntaElemento =
    document.getElementById("pergunta");

const alternativasElemento =
    document.getElementById("alternativas");


const numeroPergunta =
    document.getElementById("numero-pergunta");

const categoriaElemento =
    document.getElementById("categoria");


const pontuacaoElemento =
    document.getElementById("pontuacao");

const vidasElemento =
    document.getElementById("vidas");


const feedbackElemento =
    document.getElementById("feedback");


const barraProgresso =
    document.getElementById("barra-progresso");


const pistaEnigma =
    document.getElementById("pista-enigma");


const letrasEnigma =
    document.getElementById("letras-enigma");


const pontuacaoFinal =
    document.getElementById("pontuacao-final");

const acertosFinal =
    document.getElementById("acertos-final");

const errosFinal =
    document.getElementById("erros-final");

const vidasFinal =
    document.getElementById("vidas-final");


const mensagemFinal =
    document.getElementById("mensagem-final");


const iconeResultado =
    document.getElementById("icone-resultado");


const palavraFinal =
    document.getElementById("palavra-final");

const resultadoEnigma =
    document.getElementById("resultado-enigma");


/* =====================================================
   VARIÁVEIS
===================================================== */

let perguntaAtual = 0;

let pontuacao = 0;

let vidas = 3;

let acertos = 0;

let erros = 0;

let letrasDescobertas = [];


/* =====================================================
   INICIAR
===================================================== */

function iniciarJogo() {

    perguntaAtual = 0;

    pontuacao = 0;

    vidas = 3;

    acertos = 0;

    erros = 0;

    letrasDescobertas = [];

    atualizarPontuacao();

    atualizarVidas();

    resetarEnigma();

    mostrarTela(telaJogo);

    mostrarPergunta();

}


/* =====================================================
   RESETAR ENIGMA
===================================================== */

function resetarEnigma() {

    letrasEnigma.innerHTML = "";

    for (let i = 0; i < 4; i++) {

        const span =
            document.createElement("span");

        span.textContent = "?";

        letrasEnigma.appendChild(span);

    }


    palavraFinal.innerHTML = "";

    for (let i = 0; i < 4; i++) {

        const span =
            document.createElement("span");

        span.textContent = "?";

        palavraFinal.appendChild(span);

    }


    resultadoEnigma.textContent = "";

}


/* =====================================================
   MOSTRAR PERGUNTA
===================================================== */

function mostrarPergunta() {

    const pergunta =
        perguntas[perguntaAtual];


    /* Número */

    numeroPergunta.textContent =
        `${String(perguntaAtual + 1).padStart(2, "0")} / ${String(perguntas.length).padStart(2, "0")}`;


    /* Categoria */

    categoriaElemento.textContent =
        pergunta.categoria;


    /* Pergunta */

    perguntaElemento.innerHTML =
        pergunta.pergunta;


    /* Progresso */

    const progresso =
        (perguntaAtual / perguntas.length) * 100;


    barraProgresso.style.width =
        `${progresso}%`;


    /* Limpa alternativas */

    alternativasElemento.innerHTML = "";


    /* Feedback */

    feedbackElemento.textContent = "";

    feedbackElemento.className =
        "feedback";


    /* Botão */

    botaoProxima.classList.add(
        "escondido"
    );


    /* Pista */

    pistaEnigma.classList.add(
        "escondido"
    );


    /*
        Cria as alternativas
    */

    pergunta.alternativas.forEach(
        (alternativa, indice) => {

            const botao =
                document.createElement("button");


            botao.classList.add(
                "alternativa"
            );


            botao.textContent =
                alternativa;


            botao.addEventListener(
                "click",
                () => {

                    verificarResposta(
                        indice,
                        botao
                    );

                }
            );


            alternativasElemento.appendChild(
                botao
            );

        }
    );


    /*
        Verifica se existe
        emoji secreto nessa pergunta.
    */

    adicionarEmojiMisterioso();

}


/* =====================================================
   ADICIONAR EMOJI MISTERIOSO
===================================================== */

function adicionarEmojiMisterioso() {

    const pista =
        pistasEnigma[perguntaAtual];


    if (!pista) {

        return;

    }


    /*
        Coloca o emoji dentro
        da própria pergunta.
    */

    const botaoEmoji =
        document.createElement("button");


    botaoEmoji.classList.add(
        "emoji-misterioso"
    );


    botaoEmoji.textContent =
        pista.emoji;


    botaoEmoji.title =
        "Emoji misterioso! Clique para descobrir";


    botaoEmoji.addEventListener(
        "click",
        () => {

            descobrirLetra(
                botaoEmoji,
                pista.letra
            );

        }
    );


    perguntaElemento.appendChild(
        botaoEmoji
    );

}


/* =====================================================
   DESCOBRIR LETRA
===================================================== */

function descobrirLetra(
    botaoEmoji,
    letra
) {

    /*
        Evita descobrir a mesma letra
        duas vezes.
    */

    if (
        botaoEmoji.classList.contains(
            "emoji-encontrado"
        )
    ) {

        return;

    }


    botaoEmoji.classList.add(
        "emoji-encontrado"
    );


    botaoEmoji.disabled = true;


    /*
        Guarda a letra.
    */

    letrasDescobertas.push(letra);


    /*
        Atualiza visual.
    */

    atualizarEnigma();


    /*
        Mostra pista.
    */

    pistaEnigma.classList.remove(
        "escondido"
    );


    /*
        Feedback.
    */

    feedbackElemento.textContent =
        `🔮 Você encontrou a letra "${letra}"!`;


    feedbackElemento.className =
        "feedback certo";


    /*
        Se encontrou todas,
        mostra mensagem especial.
    */

    if (letrasDescobertas.length === 4) {

        feedbackElemento.textContent =
            "✨ Você descobriu o segredo! A palavra está completa!";

    }

}


/* =====================================================
   ATUALIZAR ENIGMA
===================================================== */

function atualizarEnigma() {

    const letras =
        letrasEnigma.querySelectorAll("span");


    letras.forEach(
        (span, indice) => {

            if (letrasDescobertas[indice]) {

                span.textContent =
                    letrasDescobertas[indice];

                span.classList.add(
                    "descoberta"
                );

            }

        }
    );

}


/* =====================================================
   VERIFICAR RESPOSTA
===================================================== */

function verificarResposta(
    indiceEscolhido,
    botaoEscolhido
) {

    const pergunta =
        perguntas[perguntaAtual];


    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    /*
        Desabilita todos.
    */

    botoes.forEach(
        botao => {

            botao.disabled = true;

        }
    );


    /*
        RESPOSTA CERTA
    */

    if (
        indiceEscolhido ===
        pergunta.correta
    ) {

        botaoEscolhido.classList.add(
            "correta"
        );


        pontuacao += 10;

        acertos++;


        feedbackElemento.textContent =
            "✨ Muito bem! Você acertou! +10 pontos";


        feedbackElemento.classList.add(
            "certo"
        );


        atualizarPontuacao();

    }


    /*
        RESPOSTA ERRADA
    */

    else {

        botaoEscolhido.classList.add(
            "errada"
        );


        botoes[
            pergunta.correta
        ].classList.add(
            "correta"
        );


        vidas--;

        erros++;


        feedbackElemento.textContent =
            "🌷 Quase! A alternativa correta está marcada em verde.";


        feedbackElemento.classList.add(
            "errado"
        );


        atualizarVidas();

    }


    /*
        Mostra botão.
    */

    botaoProxima.classList.remove(
        "escondido"
    );


    /*
        Última pergunta
        ou acabou vidas.
    */

    if (
        vidas <= 0 ||
        perguntaAtual >=
        perguntas.length - 1
    ) {

        botaoProxima.textContent =
            "Ver meu resultado ✨";

    }

}


/* =====================================================
   PRÓXIMA PERGUNTA
===================================================== */

function proximaPergunta() {

    if (
        vidas <= 0 ||
        perguntaAtual >=
        perguntas.length - 1
    ) {

        finalizarJogo();

        return;

    }


    perguntaAtual++;


    mostrarPergunta();

}


/* =====================================================
   FINALIZAR
===================================================== */

function finalizarJogo() {

    barraProgresso.style.width =
        "100%";


    /*
        Pontuação
    */

    pontuacaoFinal.textContent =
        pontuacao;


    acertosFinal.textContent =
        acertos;


    errosFinal.textContent =
        erros;


    vidasFinal.textContent =
        vidas;


    /*
        Mensagem
    */

    if (pontuacao === 100) {

        iconeResultado.textContent =
            "🏆";


        mensagemFinal.textContent =
            "Incrível! Você dominou todos os desafios matemáticos!";


    }

    else if (pontuacao >= 70) {

        iconeResultado.textContent =
            "🌟";


        mensagemFinal.textContent =
            "Parabéns! Você mandou muito bem nos desafios!";


    }

    else if (pontuacao >= 50) {

        iconeResultado.textContent =
            "👏";


        mensagemFinal.textContent =
            "Muito bom! Continue praticando para ficar ainda melhor.";


    }

    else {

        iconeResultado.textContent =
            "🌱";


        mensagemFinal.textContent =
            "Cada erro é uma oportunidade para aprender. Tente novamente!";

    }


    /*
        Revela a palavra
    */

    revelarPalavraFinal();


    mostrarTela(telaFinal);

}


/* =====================================================
   REVELAR AURA
===================================================== */

function revelarPalavraFinal() {

    palavraFinal.innerHTML = "";


    const palavra = [
        "A",
        "U",
        "R",
        "A"
    ];


    palavra.forEach(
        (letra, indice) => {

            const span =
                document.createElement("span");


            /*
                Só mostra a letra
                se ela foi encontrada.
            */

            if (
                letrasDescobertas[indice]
            ) {

                span.textContent =
                    letra;

                span.classList.add(
                    "revelada"
                );

            }

            else {

                span.textContent =
                    "?";

            }


            palavraFinal.appendChild(
                span
            );

        }
    );


    /*
        Verifica se descobriu tudo.
    */

    if (
        letrasDescobertas.length === 4
    ) {

        resultadoEnigma.innerHTML =
            "✨ <strong>AURA!</strong> Você encontrou a palavra secreta!";

    }

    else {

        resultadoEnigma.innerHTML =
            `Você encontrou ${letrasDescobertas.length} de 4 letras. Tente novamente para descobrir tudo!`;

    }

}


/* =====================================================
   PONTUAÇÃO
===================================================== */

function atualizarPontuacao() {

    pontuacaoElemento.textContent =
        pontuacao;

}


/* =====================================================
   VIDAS
===================================================== */

function atualizarVidas() {

    let coracoes = "";


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        if (i < vidas) {

            coracoes += "❤️";

        }

        else {

            coracoes += "🖤";

        }

    }


    vidasElemento.textContent =
        coracoes;

}


/* =====================================================
   TROCAR DE TELA
===================================================== */

function mostrarTela(tela) {

    document
        .querySelectorAll(".tela")
        .forEach(
            secao => {

                secao.classList.remove(
                    "ativa"
                );

            }
        );


    tela.classList.add(
        "ativa"
    );


    /*
        Volta o usuário para o topo.
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   EVENTOS
===================================================== */

botaoIniciar.addEventListener(
    "click",
    iniciarJogo
);


botaoProxima.addEventListener(
    "click",
    proximaPergunta
);


botaoReiniciar.addEventListener(
    "click",
    iniciarJogo
);


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            telaJogo.classList.contains("ativa")
        ) {

            const botao =
                document.querySelector(
                    ".botao-proxima:not(.escondido)"
                );


            if (botao) {

                botao.click();

            }

        }

    }
);
