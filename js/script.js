


//var
const contenedorDeVideos = document.querySelector(".videosCont");

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

const startLoop = 15;
const endLoop = 21;

let puedeScroll = true;
const COOLDOWN = 500;

const video = document.getElementById("videoPlayer");
const source = document.getElementById("videoSource");
const texto = document.getElementById("seccionActual");
const overlay = document.querySelector(".fadeOverlay");


//estrellas
const container = document.getElementById("fallingContainer");

for (let i = 0; i < 17; i++) {
    const img = document.createElement("img");

    const sources = ["imgs/Star8.png", "imgs/Star9.png", "imgs/Star10.png"];
    img.src = sources[Math.floor(Math.random() * sources.length)];

    img.classList.add("falling");

    const size = Math.random() * 80 + 40;
    const left = Math.random() * 90;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 15;

    img.style.width = size + "px";
    img.style.left = left + "vw";
    img.style.animationDuration = duration + "s";
    img.style.animationDelay = delay + "s";

    container.appendChild(img);
}








//funciones
function cambiarSeccion(direccion) {
    if (bloqueado) return;
    bloqueado = true;

    
    overlay.classList.add("activo");

    setTimeout(() => {
        indiceActual += direccion;

        if (indiceActual < 0) indiceActual = 0;
        if (indiceActual >= secciones.length) indiceActual = secciones.length - 1;

        const nueva = secciones[indiceActual];

        texto.textContent = ">" + nueva.nombre;

        source.src = nueva.video;
        video.load();
        video.play();

        // fade de regreso
        overlay.classList.remove("activo");

    }, 400); // coincide con el CSS


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






//loop personalizado 

video.addEventListener("timeupdate", () => {
     if (video.currentTime >= endLoop) {
         video.currentTime = startLoop + 0.01; 
    } 
});









//detectar scrolll
contenedorDeVideos.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (!puedeScroll || bloqueado) return;

    // ignorar micro movimientos
    if (Math.abs(e.deltaY) < 30) return;

    puedeScroll = false;

    if (e.deltaY > 0) {
        cambiarSeccion(1);
    } else {
        cambiarSeccion(-1);
    }

    setTimeout(() => {
        puedeScroll = true;
    }, COOLDOWN);
}, { passive: false });




//detectar touch
contenedorDeVideos.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

contenedorDeVideos.addEventListener("touchend", (e) => {
    touchEndY = e.changedTouches[0].screenY;
    manejarSwipe();
});