//varianles
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

eventListeners();

//event listeners
function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=> {

        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });

}


//funciones

function agregarTweet(e) {
    e.preventDefault();

    //textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet);

    //validacion campo vacio
    if(tweet === '') {
        mostrarError('Un Mensaje No Puede Ir Vacio');
        return;
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet
    };
    //añadir al array de tweets
    tweets = [...tweets, tweetObj];
    //console.log(tweets);

    //Una vez agregado el tweet se crea el html

    crearHTML();

    //reiniciar el formulario
    formulario.reset();

}

//mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    //elimina la alerta despues de 4 seg
    setTimeout(()=>{
        mensajeError.remove();
    },4000)

}

//Mostrar listado de los tweets
function crearHTML() {
    limpiarHTML();

    if(tweets.length> 0) {
        tweets.forEach(tweet =>{
            //Agregar boton para eliminar tweet
            const btn = document.createElement('a');
            btn.classList.add('borrar-tweet');
            btn.innerText = 'X';
            //añadir la FUNCION DE ELIMINAR
            btn.onclick = () => {
                borrarTweet(tweet.id);
            }
            //crear el HTML
            const li = document.createElement('li');

            //se añade el texto
            li.innerHTML = tweet.tweet;
             //asignar el boton
            li.appendChild(btn);
            //agregar el html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

//funcion para agregar los tweets al localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//BORRAR TWEET
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();

}

//funcion para limpiar el html
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}