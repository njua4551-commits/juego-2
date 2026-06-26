const preguntas = [

{
texto:"La ENIAC fue la primera computadora electrónica de propósito general.",
respuesta:true
},

{
texto:"El transistor reemplazó los tubos de vacío.",
respuesta:true
},

{
texto:"La World Wide Web fue creada antes que la ENIAC.",
respuesta:false
},

{
texto:"La CPU es conocida como el cerebro de la computadora.",
respuesta:true
},

{
texto:"La memoria RAM guarda los datos permanentemente.",
respuesta:false
},

{
texto:"Intel 4004 fue uno de los primeros microprocesadores.",
respuesta:true
},

{
texto:"El monitor se encuentra dentro del gabinete.",
respuesta:false
},

{
texto:"La inteligencia artificial forma parte de la era moderna.",
respuesta:true
}

];

let actual = 0;
let puntos = 0;
let vidas = 3;
let tiempo = 10;
let intervalo;

const preguntaEl =
document.getElementById("pregunta");

const vidasEl =
document.getElementById("vidas");

const puntosEl =
document.getElementById("puntos");

const timerEl =
document.getElementById("timer");

const mensajeEl =
document.getElementById("mensaje");

function sonidoCorrecto(){

const ctx =
new (window.AudioContext ||
window.webkitAudioContext)();

const osc =
ctx.createOscillator();

osc.frequency.value = 700;
osc.connect(ctx.destination);

osc.start();

setTimeout(()=>{
osc.stop();
},150);

}

function sonidoError(){

const ctx =
new (window.AudioContext ||
window.webkitAudioContext)();

const osc =
ctx.createOscillator();

osc.frequency.value = 200;
osc.connect(ctx.destination);

osc.start();

setTimeout(()=>{
osc.stop();
},250);

}

function cargarPregunta(){

if(actual >= preguntas.length ||
vidas <= 0){

terminarJuego();
return;

}

preguntaEl.innerHTML =
preguntas[actual].texto;

mensajeEl.innerHTML = "";

tiempo = 10;
timerEl.innerHTML = tiempo;

clearInterval(intervalo);

intervalo = setInterval(()=>{

tiempo--;

timerEl.innerHTML = tiempo;

if(tiempo <= 0){

vidas--;

vidasEl.innerHTML = vidas;

mensajeEl.innerHTML =
"⏰ Tiempo agotado";

clearInterval(intervalo);

setTimeout(()=>{

actual++;
cargarPregunta();

},1200);

}

},1000);

}

function responder(valor){

clearInterval(intervalo);

let correcta =
preguntas[actual].respuesta;

if(valor === correcta){

puntos += 10;

puntosEl.innerHTML =
puntos;

mensajeEl.innerHTML =
"✅ ¡Correcto!";

sonidoCorrecto();

}else{

vidas--;

vidasEl.innerHTML =
vidas;

mensajeEl.innerHTML =
"❌ Incorrecto";

sonidoError();

}

setTimeout(()=>{

actual++;

cargarPregunta();

},1200);

}

function terminarJuego(){

document.querySelector(".game")
.style.display = "none";

document
.getElementById("finalScreen")
.classList.remove("hidden");

let medalla = "";

if(puntos >= 70){

medalla =
"🥇 Experto en Computación";

}else if(puntos >= 40){

medalla =
"🥈 Conocedor de la Historia";

}else{

medalla =
"🥉 Aprendiz Tecnológico";

}

document
.getElementById("medalla")
.innerHTML = medalla;

document
.getElementById("resultadoFinal")
.innerHTML =
`Obtuviste ${puntos} puntos`;
}

cargarPregunta();