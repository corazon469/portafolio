

//estrellas
const container = document.getElementById("fallingContainer");

for (let i = 0; i < 17; i++) {
    const img = document.createElement("img");

    const sources = ["imgs/Star8.png", "imgs/Star9.png", "imgs/Star10.png"];
    img.src = sources[Math.floor(Math.random() * sources.length)];

    img.classList.add("falling");

    const size = Math.random() * 5 + 1;
    const left = Math.random() * 90;
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 15;

    img.style.width = size + "rem";
    img.style.left = left + "vw";
    img.style.animationDuration = duration + "s";
    img.style.animationDelay = delay + "s";

    container.appendChild(img);
}