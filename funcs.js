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

