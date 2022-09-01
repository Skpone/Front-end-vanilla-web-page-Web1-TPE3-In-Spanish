"use strict";

/*tabla dinámica (comprar.html)*/

//agarramos la tabladinamica
let tablaDinamicaDom = document.querySelector("#tablaDinamica");

//agarramos botones que agregan objetos
let btnAdd1 = document.querySelector("#btn-x1");
let btnAdd3 = document.querySelector("#btn-x3");

//mostramos nro actual de la tabla 
let pageNum = 1;

let pageNumDom = document.querySelector("#page-number")

pageNumDom.innerHTML = pageNum;
//mostramos nro actual de la tabla


btnAdd1.addEventListener("click", function(e){
    e.preventDefault();
    add(1);
});


btnAdd3.addEventListener("click", function(e){
   e.preventDefault();
   add(3);
});

//mostramos al principio para q no quede en blanco
show();

//con esta funcion agregamos un nuevo objeto a la API
async function add(num){

   let formData = new FormData(tablaDinamicaDom);
   let input = formData.get("product-input"); //hacemos FormData para agarrar el valor de éste input
   
   //creamos un nuevo obj para insertarlo
   let obj = {
      product: input,
      amount: 1,
   }
   
   for (let i = 0; i < num; i++) {
      try{//fetcheamos la API y le insertamos el obj creado stringifeado
         let response = await fetch(`https://6227692cd1b3ff08c1af0eaf.mockapi.io/api/producto?page=${pageNum}&limit=4`, {
            'method': 'POST',
            'headers': {
               'Content-Type': 'application/json'
            },
            'body': JSON.stringify(obj)
         });
      
      }

      catch(error){
         console.log(error);
      };

   }

   show();
}


async function show(){
   let tbody = document.querySelector("#products-list"); //agarramos el tbody de la tabla
   tbody.innerHTML = ""; //vaciamos para que no se repitan los contenidos de la api cuando hacemos algun cambio

   try {
      let response = await fetch(`https://6227692cd1b3ff08c1af0eaf.mockapi.io/api/producto?page=${pageNum}&limit=4`);

      if (response.ok){//si el fetch dio correcto

         let json = await response.json(); //agarramos el arreglo de obj json de la api
         
         for (const item of json) {//entramos a cada valor de las propiedades y lo mostramos en el html. eso x cada obj que haya.
            tbody.innerHTML += `
            <tr>
                  <td>${item.product}</td>
                  <td>${item.amount}</td>
                  <td><button class="edit-btn" id="${item.id}">Editar</button></td> 
                  <td><button class="delete-btn" id="${item.id}">Eliminar</button></td>
            </tr>
            `; //de paso tmb creamos un boton para eliminar y un boton para editar los con clases para ponerles eventos y id para identificar cuál botón apretamos.
         }

         
         
      } else {
         console.log("paso algo con la url");
      }

      
   }
   catch(error) {
      console.log(error);
   }

   /*si los botones eliminar y modificar no los pongo dentro de ésta función no me va a detectar el id y no van a funcionar*/

   //botones eliminar

   let deleteButtons = document.querySelectorAll(".delete-btn");
   //x cada btn q elegimos le agregamos un evento
   deleteButtons.forEach( boton => {
      boton.addEventListener('click', async function(e){
         
         e.preventDefault();

         try{//buscamos ese obj en el que hayamos hecho click y lo eliminamos
            let res = await fetch(`${`https://6227692cd1b3ff08c1af0eaf.mockapi.io/api/producto`}/${boton.id}?page=${pageNum}&limit=4`, {
               "method": "DELETE"
               });
         }
         catch(error){
            console.log(error);
         }
         
         show();
         
      })
   });

   //botones modificar

   let editButtons = document.querySelectorAll(".edit-btn");
   //x cada btn q elegimos le agregamos un evento
   editButtons.forEach( boton => {
      boton.addEventListener('click', async function(e){
         e.preventDefault();

         let formData = new FormData(tablaDinamicaDom);
         let input = formData.get("product-input"); //agarramos el valor del input para q este se modifique con el obj q elijamos

         let obj = {
            product: input,
            amount: 1,
         }//este obj va a reemplazar a aquel q elijamos en la API


         try{//buscamos ese obj en el que hayamos hecho click y lo reemplazamos x el obj creado para reemplazarlo
            let res = await fetch(`${`https://6227692cd1b3ff08c1af0eaf.mockapi.io/api/producto`}/${boton.id}?page=${pageNum}&limit=4`, {
               "method": "PUT",
               "headers": { "Content-type": "application/json" },
               "body": JSON.stringify(obj)
               });

         }
         catch(error){
            console.log(error);
         }
         //mostramos para que el usuario vea los cambios hechos
         show();
      })
   });
}

//filter/buscador

//cuando apretamos el botón "Buscar"
document.querySelector("#filter-btn").addEventListener('click', async function(e){
   e.preventDefault();

   let formData = new FormData(tablaDinamicaDom);
   let input = formData.get("filter-input"); //agarramos el valor de lo q escribio el usuario

   let tbody = document.querySelector("#products-list");
   tbody.innerHTML = ""; //vaciamos para que no quede codigo anterior mostrado

   try {//fetcheamos la API
      let response = await fetch(`https://6227692cd1b3ff08c1af0eaf.mockapi.io/api/producto?page=${pageNum}&limit=4`);

      let json = await response.json(); //agarramos el contenido de la API

      for (const item of json) { //x cada obj del arreglo json
         if (item.product == input){ //si lo que escribio el usuario es lo mismo a algun obj que este en el json
            tbody.innerHTML += `
            <tr>
                  <td>${item.product}</td>
                  <td>${item.amount}</td>
                  <td><button class="edit-btn" id="${item.id}">Editar</button></td>
                  <td><button class="delete-btn" id="${item.id}">Eliminar</button></td>
            </tr>
            `;//lo mostramos
         }
      }
   }
   catch(error){
      console.log(error);
   }
});

//botones paginacion

//al apretar alguno de estos dos botones lo unico que hacemos es cambiar el valor de la variable y al mostrar cuando fetchee el link de la API lo va a hacer con el nro cambiado
let goBackBtn = document.querySelector("#go-back-btn");
let nextBtn = document.querySelector("#next-btn");

nextBtn.addEventListener("click", function(e){
   e.preventDefault();
   
   pageNum = pageNum + 1;

   pageNumDom.innerHTML = pageNum;//esto para que el usuario sepa en qué pág está

   show();
});


goBackBtn.addEventListener("click", function(e){
   e.preventDefault();
   
   pageNum = pageNum - 1;

   pageNumDom.innerHTML = pageNum;//esto para que el usuario sepa en qué pág está

   show();
});