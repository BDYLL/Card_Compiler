var palabras = ["class",
						"program", 
						"void", 
						"if", 
						"while", 
						"for", 
						"else",
						"flip", 
						"getCard", 
						"flipCard", 
						"putCard", 
						"isBlack", 
						"isHeart",
						"isClubs",
					  	"isDiamond",
					    "isSpades",
					    "isNotRed",
					    "isNotBlack",
					    "isNotHeart",
					    "isNotClubs",
					    "isNotDiamond",
					    "isNotSpades","{","}","(",")"];

var globalTokens = [];					

		function testText(){
			var code = document.getElementById("codeArea").value;
			checkCode(code);
			program();
		}

		function checkCode(code){
			var correct = true;
			globalTokens = code.replace( /\n/, " " ).split(" ");		
			var i, j;		
			for(i=0; i<globalTokens.length-1; i++){
				correct = checkToken(globalTokens[i]);
				if(correct == false){
					break;
				}
			}
			if (correct){
				console.log("El código es correcto!");
				program();
			}
			else{
				console.log("El código NO es correcto!")
			}
		}

		function checkToken(token){
			var i;
			for(i=0; i<palabras.length; i++){
				if (token.localeCompare(palabras[i]) == 0){
					console.log(token+" es parte de las palabras reservadas!");
					return true;				
				}
			}
			console.log(token+" NO es parte de las palabras reservadas!");
			return false;
		}

function error(token, expected){

}

function program(){
	if(exigir("class")){
		if(exigir("program")){
			if(exigir("{")){
				if(verificar("void")){
					functions();
				}
				main_function();
				if(!exigir("}")){

				}
			}
		}
	}
}

function functions(){

}

function exigir(token){
	if(token===globalTokens[0]){
		globalTokens.splice(0,1);
		return true;
	}
	return false;
}

function verificar(token){
	return token===globalTokens[0];
}


$(function() {
	$(".lined").linedtextarea({
		selectedLine: 1}
	);
});