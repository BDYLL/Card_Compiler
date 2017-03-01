var palabras = [
	"class",
	"program",
	"void",
	"if",
	"while",
	"for",
	"iterate",
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
	"isNotSpades",
	"{",
	"}",
	"(",
	")",
	"<",
	">",
	"<=",
	">=",
	"==",
	"!="];

var globalTokens = [];

function testText() {
	var code = document.getElementById("codeArea").value;
	checkCode(code);
	program();
}


function checkCode(code) {
	var correct = true;

	var tmpStr = code;


	tmpStr = tmpStr.replace(/\{/g, " { ");
	tmpStr = tmpStr.replace(/\}/g, " } ");
	tmpStr = tmpStr.replace(/\(/g, " ( ");
	tmpStr = tmpStr.replace(/\)/g, " ) ");
	tmpStr = tmpStr.replace(/\<[^\=]/g, " < ");
	tmpStr = tmpStr.replace(/\>[^\=]/g, " > ");
	tmpStr = tmpStr.replace(/\<\=/g, " <= ");
	tmpStr = tmpStr.replace(/\>\=/g, " >= ");
	tmpStr = tmpStr.replace(/\=\=/g, " == ");
	tmpStr = tmpStr.replace(/\!\=/g, " != ");

	console.log(tmpStr);

	globalTokens = tmpStr.replace(/[\n\r\t]/g, " ").split(" ");


	globalTokens = globalTokens.filter(e => e !== "");


	var i, j;
	for (i = 0; i < globalTokens.length; i++) {
		correct = checkToken(globalTokens[i]);
		if (!correct) {
			break;
		}
	}
	let consoleMessage;
	console.log(globalTokens);
	if (correct) {
		console.log("El código es correcto!");

		consoleMessage = "<span class=\"consoleCorrect\"> No Errors Detected </span><br><br>";
		document.getElementById("consoleText").innerHTML += consoleMessage;

		program();
	}
	else {
		console.log("El código NO es correcto!");
		consoleMessage = "<span class=\"consoleError\"> Invalid Token in line " + getRow(code, globalTokens[i]) + ": " + globalTokens[i] + " </span><br><br>";
		document.getElementById("consoleText").innerHTML += consoleMessage;
	}
}
function getRow(code, token) {
	let codeInRows = code.split("\n");
	for (i = 0; i < codeInRows.length; i++) {
		if (codeInRows[i].includes(token)) {
			console.log(i);
			return i + 1;
		}
	}
	console.log("yu wut m8");
	return -1;
}
function checkToken(token) {
	var i;


	if (token.match(/^[a-z]+$/i) != null || token.match(/^[0-9]+$/) != null) {
		return true;
	}

	/*for(i=0; i<palabras.length; i++){
		if (token.localeCompare(palabras[i]) === 0){
			console.log(token+" es parte de las palabras reservadas!");
			return true;				
		}
	}
	*/

	i = palabras.indexOf(token);
	console.log(token);

	//console.log(token+" NO es parte de las palabras reservadas!");
	return i >= 0;
}

function error(token, expected) {

}

function program() {
	if (exigir("class")) {
		if (exigir("program")) {
			if (exigir("{")) {
				functions();
				mainFunction();
				if (!exigir("}")) {

				}
			}
		}
	}
}

function functions() {
	if (verificar("void")) {
		_function();
		functionAlpha();
	}
}

function _function() {
	if (exigir("void")) {
		if (exigir(globalTokens[0])) {
			if (exigir("(")) {
				if (exigir(")")) {
					if (exigir("{")) {
						body();
						if (!exigir("}")) {

						}
					}
				}
			}
		}
	}
}

function functionAlpha() {
	if (verificar("void")) {
		functions();
	}
}

function mainFunction() {
	if (exigir("program")) {
		if (exigir("(")) {
			if (exigir(")")) {
				if (exigir("{")) {
					body();
					if (!exigir("}")) {
					}
				}
			}
		}
	}
}

function body() {
	if (verificar("flip")) {
		if (!exigir("flip")) {
		}
	}
	else if (verificar("getCard")) {
		exigir("getCard");
		callFunction();
	}
	else if (verificar("putCard")) {
		exigir("putCard");
		callFunction();
	}
	else if (verificar("if")) {

	}
	else if (verificar("while")) {

	}
	else if (verificar("iterate")) {

	}
	else if (verificarFunctionName(globalTokens[0])) {

	}
	else {

	}
	bodyAlpha();
}

function ifexpression() {
	if (exigir("if")) {
		if (exigir("(")) {
			conditional();
			if (exigir(")")) {
				if (exigir(")")) {
					if (exigir("{")) {
						body();
						if (exigir("}")) {
							if (verificar("else")) {
								if (exigir("else")) {
									if (exigir("{")) {
										body();
										if (!exigir("}")) {
											console.log("error");
										}
									}
								}
								else {
									console.log("error");
								}
							}
							else {
								console.log("error");
							}
						}
						else {
							console.log("error");
						}
					}
					else {
						console.log("error");
					}
				}
				else {
					console.log("error");
				}
			}
			else {
				console.log("error");
			}
		}
		else {
			console.log("error");
		}
	}
	else {
		console.log("error");
	}
}

function whileExpression() {

}

function iterateExpression() {

}

function callFunction() {
	if (exigir("(")) {
		if (exigirNumero(globalTokens[0])) {
			if (!exigir(")")) {

			}
		}
	}
}

function bodyAlpha() {
	if (verificarFunctionName(globalTokens[0])) {
		body();
	}
}

function exigir(token) {
	if (token === globalTokens[0]) {
		globalTokens.splice(0, 1);
		return true;
	}
	return false;
}

function verificar(token) {
	return token === globalTokens[0];
}

function exigirFunctionName(token) {
	if (token.match(/^[a-z]+$/i)) {
		globalTokens.splice(0, 1);
		return true;
	}
	return false;
}

function verificarFunctionName(token) {
	return token.match(/^[a-z]+$/i);
}

function exigirNumero(token) {
	return token.match(/^[0-9]+$/);
}

$(function () {
	$(".lined").linedtextarea({
		selectedLine: 1
	}
	);
});