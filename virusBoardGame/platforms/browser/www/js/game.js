

function playSound(soundResource){
	if (soundResource) {
		var currentAudio = new Audio();
		currentAudio.src = soundResource + ".wav";
		currentAudio.play();
	} else {
		console.log("Error: not soundResource");
	}
}

var cv, cx, objetos, objetoActual= null;
var cvBG, cxBG = null;
var inicioX = 0, inicioY = 0;
var windowWidth, windowHeight = 0;

function renderBGCards (){
	var widthCarta = posCartasUsuario[0];
	var heightCarta = posCartasUsuario[1];
	var posCarta1 = posCartasUsuario[2];
	var posCarta2 = posCartasUsuario[3];
	var posCarta3 = posCartasUsuario[4];

	var img = new Image();
	img.src = "img/cardImages/reversoCarta.jpg";
	img.onload = function(){
		cxBG.drawImage(img, posCarta1[0], posCarta1[1], widthCarta, heightCarta);
		cxBG.drawImage(img, posCarta2[0], posCarta2[1], widthCarta, heightCarta);
		cxBG.drawImage(img, posCarta3[0], posCarta3[1], widthCarta, heightCarta);
	}
}

/**function renderCard() {
	var img = new Image();
	img.src = ""
}
(cardType.organo, 'pulmon', 'img/cardImages/organoHueso.png')**/

function renderOrgano (widthOrgano, heightOrgano, posOrgano, src, estado){
	var x, y, r = 0;
	var x = posOrgano[0] + widthOrgano / 2;
	var y = posOrgano[1] + heightOrgano / 2;
	var r = widthOrgano / 2;
	//Estados: vacio, normal, enfermo, vacunado
	if (estado == "vacio"){
		cxBG.fillStyle = 'white';
		cxBG.fillRect(posOrgano[0], posOrgano[1], widthOrgano, heightOrgano);
	}
	/** SERAN CIRCULOS
		cx.strokeStyle = "red";
		cx.fillStyle = "blue";
		cx.lineWidth = 5;
		cx.arc(x, y, r, 0, 2 * Math.PI);
		cx.fill();
		cx.stroke();
	}
	**/
}

function ponerJugadores(){
	//Queremos que todos los usuarios esten ubicados en cada dispositivo de la misma forma
	//Empezamos por el jugador propio y vamos colocando en sentido horario hasta completar el bucle
	var widthOrgano = "";
	var heightOrgano = "";
	var posOrgano1, posOrgano2, posOrgano3, posOrgano4 = null;
	for (var i = 0; i < posOrganosJugadores.length; i++){
		//console.log("JUGADOR "+i+1);
		widthOrgano = posOrganosJugadores[i][0];
		heightOrgano = posOrganosJugadores[i][1];
		for (var u = 2; u < 6; u++){
			posOrgano = posOrganosJugadores[i][u];
			//console.log("widthCarta: "+widthCarta);
			//console.log("heightCarta: "+heightCarta);
			//console.log("posCarta1: "+posCarta1);
			//console.log("posCarta2: "+posCarta2);
			//console.log("posCarta3: "+posCarta3);
			renderOrgano(widthOrgano, heightOrgano, posOrgano, "", "vacio");
		}
	}
}

function takeCard(){
    if (deckOfCards.length != 0){
    	var drawedCard = deckOfCards.shift();
    	console.log(drawedCard);
    	return drawedCard;
    } else {
    	alert("Oh! No quedan cartas en el mazo!");
        return null;
    }
}

function actualizarCanvas(){
	//console.log("Actualizar canvas");
	cx.clearRect(0, 0, windowWidth, windowHeight);
	var img1 = new Image();
	if (objetos[0].src != ""){
		img1.src = objetos[0].src;
		img1.onload = function(){
			//console.log("objetos[0] :"+objetos[0]);
			cx.drawImage(img1, objetos[0].x, objetos[0].y, objetos[0].width, objetos[0].height);
		}
	}
	var img2 = new Image();
	if (objetos[1].src != ""){
		img2.src = objetos[1].src;
		img2.onload = function(){
			//console.log("objetos[1] :"+objetos[1]);
			cx.drawImage(img2, objetos[1].x, objetos[1].y, objetos[1].width, objetos[1].height);
		}
	}
	var img3 = new Image();
	if (objetos[2].src != ""){
		img3.src = objetos[2].src;
		img3.onload = function(){
			//console.log("objetos[2] :"+objetos[2]);
			cx.drawImage(img3, objetos[2].x, objetos[2].y, objetos[2].width, objetos[2].height);
		}
	}
}

function moveObjects(){
	var offsetCartasUsuario = 0;
	offsetCartasUsuario = (posCartasUsuario[1] - posCartasUsuario[0]) / 2;

	objetos.push({
		x: posCartasUsuario[2][0], y: posCartasUsuario[2][1] + offsetCartasUsuario,
		xOrigen: posCartasUsuario[2][0], yOrigen: posCartasUsuario[2][1] + offsetCartasUsuario,
		width: posCartasUsuario[0], height: posCartasUsuario[0],
		numCarta: 0,
		src: "img/cardImages/organoHueso.png"
	});
	objetos.push({
		x: posCartasUsuario[3][0], y: posCartasUsuario[3][1] + offsetCartasUsuario,
		xOrigen: posCartasUsuario[3][0], yOrigen: posCartasUsuario[3][1] + offsetCartasUsuario,
		width: posCartasUsuario[0], height: posCartasUsuario[0],
		numCarta: 1,
		src: "img/cardImages/organoHueso.png"
	});
	objetos.push({
		x: posCartasUsuario[4][0], y: posCartasUsuario[4][1] + offsetCartasUsuario,
		xOrigen: posCartasUsuario[4][0], yOrigen: posCartasUsuario[4][1] + offsetCartasUsuario,
		width: posCartasUsuario[0], height: posCartasUsuario[0],
		numCarta: 2,
		src: "img/cardImages/organoHueso.png"
	});

	//Movil - ordenador
	//cv.ontouchstart = function(event) {
		//var touch = event.touches[0];
	cv.onmousedown = function(event) {
		var touch = event;
		console.log("Onmousedown");
		for (var i = 0; i < objetos.length; i++) {
			if (objetos[i].x < touch.pageX
			  && (objetos[i].width + objetos[i].x > touch.pageX)
			  && objetos[i].y < touch.pageY
			  && (objetos[i].height + objetos[i].y > touch.pageY)) {
				objetoActual = objetos[i];
				console.log("Objeto "+i+" TOCADO");
				inicioY = touch.pageY - objetos[i].y;
				inicioX = touch.pageX - objetos[i].x;
				break;
			}
		}
	}

	//Movil - ordenador
	//cv.ontouchmove = function(event) {
		//var touch = event.touches[0];
	cv.onmousemove = function(event) {
		var touch = event;
		console.log("Onmousemove");
		//Solo actualizamos si movemos y hay algun objeto seleccionado y cada cierta diferencia de pixeles
		if (objetoActual != null) /**&&
			//Pendiente de optimizar
			((objetoActual.x - 15 > touch.pageX - inicioX) ||
			(objetoActual.x + 15 < touch.pageX - inicioX) ||
			(objetoActual.y - 15 > touch.pageY - inicioY) ||
			(objetoActual.y + 15 < touch.pageY - inicioY)) )**/ {
			objetoActual.x = touch.pageX - inicioX;
			objetoActual.y = touch.pageY - inicioY;
			//console.log("ObjetoActual.x: "+objetoActual.x);
			//console.log("touch.pageX: "+touch.pageX);
			//console.log("inicioX :"+inicioX);
			actualizarCanvas();
		}
	}

	//Movil - ordenador
	//cv.ontouchend = function(event) {
	cv.onmouseup = function(event) {
		console.log("Onmouseup");
		if (objetoActual != null){
			checkCollision();
			actualizarCanvas();
		}
		//	2Eliminar o no objeto
		//	3Agregarlo o no a algun sitio
		//4restablecer coordenadas iniciale
		objetoActual = null;
	}
}

//Devuelve el numero de la pos. donde ha habido colision, 0 si no la ha habido o -1 si hay error
function checkCollision(){
	var movValido = false;
	var colision = 0;
	//En orden de probabilidad de ocurrencia
	//Posicion 1
	if ((objetoActual.x < ((windowWidth / 6) * 4)) &&
		(objetoActual.x > ((windowWidth / 6) * 2)) &&
		(objetoActual.y > (windowHeight / 3) * 2)) {
		console.log("Colision zona 1");
		colision = 1;
	}
	//Posicion 4
	else if ((objetoActual.x < ((windowWidth / 6) * 4)) &&
		(objetoActual.x > ((windowWidth / 6) * 2)) &&
		(objetoActual.y < (windowHeight / 3))) {
		console.log("Colision zona 4");
		colision = 4;
	}
	//Posicion 2
	else if ((objetoActual.x < ((windowWidth / 6) * 1)) &&
		(objetoActual.y > (windowHeight / 3))) {
		console.log("Colision zona 2");
		colision = 2;
	}
	//Posicion 6
	else if ((objetoActual.x > ((windowWidth / 6) * 5)) &&
		(objetoActual.y > (windowHeight / 3))) {
		console.log("Colision zona 6");
		colision = 6;
	}
	//Posicion 3
	else if ((objetoActual.x < ((windowWidth / 6) * 2)) &&
		(objetoActual.y < (windowHeight / 3))) {
		console.log("Colision zona 3");
		colision = 3;
	}
	//Posicion 5
	else if ((objetoActual.x > ((windowWidth / 6) * 4)) &&
		(objetoActual.y < (windowHeight / 3))) {
		console.log("Colision zona 5");
		colision = 5;
	} else {
		colision = -1;
	}

	movValido = validarMov(colision, objetoActual.numCarta);
	if ((colision > 0) && (movValido == true)){

	} else {
		console.log("No colision: ");
		objetoActual.x = objetoActual.xOrigen;
		objetoActual.y = objetoActual.yOrigen;
	}
}

//Devuelve true o false dependiendo de la validez del mov
function validarMov(jugDestino, numCarta){
	//console.log("Tipo de Carta: "+cartasUsuario[numCarta].cardType);
	var cardType = cartasUsuario[numCarta].cardType;
	if ((cardType == organo) && (jugDestino == 1)){
		if (true){//si el organo no esta repetido
			//Dibujar en el canvas
			//Mandamos movimiento al servidor
		}
	}
	return false;
}

function manejadorColision(){
	//Comprobar si es "legal" el movimiento
	//Enviar al servidor mi movimiento
	//Dibujar mi movimiento
}

$(document).ready(function(){
	console.log("Document Ready");
	console.log("Orientation before lock is: "+screen.orientation.type);
	//Da error en el navegador, pero no para la ejecucion
	screen.orientation.lock('landscape');

	simularDatosIniciales();

	window.onload = function(){
		console.log("Window onload");
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		//console.log("windowWidth: "+windowWidth);
		//console.log("windowHeight: "+windowHeight);
		objetos = [];

		//Canvas principal
		cv = document.getElementById('canvas');
		cv.width = windowWidth;
		cv.height = windowHeight;
		cx = cv.getContext('2d');
		cx.fillStyle = "rgba(0,0,255,0)";
		cx.fillRect(0,0,windowWidth,windowHeight);

		//Canvas en background
		cvBG = document.getElementById('canvasBG');
		cvBG.width = windowWidth;
		cvBG.height = windowHeight;
		cxBG = cvBG.getContext('2d');
		cxBG.fillStyle = 'MediumSeaGreen';
		cxBG.fillRect(0,0,windowWidth,windowHeight);
		
		Engine.initCanvas();
		Engine.initJugadores();
		Engine.initPosOrganosJugadores();
		Engine.initPosCartasUsuario();
		Engine.initDeckOfCards();

		ponerJugadores();
		renderBGCards();

		//Tricky
		empezarJuego();
			//Aqui hay un orden de cosas que ocurren estamos ignorando la com. servidor-cliente
			//pero prefiero mantener separado cosas que hace el servidor con cosas que hace el cliente


		moveObjects();
		actualizarCanvas();

	}
})


