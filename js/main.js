"use strict";

//mostrar/ocultar barra de navegacion (.hamburger aparece cuando el media query se "activa")
document.querySelector(".hamburger").addEventListener("click", function(e){
    document.querySelector("nav").classList.toggle("mostrarNav");
})

