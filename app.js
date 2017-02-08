
		var palabras = ["class program","void","program()","if","else","while","iterate"
						,"valor", "isRed", "isBlack",
						"is1", "is2", "is3", "is4", "is5", "is6", "is7",
  						"is8", "is9", "is10", "is11", "is12", "is13",
  						"isCorazon","isTrebol","isDiamante","isPica",
  						"perteneceA","isFaceUp","hasCards"];

		function testText(){
			var code = document.getElementById("codeArea").value;
			checkCode(code);
		}

		function checkCode(code){
			var correct = true;
			var tokens = code.replace( /\n/, " " ).split(" ");		
			var i, j;		
			for(i=0; i<tokens.length-1; i++){
				correct = checkToken(tokens[i]);
				if(correct == false){
					break;
				}
			}
			if (correct){
				console.log("El código es correcto!");
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



$(function() {
	$(".lined").linedtextarea({
		selectedLine: 1}
	);
});