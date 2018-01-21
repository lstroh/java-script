"use strict";

var MAX_INT = 9999999.999;
var MIN_INT = -999999.999;
function isThisActuallyANumberDontLie( data ){
	return ( typeof data === "number" && !isNaN(data) );
}

function isThisAString(str){
	if(typeof str === "string" ){
		return true;
	} else{
		return false;
	}
}
function Operation(){
    this.a = NaN;
    this.b = NaN;
    this.op = "";
}
function checkNumber(num){
    if(!isThisActuallyANumberDontLie(num)){
        return false;
    }
    if(num >MAX_INT){
        return false;
    } else if(num < MIN_INT){
        return false;
    }
    return true;
}
Operation.prototype.addNumber = function (num){
    if(!isThisActuallyANumberDontLie(num)){
        return false;
    }
    if(isNaN(this.a)){
        this.a = num;
    } else if (isNaN(this.b)){
        this.b = num;
    } else{
        return false;
    }
    return true;
};
Operation.prototype.resetA = function (){
    this.a = NaN;
};
Operation.prototype.resetB = function (){
    this.b = NaN;
};
Operation.prototype.setOp = function (_op){
    if(!isThisActuallyANumberDontLie(_op)){
        return false;
    }
    if(this.op === ""){
        this.op = _op;
        return true;
    } else{
        return false;
    }
};
Operation.prototype.resetOp = function (){
    this.op = "";
};
Operation.prototype.isAandBSet = function (){
    if((isThisActuallyANumberDontLie(this.a)) && (isThisActuallyANumberDontLie(this.b))){
        return true;
    } else {
        return false;
    }
};
Operation.prototype.isASet = function (){
    if((isThisActuallyANumberDontLie(this.a))){
        return true;
    } else {
        return false;
    }
};
Operation.prototype.isOPSet = function (){
    if(this.op === ""){
        return false;
    } else {
        return true;
    }
};
Operation.prototype.isEq2A = function (num){
    var number;
    if((isThisActuallyANumberDontLie(num))){
        return (this.a === num);
    } else if(isThisAString(num)){
        if((num.search(/\./)) >=0){
            number = parseFloat(num);
        } else{
            number = parseInt(num,10);
        }
        return (this.a === number);
    } else {
        return false;
    }
};
Operation.prototype.calc = function (){
    if(isNaN(this.a)){
        return false;
    } else if(isNaN(this.b)){
        return false;
    } else if(this.op === ""){
        return false;
    } else {
        switch (this.op) {
            case 1:
                return this.a*this.b;
            case 2:
                if(this.b === 0){
                    return "Can't div by 0";
                }
                return this.a/this.b;
            case 3:
                return this.a+this.b;
            case 4:
                return this.a-this.b;
            default:
                return false;
        }
    }
};

var mainOP = new Operation();
var lastClick = "1";
function checkAndAlert(res,msg){
    if(res == true){

    } else {
        alert(msg);
    }
}
function calculateAndUpdateResult(){
    var res,resBool;
    var targetResult = document.getElementById("result");
    var furmulaResult = document.getElementById("furmula");
    if(mainOP.isAandBSet() === true){
        res = mainOP.calc();
        if(isThisActuallyANumberDontLie(res)){
            resBool = checkNumber(res);
            if(resBool === false){
                checkAndAlert(resBool,"Number Overflow");
                clearDisplayAndSettings(targetResult,furmulaResult);
                return false;
            } else {    
                var oldTargetText =  targetResult.textContent;
                var oldFurmulatText =  furmulaResult.textContent;
                if(Number.isInteger(res)){
                    targetResult.textContent = res.toString();
                    enableDotBtn();
                } else {
                    targetResult.textContent = res.toFixed(3);
                    disableDotBtn();
                }    
                furmulaResult.textContent = oldFurmulatText + mainOP.b + "=";
                mainOP.resetA();
                mainOP.resetB();
                mainOP.resetOp();
            }    
        } else if(isThisAString(res)){
            checkAndAlert(false,res);
        } else if(res === false){
            checkAndAlert(false,"Can't calc it!");
        }
    } else{
        checkAndAlert(false,"Can't calc it!");
    }
}
function addStringNumber(str){
    var number,res;
    var targetResult = document.getElementById("result");
    var furmulaResult = document.getElementById("furmula");
    if(isThisAString(str)){
        if((str.search(/\./)) >=0){
            number = parseFloat(str);
        } else{
            number = parseInt(str,10);
        }
        res = checkNumber(number);
        if(res === false){
            checkAndAlert(res,"Number Overflow");
            clearDisplayAndSettings(targetResult,furmulaResult);
            return false;
        }    
        return mainOP.addNumber(number);
    } else {
        return false;
    }
}
function disableDotBtn() {
    var btn = document.getElementById("btnDot");
    btn.disabled = true;
}
function enableDotBtn() {
    var btn = document.getElementById("btnDot");
    btn.disabled = false;
}
function removeLastCharInFurmula (){
    var furmulaResult = document.getElementById("furmula"),str_len,newText;
    str_len = furmulaResult.textContent.length;
    newText = furmulaResult.textContent.slice(0,str_len-1);
    furmulaResult.textContent = newText;
}
function updateResults4Op(_oldText,_targetResult,_furmulaResult,opNum,opText){
    var res,oldText = _oldText,targetResult=_targetResult,furmulaResult=_furmulaResult;
    if((mainOP.isASet()) && (mainOP.isOPSet())){
        res = addStringNumber(oldText);
        checkAndAlert(res,"Can't add number");
        if(res === false){
            return false;
        }
        calculateAndUpdateResult();
        oldText =  targetResult.textContent;
     }else if(mainOP.isAandBSet()){
        res = addStringNumber(oldText);
        checkAndAlert(res,"Can't add number");
        if(res === false){
            return false;
        }
        calculateAndUpdateResult();  
     }      
    res = addStringNumber(oldText);
    checkAndAlert(res,"Can't add number");
    if(res === false){
        return false;
    }    
    mainOP.resetOp();
    mainOP.setOp(opNum);
    if(lastClick === "op"){
        removeLastCharInFurmula();
    }
    lastClick = "op";
    furmulaResult.textContent = oldText + opText; 
}
function clearDisplayAndSettings(_targetResult,_furmulaResult){
    var targetResult = _targetResult,furmulaResult=_furmulaResult;
    targetResult.textContent = "0";
    furmulaResult.textContent = "";
    mainOP.resetA();
    mainOP.resetB();
    mainOP.setOp();
    enableDotBtn();
    lastClick ="clear";
}
function handleBtnClick(e){
   var _btn=this,res="";
   var targetResult = document.getElementById("result");
   var furmulaResult = document.getElementById("furmula");
   var oldText =  targetResult.textContent;
   var oldFurmulatText =  furmulaResult.textContent;
   var str_len,newText;
   switch (_btn.value) {
       case "undo":
            if(lastClick === "1"){
                alert("Can't Undo before something is made");
            } else if (lastClick === ""){
                alert("Can Undo only one thing");
            } else if (lastClick === "number"){
                str_len = oldText.length;
                newText = oldText.slice(0,str_len-1);
                targetResult.textContent = newText;
                lastClick = "";
            } else if(lastClick === "op"){
                str_len = furmulaResult.textContent.length;
                newText = furmulaResult.textContent.slice(0,str_len-1);
                furmulaResult.textContent = newText;
                mainOP.resetOp();
                lastClick = "";
            } else if(lastClick === "dot"){
                str_len = oldText.length;
                newText = oldText.slice(0,str_len-1);
                targetResult.textContent = newText;
                lastClick = "";
                enableDotBtn();
            } else if(lastClick === "clear"){
                alert("Can't undo clear");
            }else if(lastClick === "eq"){
                targetResult.textContent = "0";
                furmulaResult.textContent = "";
                mainOP.resetA();
                mainOP.resetB();
                mainOP.setOp();
                enableDotBtn();
                lastClick = "clear";
            } else {
                alert("Can't Undo");
            }
           break;
        case "mul": // 1
            updateResults4Op(oldText,targetResult,furmulaResult,1,"*");
           break;
        case "div": // 2
            updateResults4Op(oldText,targetResult,furmulaResult,2,"/");
           break;
        case "dot":
            targetResult.textContent = oldText + ".";
            disableDotBtn();
            lastClick = "dot";
           break;
        case "btnClear":
            clearDisplayAndSettings(targetResult,furmulaResult);
           break;
        case "btnPlus": // 3
            updateResults4Op(oldText,targetResult,furmulaResult,3,"+");
           break;
        case "btnEq":
            res = addStringNumber(oldText);
            checkAndAlert(res,"Can't add number before calc");
            calculateAndUpdateResult();
            lastClick = "eq";
           break; 
        case "min": // 4
            updateResults4Op(oldText,targetResult,furmulaResult,4,"-");
           break;     
       default:
            if((oldText === "0") || (lastClick === "op") || (lastClick === "eq")){
                targetResult.textContent = _btn.value;
            } else {
                targetResult.textContent = oldText + _btn.value;
            }    
            var tempStr = targetResult.textContent.toString();
            if((tempStr.search(/\./)) >=0){
                disableDotBtn();
            } else{
                enableDotBtn();
            }
            lastClick = "number";
           break;
   }
   this.blur();
}
function keyPressed(e){
    var btn,btnName;
    switch (e.key) {
        case "*":
            btn = document.getElementById("btnMul")
            btn.click();
            break;
        case "/":
            btn = document.getElementById("btnDiv")
            btn.click();
            break;
        case ".":
            btn = document.getElementById("btnDot")
            btn.click();
            break;
        case "+":
            btn = document.getElementById("btnPlus")
            btn.click();
            break;
        case "=":
        case "Enter":
            btn = document.getElementById("btnEq")
            btn.click();
            break;
        case "-":
            btn = document.getElementById("btnMin")
            btn.click();
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            btnName = "btn" + e.key;
            btn = document.getElementById(btnName)
            if(btn){
                btn.click();
            }    
        default:
            break;
    }
}
function addEventLister(){
    var btns = Array.from(document.querySelectorAll("button"));
    btns.forEach(function (btn){
        btn.addEventListener("click",handleBtnClick);
    }); 
    window.addEventListener("keypress", keyPressed); 
}


addEventLister();