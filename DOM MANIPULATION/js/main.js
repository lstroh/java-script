var new_p = document.createElement("p");
new_p.textContent = "Hey I’m red!"; 
new_p.style.color = 'red';

var new_h3 = document.createElement("h3");
new_h3.textContent = "I’m a blue h3!"; 
new_h3.style.color = 'blue';


var div = document.createElement("div");
div.style.border = '1px solid black';
div.style.background = 'pink';
var div_h1 = document.createElement("h1");
div_h1.textContent = "I’m in a div";
var div_p = document.createElement("p");
div_p.textContent = "ME TOO!";
div.appendChild(div_h1);
div.appendChild(div_p);


var continer = document.getElementById("container");
continer.appendChild(new_p);
continer.appendChild(new_h3);
continer.appendChild(div);