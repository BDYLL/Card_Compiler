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
var TokensLine = [];
var currentToken;
var correctCode;

function testText() {
	var code = document.getElementById("codeArea").value;
	checkCode(code);
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
	getRowsPerToken(code);
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
		correctCode = true;
		currentToken = 0;
		program();
		if(correctCode){
			consoleMessage = "<span class=\"consoleCorrect\"> No Errors Detected </span><br><br>";
			document.getElementById("consoleText").innerHTML += consoleMessage;
		}



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
function getRowsPerToken(code){
	TokensLine = [];
	let tmpStr;
	let rowTokens;
	let codeInRows = code.split("\n");
	for(let i = 0; i < codeInRows.length; i++){
		rowTokens = [];
		tmpStr = codeInRows[i];
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
		rowTokens = tmpStr.replace(/[\n\r\t]/g, " ").split(" ");
		rowTokens = rowTokens.filter(e => e !== "");
		for(let j = 0; j < rowTokens.length; j++){
			TokensLine.push(i+1);

		}

	}
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

function error(expected) {
	console.log("Error in Line " + TokensLine[currentToken] +". Expected '"+ expected +"' instead of '" + globalTokens[0] + "'.");
	correctCode = false;
	consoleMessage = "<span class=\"consoleError\"> Error in Line "+ TokensLine[currentToken] +". Expected "+expected+" instead of '" + globalTokens[0]   +"'. </span><br><br>";
	document.getElementById("consoleText").innerHTML += consoleMessage;
}

function program() {
	if (exigir("class")) {
		if (exigir("program")) {
			if (exigir("{")) {
				functions();
				mainFunction();
				if (!exigir("}")) {
					error("}");
				}
			}else{
				error("{");
			}
		}else{
			error("program");
		}
	}else{
		error("class");
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
		if (exigirFunctionName(globalTokens[0])) {
			if (exigir("(")) {
				if (exigir(")")) {
					if (exigir("{")) {
						body();
						if (!exigir("}")) {
							error("}");
						}
					}else{
						error("{");
					}
				}else{
					error(")");
				}
			}else{
				error("(");
			}
		}else{
			error("valid function name")
		}
	}else{
		error("void");
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
						error("}");
					}
				}else{
					error("{");
				}
			}else{
				error(")");
			}
		}else{
			error("(");
		}
	}else{
		error("program");
	}
}

function body() {
	if (verificar("flip")) {
		exigir("flip");
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
		ifexpression();
	}
	else if (verificar("while")) {
		whileExpression();
	}
	else if (verificar("iterate")) {
		iterateExpression();
	}
	else if (verificarFunctionName(globalTokens[0])) {
		exigirFunctionName(globalTokens[0]);
	}
	else {
		error("expression in body");
	}
	bodyAlpha();
}

function customerFunctionExpression() {
	if (exigirFunctionName(globalTokens[0])) {
		if (exigir("(")) {
			if (exigir(")")) {
				if (exigir("{")) {
					body();
					if (!exigir("}")) {
						error("}");
					}
				}else{
					error("{");
				}
			}else{
				error(")");
			}
		}else{
			error("(");
		}
	}else{
		error("valid function name");
	}
}

function ifexpression() {
	if (exigir("if")) {
		if (exigir("(")) {
			conditional();
			if (exigir(")")) {
				if (exigir("{")) {
					body();
					if (exigir("}")) {
						if (verificar("else")) {
							if (exigir("else")) {
								if (exigir("{")) {
									body();
									if (!exigir("}")) {
										error("}");
									}
								}else{
									error("{");
								}
							}
							else {
								error("else");
							}
						}
					}
					else {
						error("}");
					}
				}
				else {
					error("{");
				}

			}
			else {
				error(")");
			}
		}
		else {
			error("(");
		}
	}
	else {
		error("if")
	}
}

function whileExpression() {
	if (exigir("while")) {
		if (exigir("(")) {
			conditional();
			if (exigir(")")) {
				if(exigir("{")){
					body();
					if(!exigir("}")){
						error("}");
					}
				}else{
					error("{");
				}
			}else{
				error(")");
			}
		} else {
			error("(");
		}
	} else {
		error("while");
	}
}

function iterateExpression() {
	if (exigir("iterate")) {
		if (exigir("(")) {
			if (exigirNumero(globalTokens[0])) {
				if (exigir(")")) {
					if (exigir("{")) {
						body();
						if (!exigir("}")) {
							error("}");
						}
					}else{
						error("{");
					}
				}else{
					error(")");
				}
			}else{
				error("valid number");
			}
		}else{
			error("(");
		}
	}else{
		error("iterate");
	}
}

function callFunction() {
	if (exigir("(")) {
		if (exigirNumero(globalTokens[0])) {
			if (!exigir(")")) {
				error(")");
			}
		}else{
			error("Valid number");
		}
	}else{
		error("(");
	}
}

function bodyAlpha() {
	if (verificarFunctionName(globalTokens[0])) {
		body();
	}
}

//conditional
function conditional() {
	if (simpleCondition()) {
		//si entra es correcto y no se hace nada
	} else if (verificar("VALUE")) {
		exigir("VALUE");
		operator();
		if (!exigirNumero(globalTokens[0])) { error("valid number"); }
	} else if (verificar("isEmpty")) {
		exigir("isEmpty");
		callFunction();
	} else if (verificar("isNotEmpty")) {
		exigir("isNotEmpty");
		callFunction();
	} else {
		error("valid conditional");
	}
}
function simpleCondition() {
	if (verificar("isRed")) {
		exigir("isRed");
		return true;
	}
	else if (verificar("isBlack")) {
		exigir("isBlack");
		return true;
	}
	else if (verificar("isHeart")) {
		exigir("isHeart");
		return true;
	}
	else if (verificar("isClubs")) {
		exigir("isClubs");
		return true;
	}
	else if (verificar("isDiamond")) {
		exigir("isDiamond");
		return true;
	}
	else if (verificar("isSpades")) {
		exigir("isSpades");
		return true;
	}
	else if (verificar("isNotRed")) {
		exigir("isNotRed");
		return true;
	}
	else if (verificar("isNotBlack")) {
		exigir("isNotBlack");
		return true;
	}
	else if (verificar("isNotHeart")) {
		exigir("isNotHeart");
		return true;
	}
	else if (verificar("isNotClubs")) {
		exigir("isNotClubs");
		return true;
	}
	else if (verificar("isNotDiamond")) {
		exigir("isNotDiamond");
		return true;
	}
	else if (verificar("isNotSpades")) {
		exigir("isNotSpades");
		return true;
	} else {
		return false;
	}
}
function operator() {
	if (verificar("<")) {
		exigir("<");
	}
	else if (verificar(">")) {
		exigir(">");
	}
	else if (verificar("<=")) {
		exigir("<=");
	}
	else if (verificar(">=")) {
		exigir(">=");
	}
	else if (verificar("==")) {
		exigir("==");
	}
	else if (verificar("!=")) {
		exigir("!=");
	}
	else {
		error("valid operator");
	}
}
function exigir(token) {
	if (token === globalTokens[0]) {
		globalTokens.splice(0, 1);
		currentToken++;
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
		currentToken++;
		return true;
	}
	return false;
}

function verificarFunctionName(token) {
	return token.match(/^[a-z]+$/i);
}

function exigirNumero(token) {
	if (token.match(/^[0-9]+$/)) {
		globalTokens.splice(0, 1);
		currentToken++;
		return true;
	}
	return false;
}

function verificarNumero(token) {
	return token.match(/^[0-9]+$/);
}

$(function () {
	$(".lined").linedtextarea({
		selectedLine: 1
	}
	);
});
