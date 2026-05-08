

//boton estrella
const boton = document.querySelector(".abrirSidebar");
const sidebar = document.querySelector(".sidebar");


//sidebar logic 
boton.addEventListener("click", () => {
    console.log("abre");
    sidebar.classList.toggle("activa");
});