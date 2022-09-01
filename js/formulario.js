"use strict";
//formulario index.html

//agarramos formulario
let formDom = document.querySelector("#form");

//cuando "submit" lo hacemos FormData y agarramos los inputs 
formDom.addEventListener("submit", function(e){
    e.preventDefault();
    let formData = new FormData(formDom);
    let email = formData.get("email");
    let name = formData.get("name");
    let password = formData.get("password");
    console.log(email, name, password);
})

//btn "Generar"
let btnGenerate = document.querySelector("#captcha-generator")
//aca va txt captcha generado
let captchaText = "";
//llamamos asi no queda en blanco al iniciar la pág
generate();

//cuando apretamos btn "Generar" generamos texto y mostramos
btnGenerate.addEventListener("click", generate);

function generate(){

    let caracters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    console.log(caracters.length);
    captchaText = "";

    for (let i = 0; i < 6; i++) { //las dos operaciones de abajo se loopean 6 veces
        let randomNum = Math.floor(Math.random() * caracters.length); //generamos entre 0 y 1 inclusive, ese nro lo multiplicamos x el lenght del arreglo y lo flooreamos.
        captchaText += caracters[randomNum]; //le agregamos un caracter random calculado x randomNum
    }
    
    showCaptchaText(); //mostramos

}

function showCaptchaText(){

    let captchaTextDom = document.querySelector("#captcha-text");

    captchaTextDom.innerHTML = captchaText;

}

//check que lo que ingreso el usuario en captcha-input == captchaText y monstrar msj en html

//lo FormDateamos para poder agarrar el valor de captcha-input
document.querySelector("#captchaCheck-btn").addEventListener("click", function(){
    let formData = new FormData(formDom);
    let input = formData.get("captcha-input");
    //aca se va a mostrar si es correcto o incorrecto
    let captchaAnswer = document.querySelector("#captcha-answer")

    if(input == captchaText){

        captchaAnswer.innerHTML = "Correcto";

    }else{

        captchaAnswer.innerHTML = "Intenta de nuevo";

    }

})