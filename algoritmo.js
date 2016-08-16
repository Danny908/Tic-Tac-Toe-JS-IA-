/*
=================================
TABLERO EN ARRAY BIDIMENCIONAL
=================================
*/
var casillas = new Array(2);
casillas[0] = new Array(2);
casillas[1] = new Array(2);
casillas[2] = new Array(2);
/*
=================================
INSTANCIAR MARCADOR
=================================
*/
var user = 0;
var cpu = 0;
$(document).ready(function(){
	/*
	=================================
	RELLENAR ARRAY
	=================================
	*/	
	for(var x = 0; x < 3; x++){
		for(var y = 0; y < 3; y++){

			casillas[x][y] = -1;
		}
	}

	$(".casilla").on('click', function(){

		$(this).append("<span class='fa fa-times fa-5x' aria-hidden='true' style='color: #0086b3;'></span>");
		$(this).css("pointer-events", "none");
		var cordenada = $(this).attr('value');
		/*
		========================================
		CAMBIAR VALOR DE CASILLA SELECCIONADA 
		========================================
		*/	
		switch(cordenada){
			case '0':
				casillas[0][0] = 0;
				break;
			case '1':
				casillas[0][1] = 0;
				break;
			case '2':
				casillas[0][2] = 0;
				break;
			case '3':
				casillas[1][0] = 0;
				break;
			case '4':
				casillas[1][1] = 0;
				break;
			case '5':
				casillas[1][2] = 0;
				break;
			case '6':
				casillas[2][0] = 0;
				break;
			case '7':
				casillas[2][1] = 0;
				break;
			case '8':
				casillas[2][2] = 0;
				break;

		}
		
		if(empate() === true){

			$("#winner-message").empty();
			$("#winner-message").append("EMPATE");
			$("#winner-message").slideDown();
			$("#winner-message").delay(1000);
			$("#winner-message").slideUp();
			$(".casilla").css("pointer-events", "none");
		}
		//FUNCION CPU
		turnoMaquina();
		/*
		=================================
		REVISAR ESTADO DEL JUEGO
		=================================
		*/
		var empate2 = empate();
		var result = ganador();
		//JUGADOR GANO
		if(result === 0){

			user++;
			$(".casilla").css("pointer-events", "none");
			$(".userWin").empty();
			$(".userWin").append(user);
			$("#winner-message").empty();
			$("#winner-message").append("GANASTE");
			$("#winner-message").slideDown();
			$("#winner-message").delay(1000);
			$("#winner-message").slideUp();
		//MAQUINA GANO
		} else if(result === 1){

			cpu++;
			$(".casilla").css("pointer-events", "none");
			$(".iaWin").empty();
			$(".iaWin").append(cpu);
			$("#winner-message").empty();
			$("#winner-message").append("PERDISTE");
			$("#winner-message").slideDown();
			$("#winner-message").delay(1000);
			$("#winner-message").slideUp();
		}
		/*console.log(casillas[0][0]+' | '+casillas[0][1]+' | '+casillas[0][2]);
		console.log(casillas[1][0]+' | '+casillas[1][1]+' | '+casillas[1][2]);
		console.log(casillas[2][0]+' | '+casillas[2][1]+' | '+casillas[2][2]+'\n');*/
			
	});
	/*
	=================================
	JUEGO NUEVO
	=================================
	*/	
	$("#new-game").on('click', function(){
		/*
		=================================
		RESETAR TABLERO
		=================================
		*/	
		for(var x = 0; x < 3; x++){
			for(var y = 0; y < 3; y++){

				casillas[x][y] = -1;
			}
		}

		$(".casilla").css("pointer-events", "inherit");
		$(".casilla span").remove();

	});

});
/*
=================================
VERIFICAR GANADOR
=================================
*/	
function ganador(){

	var v = -1;
	/*
	=================================
	EN DIAGONAL \
	=================================
	*/
	if(casillas[0][0] != -1){

		if(casillas[0][0] === casillas[0][0] && casillas[1][1] === casillas[0][0] && casillas[2][2] === casillas[0][0]){
			//COMPROBAR GANADOR 0 -> USER, 1 -> PC
			if(casillas[0][0] === 0){
				v = 0;
			} else{
				v = 1;
			}
			return v;
		}
	}
	/*
	=================================
	EN DIAGONAL INVERTIDA /
	=================================
	*/
	if(casillas[0][2] != -1){

		if(casillas[0][2] === casillas[0][2] && casillas[1][1] === casillas[0][2] && casillas[2][0] === casillas[0][2]){
			//COMPROBAR GANADOR 0 -> USER, 1 -> PC
			if(casillas[0][2] === 0){
				v = 0;
			} else{
				v = 1;
			}
			return v;
		}
	}
	/*
	=================================
	FILAS DE IZQ A DER ---
	=================================
	*/
	for(var x = 0; x < 3; x++){
		if(casillas[x][0] != -1){
			if(casillas[x][0] === casillas[x][0] && casillas[x][1] === casillas[x][0] && casillas[x][2] === casillas[x][0]){
				//COMPROBAR GANADOR 0 -> USER, 1 -> PC
				if(casillas[x][0] === 0){
					v = 0;
				} else{
					v = 1;
				}
				return v;
			}
		}
	}
	/*
	=================================
	COLUMNAS DE ARRIBA A ABAJO |
	=================================
	*/
	for(var x = 0; x < 3; x++){
		if(casillas[0][x] != -1){
			if(casillas[0][x] === casillas[0][x] && casillas[1][x] === casillas[0][x] && casillas[2][x] === casillas[0][x]){
				//COMPROBAR GANADOR 0 -> USER, 1 -> PC
				if(casillas[0][x] === 0){
					v = 0;
				} else{
					v = 1;
				}
				return v;
			}
		}
	}
	/*
	=================================
	RETORNA ESTADO DEL JUEGO
	=================================
	*/
	return v;	
}
/*
=================================
COMPROBAR SI HUBO EMPATE
=================================
*/
function empate(){
	//RECORRER TABLERO EN BUSCA DE EMPATE
	var v = true;
	for(var x = 0; x < 3; x++){
		for(var y = 0; y < 3; y++){
			if(casillas[x][y] === -1){
				v = false;
			}
		}
	}
	return v;
}
/*
=================================
LOGICA CPU
=================================
*/
function turnoMaquina(){
	
	var cordenadas;
	var x = null;
	var y = null;

	if(cordenadas = ganar() != false){
		cordenadas = ganar();
	} else if(cordenadas = bloquear() != false){
		cordenadas = bloquear();
	} else{
		cordenadas = insertar();
	}

	x = cordenadas[0];
	y = cordenadas[1];
	casillas[x][y] = 1;	

	var num;
	if(x === 0 && y === 0){
		num = '0';
	} else if(x === 0 && y === 1){
		num = '1';	
	} else if(x === 0 && y === 2){
		num = '2';	
	} else if(x === 1 && y === 0){
		num = '3';	
	} else if(x === 1 && y === 1){
		num = '4';	
	} else if(x === 1 && y === 2){
		num = '5';	
	} else if(x === 2 && y === 0){
		num = '6';	
	} else if(x === 2 && y === 1){
		num = '7';	
	} else if(x === 2 && y === 2){
		num = '8';	
	}
	
	$("[value ="+num+"]").append("<span class='fa fa-circle-o fa-5x' aria-hidden='true' style='color: #e60000;'></span>");
	$("[value ="+num+"]").css("pointer-events", "none");

}
/*
============================================
INSERTAR DATO EN PRIMERA CASILLA DISPONIBLE
============================================
*/
function insertar(){
	//BUSCAR CASILLAS VACIAS EN EL TABLERO
	for(var x = 0; x < 3; x++){
		for(var y = 0; y < 3; y++){
			if(casillas[x][y] === -1){
				return [x,y];
			}
		}		
	}
}
/*
=================================
ALGORITMO BLOQUEAR JUGADOR
=================================
*/
function bloquear(){
	//PIERDE CPU -> BLOQUEAR PLAYER
	var x = null;
	var y = null;
	//FILA #1
	if(casillas[0][0] === 0  && casillas[0][1] === 0 && casillas[0][2] === -1){
		x = 0;
		y = 2;
	} else if(casillas[0][0] === 0  && casillas[0][2] === 0 && casillas[0][1] === -1){
		x = 0;
		y = 1;
	} else if(casillas[0][1] === 0  && casillas[0][2] === 0 && casillas[0][0] === -1){
		x = 0;
		y = 0;
	}
	//FILA #2 
	else if(casillas[1][0] === 0  && casillas[1][1] === 0 && casillas[1][2] === -1){
		x = 1;
		y = 2;
	} else if(casillas[1][0] === 0  && casillas[1][2] === 0 && casillas[1][1] === -1){
		x = 1;
		y = 1;
	} else if(casillas[1][1] === 0  && casillas[1][2] === 0 && casillas[1][0] === -1){
		x = 1;
		y = 0;
	}
	//FILA #3
	else if(casillas[2][0] === 0  && casillas[2][1] === 0 && casillas[2][2] === -1){
		x = 2;
		y = 2;
	} else if(casillas[2][0] === 0  && casillas[2][2] === 0 && casillas[2][1] === -1){
		x = 2;
		y = 1;
	} else if(casillas[2][1] === 0  && casillas[2][2] === 0 && casillas[2][0] === -1){
		x = 2;
		y = 0;
	}
	//COLUMNA #1
	else if(casillas[0][0] === 0  && casillas[1][0] === 0 && casillas[2][0] === -1){
		x = 2;
		y = 0;
	} else if(casillas[0][0] === 0  && casillas[2][0] === 0 && casillas[1][0] === -1){
		x = 1;
		y = 0;
	} else if(casillas[1][0] === 0  && casillas[2][0] === 0 && casillas[0][0] === -1){
		x = 0;
		y = 0;
	}
	//COLUMNA #2
	else if(casillas[0][1] === 0  && casillas[1][1] === 0 && casillas[2][1] === -1){
		x = 2;
		y = 1;
	} else if(casillas[0][1] === 0  && casillas[2][1] === 0 && casillas[1][1] === -1){
		x = 1;
		y = 1;
	} else if(casillas[1][1] === 0  && casillas[2][1] === 0 && casillas[0][1] === -1){
		x = 0;
		y = 1;
	}
	//COLUMNA #3
	else if(casillas[0][2] === 0  && casillas[1][2] === 0 && casillas[2][2] === -1){
		x = 2;
		y = 2;
	} else if(casillas[0][2] === 0  && casillas[2][2] === 0 && casillas[1][2] === -1){
		x = 1;
		y = 2;
	} else if(casillas[1][2] === 0  && casillas[2][2] === 0 && casillas[0][2] === -1){
		x = 0;
		y = 2;
	}
	//DIAGONAl \
	else if(casillas[0][0] === 0  && casillas[1][1] === 0 && casillas[2][2] === -1){
		x = 2;
		y = 2;
	} else if(casillas[0][0] === 0  && casillas[2][2] === 0 && casillas[1][1] === -1){
		x = 1;
		y = 1;
	} else if(casillas[1][1] === 0  && casillas[2][2] === 0 && casillas[0][0] === -1){
		x = 0;
		y = 0;
	}
	//DIAGONAl INVERTIDA /
	else if(casillas[0][2] === 0  && casillas[1][1] === 0 && casillas[2][0] === -1){
		x = 2;
		y = 0;
	} else if(casillas[0][2] === 0  && casillas[2][0] === 0 && casillas[1][1] === -1){
		x = 1;
		y = 1;
	} else if(casillas[1][1] === 0  && casillas[2][0] === 0 && casillas[0][2] === -1){
		x = 0;
		y = 2;
	}

	if(x === null){

		return false;
	} else{

		return [x,y];	
	}
}
/*
=================================
ALGORITMO GANAR PARTIDA
=================================
*/
function ganar(){
	//PIERDE PLAYER -> GANAR
	var x = null;
	var y = null;
	//FILA #1
	if(casillas[0][0] === 1  && casillas[0][1] === 1 && casillas[0][2] === -1){
		x = 0;
		y = 2;
	} else if(casillas[0][0] === 1  && casillas[0][2] === 1 && casillas[0][1] === -1){
		x = 0;
		y = 1;
	} else if(casillas[0][1] === 1  && casillas[0][2] === 1 && casillas[0][0] === -1){
		x = 0;
		y = 0;
	}
	//FILA #2 
	else if(casillas[1][0] === 1  && casillas[1][1] === 1 && casillas[1][2] === -1){
		x = 1;
		y = 2;
	} else if(casillas[1][0] === 1  && casillas[1][2] === 1 && casillas[1][1] === -1){
		x = 1;
		y = 1;
	} else if(casillas[1][1] === 1  && casillas[1][2] === 1 && casillas[1][0] === -1){
		x = 1;
		y = 0;
	}
	//FILA #3
	else if(casillas[2][0] === 1  && casillas[2][1] === 1 && casillas[2][2] === -1){
		x = 2;
		y = 2;
	} else if(casillas[2][0] === 1  && casillas[2][2] === 1 && casillas[2][1] === -1){
		x = 2;
		y = 1;
	} else if(casillas[2][1] === 1  && casillas[2][2] === 1 && casillas[2][0] === -1){
		x = 2;
		y = 0;
	}
	//COLUMNA #1
	else if(casillas[0][0] === 1  && casillas[1][0] === 1 && casillas[2][0] === -1){
		x = 2;
		y = 0;
	} else if(casillas[0][0] === 1  && casillas[2][0] === 1 && casillas[1][0] === -1){
		x = 1;
		y = 0;
	} else if(casillas[1][0] === 1  && casillas[2][0] === 1 && casillas[0][0] === -1){
		x = 0;
		y = 0;
	}
	//COLUMNA #2
	else if(casillas[0][1] === 1  && casillas[1][1] === 1 && casillas[2][1] === -1){
		x = 2;
		y = 1;
	} else if(casillas[0][1] === 1  && casillas[2][1] === 1 && casillas[1][1] === -1){
		x = 1;
		y = 1;
	} else if(casillas[1][1] === 1  && casillas[2][1] === 1 && casillas[0][1] === -1){
		x = 0;
		y = 1;
	}
	//COLUMNA #3
	else if(casillas[0][2] === 1  && casillas[1][2] === 1 && casillas[2][2] === -1){
		x = 2;
		y = 2;
	} else if(casillas[0][2] === 1  && casillas[2][2] === 1 && casillas[1][2] === -1){
		x = 1;
		y = 2;
	} else if(casillas[1][2] === 1  && casillas[2][2] === 1 && casillas[0][2] === -1){
		x = 0;
		y = 2;
	}
	//DIAGONAl \
	else if(casillas[0][0] === 1  && casillas[1][1] === 1 && casillas[2][2] === -1){
		x = 2;
		y = 2;
	} else if(casillas[0][0] === 1  && casillas[2][2] === 1 && casillas[1][1] === -1){
		x = 1;
		y = 1;
	} else if(casillas[1][1] === 1  && casillas[2][2] === 1 && casillas[0][0] === -1){
		x = 0;
		y = 0;
	}
	//DIAGONAl INVERTIDA /
	else if(casillas[0][2] === 1  && casillas[1][1] === 1 && casillas[2][0] === -1){
		x = 2;
		y = 0;
	} else if(casillas[0][2] === 1  && casillas[2][0] === 1 && casillas[1][1] === -1){
		x = 1;
		y = 1;
	} else if(casillas[1][1] === 1  && casillas[2][0] === 1 && casillas[0][2] === -1){
		x = 0;
		y = 2;
	}
	if(x === null){

		return false;
	} else{

		return [x,y];	
	}
	
}
