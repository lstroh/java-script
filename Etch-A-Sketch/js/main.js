
function addDivs(size){
    var target = document.getElementById("main_div");
    for(var i=0;i<size;i++){
        for(var j=0;j<size;j++){
            var div = document.createElement('div');
            div.classList.add('small_div');
            var w_num = 100/size;
            var w_string = w_num.toString() + "%";
            div.style.width = w_string;
            div.style.height = w_string;
            div.style.setProperty('background-color', 'rgb(255,255,255)');
            div.addEventListener('mouseover',makeDivGray);
            target.appendChild(div);
        }
    }
}
function makeDivGray(){
    this.style.background = "rgb(128,128,128)";
}
function makeDivRandom(){
    var r = Math.floor(Math.random() * 255), g = Math.floor(Math.random() * 255) , b = Math.floor(Math.random() * 255);
    this.style.background = "rgb(" + r + "," + g + "," + b + ")";
}
function reduceby10pct(num){
    var reduced = num - 25;
    if(reduced < 0){
        return 0;
    } else {
        return reduced;
    }
}
function makeDivDarker(){
    var oldRBG = window.getComputedStyle(this).backgroundColor;
    var rgb_tmp = oldRBG.slice(4,oldRBG.length-1);
    var rgbArray = rgb_tmp.split(", ");
    newRbgArray = rgbArray.map(reduceby10pct);
    this.style.setProperty('background-color', 'rgb(' + newRbgArray[0] + ',' + newRbgArray[1] + ',' + newRbgArray[2] + ')');

}

function UpdateDivEventLister(new_fun){
  var divs = document.querySelectorAll('.small_div');
  divs.forEach(function (_div){
    _div.removeEventListener('mouseover',makeDivDarker,false);
    _div.removeEventListener('mouseover',makeDivGray,false);
    _div.removeEventListener('mouseover',makeDivRandom,false);
    _div.addEventListener('mouseover',new_fun,false);
  });
}
function setButtonEventListers(){
    var btn = document.getElementById("gray");
    btn.addEventListener('click',function(){
        UpdateDivEventLister(makeDivGray);
    });
    btn = document.getElementById("rnd");
    btn.addEventListener('click',function(){
        UpdateDivEventLister(makeDivRandom);
    });
    btn = document.getElementById("rgb");
    btn.addEventListener('click',function(){
        UpdateDivEventLister(makeDivDarker);
    });
    btn = document.getElementById("gen");
    btn.addEventListener('click',removeAndUpdateDivs);
}
function removeDivs(){
    var divs = document.querySelectorAll('.small_div');
    divs.forEach(function (_div){
        _div.parentElement.removeChild(_div);
    });
}
function removeAndUpdateDivs(){
    var num = parseInt(document.getElementById("number").value ,10);
    console.log(num);
    console.log(isNaN(num));
    if((isNaN(num)) || (num <1 ) || (num > 64)){
        var target = document.getElementById("warnings");
        target.classList.toggle('text-danger');
        target.textContent = "The number has to be between 1 and 64";
    } else{
        var target = document.getElementById("warnings");
        target.textContent = "";
        removeDivs();
        addDivs(num);
    }
}
addDivs(4);
setButtonEventListers();
