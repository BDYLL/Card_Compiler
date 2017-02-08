
		var palabras = ["alo","xD"];

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