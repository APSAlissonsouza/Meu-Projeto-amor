const dataNamoro = new Date(2023, 9, 2); 
const dataNoivado = new Date(2025, 3, 5);

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

function atualizarContador(id, data) {
    function atualizar() {
        const contador = document.getElementById(id);
        contador.textContent = `Tempo juntos: ${calcularTempo(data)}`;
        contador.classList.add("show");
    }
    atualizar();
    setInterval(atualizar, 1000);
}

function mostrarTempoNamoro() {
    atualizarContador("contadorNamoro", dataNamoro);
}

function mostrarTempoNoivado() {
    atualizarContador("contadorNoivado", dataNoivado);
}

function mostrarAlbum() {
    const album = document.getElementById("album");
    album.classList.add("show");
}
function esconderAlbum() {
    const album = document.getElementById("album");
    album.classList.remove("show");
}

const musicas = [
    "musicas/Brian McKnight - Marry your daughter lyrics.mp3",
    "musicas/Misaias Oliveira ｜ Ficar Velhinho com Você [Clipe Oficial].mp3",
    "musicas/My only one (lyrics) - Sebastian Yatra ft. Isabela Moner.mp3"
];

let indiceAtual = 0;
const player = document.getElementById('player');
const source = document.getElementById('audio-source');

// Quando a música termina, passa para a próxima
player.addEventListener("ended", () => {
    indiceAtual = (indiceAtual + 1) % musicas.length;
    tocarMusica();
});
function tocarMusica(forcarTroca = false) {
    if (!player.paused && !forcarTroca) return;

    source.src = musicas[indiceAtual];
    player.load();
    player.style.display = "block";
    player.play();

    const nomeArquivo = musicas[indiceAtual].split("/").pop().replace(".mp3", "");
    document.getElementById("musicaAtual").textContent = "🎵 Tocando: " + nomeArquivo;

    // Mostrar os botões de próxima/anterior
    document.getElementById("controlesMusica").style.display = "flex";
}
function proximaMusica() {
    indiceAtual = (indiceAtual + 1) % musicas.length;
    tocarMusica(true);
}

function musicaAnterior() {
    indiceAtual = (indiceAtual - 1 + musicas.length) % musicas.length;
    tocarMusica(true);
}

