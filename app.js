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

			globalTokens = code.replace( /[\n\r\t]/g," ").split(" ");	

			globalTokens=globalTokens.filter(e=>e!=="");


			var i, j;		
			for(i=0; i<globalTokens.length; i++){
				correct = checkToken(globalTokens[i]);
				if(!correct){
					break;
				}
			}
            let consoleMessage;
			console.log(globalTokens);
			if (correct){
				console.log("El código es correcto!");
                
				consoleMessage = "<span class=\"consoleCorrect\"> No Errors Detected </span><br><br>";
                document.getElementById("consoleText").innerHTML += consoleMessage;
                
				program();
			}
			else{
				console.log("El código NO es correcto!");
                consoleMessage = "<span class=\"consoleError\"> Invalid Token in line "+ getRow(code, globalTokens[i]) + ": "+ globalTokens[i] +" </span><br><br>";
                document.getElementById("consoleText").innerHTML += consoleMessage;
			}
		}
        function getRow(code, token){
            let codeInRows = code.split("\n");
            for(i = 0; i < codeInRows.length; i++){
                if(codeInRows[i].includes(token)){
                    console.log(i);
                    return i+1;
                }
            }
            console.log("yu wut m8");
            return -1;
        }
		function checkToken(token){
			var i;


			if(token.match(/^[a-z]+$/i)!=null || token.match(/^[0-9]+$/)!=null){
				return true;
			}

			/*for(i=0; i<palabras.length; i++){
				if (token.localeCompare(palabras[i]) === 0){
					console.log(token+" es parte de las palabras reservadas!");
					return true;				
				}
			}
			*/

			i=palabras.indexOf(token);
			console.log(token);

			//console.log(token+" NO es parte de las palabras reservadas!");
			return i>=0;
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
				mainFunction();
				if(!exigir("}")){

				}
			}
		}
	}
}

function functions(){

}

function mainFunction(){
	
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