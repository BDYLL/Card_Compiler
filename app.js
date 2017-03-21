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

var IF = -1;
var WHILE = -2;
var ITERATE = -3;
var RETURN = -4;
var INICIOPROG = -5;
var FIN = -6;
var JMP = -7;
var CALL = -8;
var FLIP=-9;
var GETCARD=-10;
var PUTCARD=-11;

var ISBLACK=-12;
var ISRED=-28;
var ISHEART=-13;
var ISCLUBS=-14;
var ISDIAMOND=-15;
var ISSPADES=-16;
var ISNOTBLACK=-17;
var ISNOTRED=-29;
var ISNOTHEART=-18;
var ISNOTCLUBS=-19;
var ISNOTDIAMOND=-20;
var ISNOTSPADES=-21;

var LESSTHAN=-22;
var GREATERTHAN=-23;
var LESSOREQUAL=-24;
var GREATEROREQUAL=-25;
var EQUAL=-26;
var DIFFERENT=-27;

var ISEMPTY=-30;
var ISNOTEMPTY=-31;

var VALUE=-32;

var codIntermedio = [];
var stack = [];
var i = 0;

var funcTable=[];

var nextFunction=-33;

function testText() {
	var code = document.getElementById("codeArea").value;
	codIntermedio=[];
	stack=[];
	i=0;
	funcTable=[];
	nextFunction=-33;
	globalTokens=[];
	TokensLine=[];
	checkCode(code);
}

function clearText(){
	document.getElementById("consoleText").innerHTML = "";
	document.getElementById("consoleText").innerHTML = "Esta es la consola, donde apareceran errores en el codigo al momento de ejecutarse: <br>";
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
		if (correctCode) {
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
function getRowsPerToken(code) {
	TokensLine = [];
	let tmpStr;
	let rowTokens;
	let codeInRows = code.split("\n");
	for (let i = 0; i < codeInRows.length; i++) {
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
		for (let j = 0; j < rowTokens.length; j++) {
			TokensLine.push(i + 1);

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
	console.log("Error in Line " + TokensLine[currentToken] + ". Expected '" + expected + "' instead of '" + globalTokens[0] + "'.");
	correctCode = false;
	consoleMessage = "<span class=\"consoleError\"> Error in Line " + TokensLine[currentToken] + ". Expected " + expected + " instead of '" + globalTokens[0] + "'. </span><br><br>";
	document.getElementById("consoleText").innerHTML += consoleMessage;
}

function printIntermediateCode(){
	var line=0;
	codIntermedio.forEach(cell=>{
        switch(cell){
            case IF:
                console.log(line+" : "+"IF");
                break;
            case WHILE:
                console.log(line+" : "+"WHILE");
                break;
            case ITERATE:
                console.log(line+" : "+"ITERATE");
                break;
            case RETURN:
                console.log(line+" : "+"RETURN");
                break;
            case INICIOPROG:
                console.log(line+" : "+"INICIOPROG");
                break;
            case FIN:
                console.log(line+" : "+"FIN");
                break;
            case JMP:
                console.log(line+" : "+"JMP");
                break;
            case CALL:
                console.log(line+" : "+"CALL");
                break;
            case FLIP:
                console.log(line+" : "+"FLIP");
                break;
            case GETCARD:
                console.log(line+" : "+"GETCARD");
                break;
            case PUTCARD:
                console.log(line+" : "+"PUTCARD");
                break;
            case ISBLACK:
                console.log(line+" : "+"ISBLACK");
                break;
            case ISRED:
                console.log(line+" : "+"ISRED");
                break;
            case ISHEART:
                console.log(line+" : "+"ISHEART");
                break;
            case ISCLUBS:
                console.log(line+" : "+"ISCLUBS");
                break;
            case ISDIAMOND:
                console.log(line+" : "+"ISDIAMOND");
                break;
            case ISSPADES:
                console.log(line+" : "+"ISSPADES");
                break;
            case ISNOTBLACK:
                console.log(line+" : "+"ISNOTBLACK");
                break;
            case ISNOTRED:
                console.log(line+" : "+"ISNOTRED");
                break;
            case ISNOTHEART:
                console.log(line+" : "+"ISNOTHEART");
                break;
            case ISNOTCLUBS:
                console.log(line+" : "+"ISNOTCLUBS");
                break;
            case ISNOTDIAMOND:
                console.log(line+" : "+"ISNOTDIAMOND");
                break;
            case ISNOTSPADES:
                console.log(line+" : "+"ISNOTSPADES");
                break;
            case LESSTHAN:
                console.log(line+" : "+"LESSTHAN");
                break;
            case GREATERTHAN:
                console.log(line+" : "+"GREATERTHAN");
                break;
            case LESSOREQUAL:
                console.log(line+" : "+"LESSOREQUAL");
                break;
            case GREATEROREQUAL:
                console.log(line+" : "+"GREATEROREQUAL");
                break;
            case EQUAL:
                console.log(line+" : "+"EQUAL");
                break;
            case DIFFERENT:
                console.log(line+" : "+"DIFFERENT");
                break;
            case ISEMPTY:
                console.log(line+" : "+"ISEMPTY");
                break;
            case ISNOTEMPTY:
                console.log(line+" : "+"ISNOTEMPTY");
                break;
            case VALUE:
                console.log(line+" : "+"VALUE");
                break;
            default:
                if(cell<=-33){
                    console.log(line+" : "+funcTable.filter(f=>f.functionNumber===cell)[0].name);
                }
                else{
                    console.log(line+" : "+cell);
                }
                break;
        }
        line++;

	});
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
			} else {
				error("{");
			}
		} else {
			error("program");
		}
	} else {
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
		var tmpStr=globalTokens[0];
		if (exigirFunctionName(globalTokens[0])) {
            codIntermedio[i]=nextFunction;
			var newFunc={
				name:tmpStr,
				index:i,
				functionNumber:nextFunction
			}
			i++;
			nextFunction--;
			funcTable.push(newFunc);
			if (exigir("(")) {
				if (exigir(")")) {
					if (exigir("{")) {
						body();
						if (!exigir("}")) {
							error("}");
						}
						codIntermedio[i++]=RETURN;
					} else {
						error("{");
					}
				} else {
					error(")");
				}
			} else {
				error("(");
			}
		} else {
			error("valid function name")
		}
	} else {
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
					//codIntermedio.forEach(s=>console.log(s));

					printIntermediateCode();

				} else {
					error("{");
				}
			} else {
				error(")");
			}
		} else {
			error("(");
		}
	} else {
		error("program");
	}
}

function body() {
	if (verificar("flip")) {
		exigir("flip");
        codIntermedio[i++]=FLIP;
	}
	else if (verificar("getCard")) {
		exigir("getCard");
        codIntermedio[i++]=GETCARD;
		callFunction();
	}
	else if (verificar("putCard")) {
		exigir("putCard");
        codIntermedio[i++]=PUTCARD;
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
		var functionName =globalTokens[0];
		exigirFunctionName(globalTokens[0]);

		callCustomerFunction(functionName);
	}
	else {
		error("expression in body");
	}
	bodyAlpha();
}

function callCustomerFunction(functionName){

	var theFunc = funcTable.filter(f=>f.name===functionName);

	var funcPosition = theFunc[0].index;

	codIntermedio[i++]=JMP;
	codIntermedio[i++]=funcPosition;


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
				} else {
					error("{");
				}
			} else {
				error(")");
			}
		} else {
			error("(");
		}
	} else {
		error("valid function name");
	}
}

function ifexpression() {
	if (exigir("if")) {
		codIntermedio[i++] = IF;
		if (exigir("(")) {
			conditional();
			codIntermedio[i++] = JMP;
			if (exigir(")")) {
				if (exigir("{")) {
					stack.push(i++);
					body();
					if (exigir("}")) {

						codIntermedio[i++]=JMP;
						codIntermedio[stack.pop()]=i+1;
						stack.push(i++);

						if (verificar("else")) {
							if (exigir("else")) {
								if (exigir("{")) {
									body();
									if (!exigir("}")) {
										error("}");
									}
								} else {
									error("{");
								}
							}
							else {
								error("else");
							}
						}

						codIntermedio[stack.pop()]=i;
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
		codIntermedio[i] = WHILE;
		stack.push(i++);
		if (exigir("(")) {
			conditional();
			//codIntermedio[i++] = 255;
			if (exigir(")")) {
				if (exigir("{")) {
					codIntermedio[i++] = JMP;
					stack.push(i++);
					body();
					codIntermedio[stack.pop()] = i + 2;
					codIntermedio[i++] = JMP;
					codIntermedio[i++] = stack.pop();
					if (!exigir("}")) {
						error("}");
					}
					//console.log(codIntermedio);
				} else {
					error("{");
				}
			} else {
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
		codIntermedio[i]=ITERATE;
		stack.push(i++);
		if (exigir("(")) {
			if (exigirNumero(globalTokens[0])) {
				if (exigir(")")) {
					if (exigir("{")) {
						codIntermedio[i++]=JMP;
						stack.push(i++);
						body();
                        codIntermedio[stack.pop()] = i + 2;
                        codIntermedio[i++] = JMP;
                        codIntermedio[i++] = stack.pop();
						if (!exigir("}")) {
							error("}");
						}
						//codIntermedio.forEach(s=>console.log(s));
					} else {
						error("{");
					}
				} else {
					error(")");
				}
			} else {
				error("valid number");
			}
		} else {
			error("(");
		}
	} else {
		error("iterate");
	}
}

function callFunction() {
	if (exigir("(")) {
		if (exigirNumero(globalTokens[0])) {
			if (!exigir(")")) {
				error(")");
			}
		} else {
			error("Valid number");
		}
	} else {
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
        codIntermedio[i++]=VALUE;
		operator();
		if (!exigirNumero(globalTokens[0])) { error("valid number"); }
	} else if (verificar("isEmpty")) {
		exigir("isEmpty");
        codIntermedio[i++]=ISEMPTY;
		callFunction();
	} else if (verificar("isNotEmpty")) {
		exigir("isNotEmpty");
        codIntermedio[i++]=ISNOTEMPTY;
		callFunction();
	} else {
		error("valid conditional");
	}
}
function simpleCondition() {
	if (verificar("isRed")) {
		exigir("isRed");
		codIntermedio[i++]=ISRED;
		return true;
	}
	else if (verificar("isBlack")) {
		exigir("isBlack");
		codIntermedio[i++]=ISBLACK;
		return true;
	}
	else if (verificar("isHeart")) {
		exigir("isHeart");
        codIntermedio[i++]=ISHEART;
		return true;
	}
	else if (verificar("isClubs")) {
		exigir("isClubs");
        codIntermedio[i++]=ISCLUBS;
		return true;
	}
	else if (verificar("isDiamond")) {
		exigir("isDiamond");
        codIntermedio[i++]=ISDIAMOND;
		return true;
	}
	else if (verificar("isSpades")) {
		exigir("isSpades");
        codIntermedio[i++]=ISSPADES;
		return true;
	}
	else if (verificar("isNotRed")) {
		exigir("isNotRed");
        codIntermedio[i++]=ISNOTRED;
		return true;
	}
	else if (verificar("isNotBlack")) {
		exigir("isNotBlack");
        codIntermedio[i++]=ISNOTBLACK;
		return true;
	}
	else if (verificar("isNotHeart")) {
		exigir("isNotHeart");
        codIntermedio[i++]=ISNOTHEART;
		return true;
	}
	else if (verificar("isNotClubs")) {
		exigir("isNotClubs");
        codIntermedio[i++]=ISNOTCLUBS;
		return true;
	}
	else if (verificar("isNotDiamond")) {
		exigir("isNotDiamond");
        codIntermedio[i++]=ISNOTDIAMOND;
		return true;
	}
	else if (verificar("isNotSpades")) {
		exigir("isNotSpades");
        codIntermedio[i++]=ISNOTSPADES;
		return true;
	} else {
		return false;
	}
}
function operator() {
	if (verificar("<")) {
		exigir("<");
        codIntermedio[i++]=LESSTHAN;
	}
	else if (verificar(">")) {
		exigir(">");
        codIntermedio[i++]=GREATERTHAN;
	}
	else if (verificar("<=")) {
		exigir("<=");
        codIntermedio[i++]=LESSOREQUAL;
	}
	else if (verificar(">=")) {
		exigir(">=");
        codIntermedio[i++]=GREATEROREQUAL;
	}
	else if (verificar("==")) {
		exigir("==");
        codIntermedio[i++]=EQUAL;
	}
	else if (verificar("!=")) {
		exigir("!=");
        codIntermedio[i++]=DIFFERENT;
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
		codIntermedio[i++]=Number(token);
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
