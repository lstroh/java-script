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

function Book(_title,_author,_pages,_read){
    if(isThisAString(_title)){
        this.title = _title;
    }else{
        this.title = "";
    }
    if(isThisAString(_author)){
        this.author = _author;
    }else{
        this.author = "";
    }
    if(isThisActuallyANumberDontLie(_pages)){
        this.pages = _pages;
    } else {
        this.pages = 0;
    }
    if(_read === true){
        this.read = true;
    } else {
        this.read = false;
    }
}

Book.prototype.setTitle = function (_title){
    if(isThisAString(_title)){
        this.title = _title;
        return true;
    }else{
        return false;
    }
};
Book.prototype.getTitle = function (){
    return this.title;
};
Book.prototype.setAuthor = function (_author){
    if(isThisAString(_author)){
        this.title = _author;
        return true;
    }else{
        return false;
    }
};
Book.prototype.getAuthor = function (){
    return this.author;
};
Book.prototype.setPages = function (_pages){
    if(isThisActuallyANumberDontLie(_pages)){
        this.pages = _pages;
        return true;
    } else {
        return false;
    }
};
Book.prototype.getPages = function (){
    return this.pages;
};
Book.prototype.setRead = function (_read){
    if(_read === true){
        this.pages = true;
        return true;
    } else if(_read === false){
        this.pages = false;
        return true;
    } else {
        return false;
    }
};
Book.prototype.getRead = function (){
    return this.read;
};
Book.prototype.info = function(){
    return this.title + " by " + this.author + ", " + this.pages + "pages ," + (this.read) ? "was read" : "not read yet";
};