const palabras = [
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

let globalTokens = [];
let TokensLine = [];
let currentToken;
let correctCode;

const IF = -1;
const WHILE = -2;
const ITERATE = -3;
const RETURN = -4;
const INICIOPROG = -5;
const FIN = -6;
const JMP = -7;
const CALL = -8;
const FLIP=-9;
const GETCARD=-10;
const PUTCARD=-11;

const ISBLACK=-12;
const ISRED=-28;
const ISHEART=-13;
const ISCLUBS=-14;
const ISDIAMOND=-15;
const ISSPADES=-16;
const ISNOTBLACK=-17;
const ISNOTRED=-29;
const ISNOTHEART=-18;
const ISNOTCLUBS=-19;
const ISNOTDIAMOND=-20;
const ISNOTSPADES=-21;

const LESSTHAN=-22;
const GREATERTHAN=-23;
const LESSOREQUAL=-24;
const GREATEROREQUAL=-25;
const EQUAL=-26;
const DIFFERENT=-27;

const ISEMPTY=-30;
const ISNOTEMPTY=-31;

const VALUE=-32;

let codIntermedio = [];
let stack = [];
let i = 0;

let funcTable=[];

let nextFunction=-33;

function testText() {
	let code = document.getElementById("codeArea").value;
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
	let correct = true;

	let tmpStr = code;


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
	let i, j;
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

		try {
            program();
        }
        catch(err){
			if(err.name==="SyntaxException"){

			}
			else{
				throw err;
			}
		}
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
	let i;


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
	let consoleMessage = "<span class=\"consoleError\"> Error in Line " + TokensLine[currentToken] + ". Expected " + expected + " instead of '" + globalTokens[0] + "'. </span><br><br>";
	document.getElementById("consoleText").innerHTML += consoleMessage;
}

function printIntermediateCode(){
	let line=0;
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

/*function program() {
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
}*/

function program() {
	demand("class");
	demand("program");
	demand("{");
	codIntermedio[i++]=JMP;
	stack.push(i++);
	functions();
	mainFunction();
	demand("}");
}

/*
function functions() {
	if (verificar("void")) {
		_function();
		functionAlpha();
	}
}*/

function functions() {
	if(check("void")){
		_function();
		functionAlpha();
	}
}

/*
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
}*/

function _function() {
	demand("void");
	let funcName = demandFunctionName();

	if(palabras.indexOf(funcName)>=0){
	    globalTokens[0]=funcName;
	    error("not reserved word valid function name");
        throw {name:"SyntaxException",message:funcName+" is a reserved keyword"};
    }

	codIntermedio[i]=nextFunction;
	let newFunc={
		name:funcName,
		index:i,
		functionNumber:nextFunction
	};
	i++;
	nextFunction--;
	funcTable.push(newFunc);
	demand("(");
	demand(")");
	demand("{");
	body();
	demand("}");
    codIntermedio[i++]=RETURN;
}

/*
function functionAlpha() {
	if (verificar("void")) {
		functions();
	}
}
*/

function functionAlpha() {
	if(check("void")){
		functions();
	}
}

/*
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
}*/

function mainFunction(){
	demand("program");
	demand("(");
	demand(")");
	demand("{");
	codIntermedio[stack.pop()]=i;
	body();
	demand("}");
	printIntermediateCode();
}

function body() {
	if (check("flip")) {
		demand("flip");
        codIntermedio[i++]=FLIP;
	}
	else if (check("getCard")) {
		demand("getCard");
        codIntermedio[i++]=GETCARD;
		callFunction();
	}
	else if (check("putCard")) {
		demand("putCard");
        codIntermedio[i++]=PUTCARD;
		callFunction();
	}
	else if (check("if")) {
		ifExpression();
	}
	else if (check("while")) {
		whileExpression();
	}
	else if (check("iterate")) {
		iterateExpression();
	}
	else if (checkFunctionName()) {
		let functionName = demandFunctionName();
		callCustomerFunction(functionName);
	}
	else {
		//error("expression in body");
		error("invalid body");
        throw {name:"SyntaxException",message:"invalid body"};
	}
	bodyAlpha();
}

function callCustomerFunction(functionName){
	let theFunc = funcTable.filter(f=>f.name===functionName);

	if(theFunc.length===0){
	    globalTokens[0]=functionName;
	    error("declared function");
        throw {name:"SyntaxException",message:functionName+" not declared"};
    }

	let funcPosition = theFunc[0].index;
	codIntermedio[i++]=JMP;
	codIntermedio[i++]=funcPosition;
}

/*
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
*/

function ifExpression() {
	demand("if");
    codIntermedio[i++] = IF;
    demand("(");
    conditional();
    codIntermedio[i++] = JMP;
    demand(")");
    demand("{");
    stack.push(i++);
    body();
    demand("}");
    codIntermedio[i++]=JMP;
    codIntermedio[stack.pop()]=i+1;
    stack.push(i++);
    if(check("else")){
    	demand("else");
    	demand("{");
    	body();
    	demand("}");
	}
    codIntermedio[stack.pop()]=i;
}

/*
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
*/

function whileExpression(){
	demand("while");
    codIntermedio[i] = WHILE;
    stack.push(i++);
    demand("(");
    conditional();
    demand(")");
    demand("{");
    codIntermedio[i++] = JMP;
    stack.push(i++);
    body();
    codIntermedio[stack.pop()] = i + 2;
    codIntermedio[i++] = JMP;
    codIntermedio[i++] = stack.pop();
    demand("}");
}
/*
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
*/

function iterateExpression(){
	demand("iterate");
    codIntermedio[i]=ITERATE;
    stack.push(i++);
    demand("(");
    demandNumber();
    demand(")");
    demand("{");
    codIntermedio[i++]=JMP;
    stack.push(i++);
    body();
    codIntermedio[stack.pop()] = i + 2;
    codIntermedio[i++] = JMP;
    codIntermedio[i++] = stack.pop();
    demand("}");
}

/*
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
*/

function callFunction() {
	demand("(");
	demandNumber();
	demand(")");
}

/*
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
*/

/*
function bodyAlpha() {
	if (verificarFunctionName(globalTokens[0])) {
		body();
	}
}*/

function bodyAlpha(){
	if(checkFunctionName())
		body();
}


//conditional
/*
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
}*/

function conditional(){
	if(simpleCondition()){

	} else if (check("VALUE")) {
        demand("VALUE");
        codIntermedio[i++]=VALUE;
        operator();
		demandNumber();
    } else if (check("isEmpty")) {
        demand("isEmpty");
        codIntermedio[i++]=ISEMPTY;
        callFunction();
    } else if (check("isNotEmpty")) {
        demand("isNotEmpty");
        codIntermedio[i++]=ISNOTEMPTY;
        callFunction();
    } else {
	    error("valid condition");
        throw {name:"SyntaxException",message:"invalid condition"};
    }

}

function simpleCondition() {
	if (check("isRed")) {
		demand("isRed");
		codIntermedio[i++]=ISRED;
		return true;
	}
	else if (check("isBlack")) {
		demand("isBlack");
		codIntermedio[i++]=ISBLACK;
		return true;
	}
	else if (check("isHeart")) {
		demand("isHeart");
        codIntermedio[i++]=ISHEART;
		return true;
	}
	else if (check("isClubs")) {
		demand("isClubs");
        codIntermedio[i++]=ISCLUBS;
		return true;
	}
	else if (check("isDiamond")) {
		demand("isDiamond");
        codIntermedio[i++]=ISDIAMOND;
		return true;
	}
	else if (check("isSpades")) {
		demand("isSpades");
        codIntermedio[i++]=ISSPADES;
		return true;
	}
	else if (check("isNotRed")) {
		demand("isNotRed");
        codIntermedio[i++]=ISNOTRED;
		return true;
	}
	else if (check("isNotBlack")) {
		demand("isNotBlack");
        codIntermedio[i++]=ISNOTBLACK;
		return true;
	}
	else if (check("isNotHeart")) {
		demand("isNotHeart");
        codIntermedio[i++]=ISNOTHEART;
		return true;
	}
	else if (check("isNotClubs")) {
		demand("isNotClubs");
        codIntermedio[i++]=ISNOTCLUBS;
		return true;
	}
	else if (check("isNotDiamond")) {
		demand("isNotDiamond");
        codIntermedio[i++]=ISNOTDIAMOND;
		return true;
	}
	else if (check("isNotSpades")) {
		demand("isNotSpades");
        codIntermedio[i++]=ISNOTSPADES;
		return true;
	} else {
		return false;
	}
}
function operator() {
	if (check("<")) {
		demand("<");
        codIntermedio[i++]=LESSTHAN;
	}
	else if (check(">")) {
		demand(">");
        codIntermedio[i++]=GREATERTHAN;
	}
	else if (check("<=")) {
		demand("<=");
        codIntermedio[i++]=LESSOREQUAL;
	}
	else if (check(">=")) {
		demand(">=");
        codIntermedio[i++]=GREATEROREQUAL;
	}
	else if (check("==")) {
		demand("==");
        codIntermedio[i++]=EQUAL;
	}
	else if (check("!=")) {
		demand("!=");
        codIntermedio[i++]=DIFFERENT;
	}
	else {
		error("valid operator");
        throw {name:"SyntaxException",message:"invalid operator"};
    }
}

/*
function exigir(token) {
	if (token === globalTokens[0]) {
		globalTokens.splice(0, 1);
		currentToken++;
		return true;
	}
	return false;
}*/

function demand(token){
	if(globalTokens.length===0){
        error(token);
		throw {name:"SyntaxException",message:"empty globalTokens"};
	}
	if(token===globalTokens[0]){
		globalTokens.splice(0,1);
		currentToken++;
	}
	else{
		error(token);
		throw {name:"SyntaxException",message:"expected : "+token+" found : "+globalTokens[0]+" instead"};
	}
}

function demandFunctionName() {
	if(globalTokens.length===0) {
        error("valid function name");
        throw {name: "SyntaxException", message: "empty globalTokens"};
    }
	let token = globalTokens[0];
	if(!token.match(/^[a-z]+$/i)){
		error("valid function name");
        throw {name:"SyntaxException",message:"expected valid function name, found : "+token+" instead"};
    }
    globalTokens.splice(0,1);
    currentToken++;
	return token;
}

function demandNumber() {
	if(globalTokens.length===0) {
		error("valid number");
        throw {name: "SyntaxException", message: "empty globalTokens"};
    }
	let number = globalTokens[0];
	if(!number.match(/^[0-9]+$/)){
		error("valid number");
        throw {name:"SyntaxException",message:"expected valid number, found : "+number+" instead"};
	}
    globalTokens.splice(0,1);
    codIntermedio[i++]=Number(number);
	currentToken++;
	return number;
}

function check(token){
	if(globalTokens.length===0)
		return false;
	return globalTokens[0]===token;
}

function checkFunctionName() {
	if(globalTokens.length===0)
		return false;
	return globalTokens[0].match(/^[a-z]+$/i);
}

/*
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

*/
$(function () {
	$(".lined").linedtextarea({
		selectedLine: 1
	}
	);
});
