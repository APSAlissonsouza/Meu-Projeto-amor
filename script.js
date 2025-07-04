// 📅 Datas importantes
const dataNamoro = new Date(2023, 9, 2);   // Outubro (mês 9)
const dataNoivado = new Date(2025, 3, 5);  // Abril (mês 3)

// ⏳ Função que calcula o tempo entre a data passada e agora
function calcularTempo(data) {
    const agora = new Date();
    const diferenca = agora - data;

    const anos = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365));
    const meses = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const dias = Math.floor((diferenca % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    return `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

// 🕒 Guardar intervalos para evitar múltiplos timers
const timers = {};

// Atualiza contador de tempo a cada segundo
function atualizarContador(id, data) {
    if (timers[id]) clearInterval(timers[id]);

    function atualizar() {
        const contador = document.getElementById(id);
        if (!contador) return;
        contador.textContent = `Tempo juntos: ${calcularTempo(data)}`;
        contador.classList.add("show");
    }

    atualizar();
    timers[id] = setInterval(atualizar, 1000);
}

// Funções acionadas pelos botões
function mostrarTempoNamoro() {
    atualizarContador("contadorNamoro", dataNamoro);
}

function mostrarTempoNoivado() {
    atualizarContador("contadorNoivado", dataNoivado);
}

function mostrarAlbum() {
    document.getElementById("album").classList.add("show");
}

function esconderAlbum() {
    document.getElementById("album").classList.remove("show");
}

// 🎵 Lista de músicas
const musicas = [
    "musicas/Brian McKnight - Marry your daughter lyrics.mp3",
    "musicas/Misaias Oliveira ｜ Ficar Velhinho com Você [Clipe Oficial].mp3",
    "musicas/My only one (lyrics) - Sebastian Yatra ft. Isabela Moner.mp3"
];

let indiceAtual = 0;
const player = document.getElementById('player');
const source = document.getElementById('audio-source');

// Avança para próxima música automaticamente
player.addEventListener("ended", () => {
    indiceAtual = (indiceAtual + 1) % musicas.length;
    tocarMusica(true);
});

// Função que toca a música atual
function tocarMusica(forcarTroca = false) {
    if (!player.paused && !forcarTroca) return;

    source.src = musicas[indiceAtual];
    player.load();
    player.style.display = "block";
    player.play();

    const nomeArquivo = musicas[indiceAtual].split("/").pop().replace(".mp3", "");
    document.getElementById("musicaAtual").textContent = "🎵 Tocando: " + nomeArquivo;
    document.getElementById("controlesMusica").style.display = "flex";
}

// Controla música anterior
function musicaAnterior() {
    indiceAtual = (indiceAtual - 1 + musicas.length) % musicas.length;
    tocarMusica(true);
}

// Controla próxima música
function proximaMusica() {
    indiceAtual = (indiceAtual + 1) % musicas.length;
    tocarMusica(true);
}

// Função de digitação para saudação
function digitarTexto(texto, id, velocidade = 50) {
    let i = 0;
    const elemento = document.getElementById(id);
    if (!elemento) return;

    elemento.innerHTML = "";
    const intervalo = setInterval(() => {
        if (i < texto.length) {
            elemento.innerHTML += texto[i++];
        } else {
            clearInterval(intervalo);
        }
    }, velocidade);
}

// Inicia a saudação quando o DOM estiver carregado
window.addEventListener('DOMContentLoaded', () => {
    digitarTexto("Olá, Alisson e Juliana! 💖", "mensagemSaudacao");
});
