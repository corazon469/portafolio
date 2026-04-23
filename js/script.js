const contenedorDeVideos = document.querySelector(".videos");

const secciones = [
    {
        nombre: "Diseño",
        video:"videos/muñecaDiseño.mp4"
    },

    {
        nombre: "Ilustración",
        video:"videos/muñecaIlustracion.mp4"
    },
    {
        nombre: "Programación",
        video:"videos/muñecaProgramacion.mp4"
    }
];

let touchStartY = 0;
let touchEndY = 0;

let indiceActual = 0;
let bloqueado = false;

const video = document.getElementById("videoPlayer");
const source = document.getElementById("videoSource");
const texto = document.getElementById("seccionActual");

function cambiarSeccion(direccion) {
    if (bloqueado) return;
    bloqueado = true;

    indiceActual += direccion;

    if (indiceActual < 0) indiceActual = 0;
    if (indiceActual >= secciones.length) indiceActual = secciones.length - 1;

    const nueva = secciones[indiceActual];

    // cambiar texto
    texto.textContent = ">" + nueva.nombre;

    // cambiar video
    source.src = nueva.video;
    video.load();
    video.play();

    setTimeout(() => {
        bloqueado = false;
    }, 800); // evita que cambie muy rápido
}


function manejarSwipe() {
    const diferencia = touchStartY - touchEndY;

    if (Math.abs(diferencia) < 50) return; // evita cambios accidentales

    if (diferencia > 0) {
        cambiarSeccion(1); // swipe hacia arriba
    } else {
        cambiarSeccion(-1); // swipe hacia abajo
    }
}


// detectar scroll
contenedorDeVideos.addEventListener("wheel", (e) => {
    e.preventDefault(); 

    if (e.deltaY > 0) {
        cambiarSeccion(1); // abajo
    } else {
        cambiarSeccion(-1); // arriba
    }
}, { passive: false });



//detectar touch
contenedorDeVideos.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

contenedorDeVideos.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].screenY;
    manejarSwipe();
});