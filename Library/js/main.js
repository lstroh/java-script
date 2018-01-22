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
        this.title = "N/A";
    }
    if(isThisAString(_author)){
        this.author = _author;
    }else{
        this.author = "N/A";
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
        this.read = true;
        return true;
    } else if(_read === false){
        this.read = false;
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

function createTd(info){
    var newTd = document.createElement('td');
    newTd.textContent = info.toString();
    newTd.classList.add("align-middle");
    newTd.classList.add("text-center");
    return newTd;
}
function createTd4Remove(_btnId){
    var newTd = document.createElement('td');
    var newBtn = document.createElement('button');
    newBtn.setAttribute("type","button");
    newBtn.setAttribute("id",_btnId.toString());
    newBtn.classList.add("btn");
    newBtn.classList.add("btn-outline-danger");
    newBtn.classList.add("btn-remove");
    newBtn.addEventListener("click",removeBook);
    var newI = document.createElement('i');
    newI.classList.add("fa");
    newI.classList.add("fa-trash");
    newI.setAttribute("aria-hidden",true);
    newBtn.appendChild(newI);
    newTd.appendChild(newBtn);
    newTd.classList.add("align-middle");
    newTd.classList.add("text-center");
    return newTd;
}
function createTd4Read(_btnId,read){
    var newTd = document.createElement('td');
    var newBtn = document.createElement('button');
    var newSpan = document.createElement('span');
    var newBr = document.createElement('br');
    var btnText = "",tdText = "";
    if(read === true){
        btnText = "Mark as unread";
        tdText = "Yes";
    } else {
        btnText = "Mark as read";
        tdText = "Not yet";
    }
    newBtn.setAttribute("type","button");
    newBtn.setAttribute("id",_btnId.toString());
    newBtn.classList.add("btn");
    newBtn.classList.add("btn-outline-primary");
    newBtn.classList.add("btn-sm");
    newBtn.classList.add("btn-sm-font");
    newBtn.textContent = btnText;
    newBtn.addEventListener("click",markReadOrUnRead);
    newSpan.textContent = tdText;
    newTd.appendChild(newSpan);
    newTd.appendChild(newBr);
    newTd.appendChild(newBtn);
    newTd.classList.add("align-middle");
    newTd.classList.add("text-center");
    return newTd;
}
function removeBook(){
    var btnId = Number.parseInt(this.getAttribute("id").split("_")[1]) - 1;
    removeBookFromArray(btnId);
    reloadTable();
}
function markReadOrUnRead(e){
    var btnId = Number.parseInt(this.getAttribute("id").split("_")[1]) - 1;
    booksArray[btnId].setRead(!booksArray[btnId].getRead());
    reloadTable();

}
function createTh(info,scope){
    var newTh = document.createElement('th');
    newTh.textContent = info.toString();
    newTh.setAttribute('scope',scope);
    return newTh;
}
function addNewLineToTable(tbodyElem,num,book){
    var newTr = document.createElement('tr'),newTd,newTh;
    newTr.setAttribute('id',num);
    newTh = createTh(num,"row");
    newTr.appendChild(newTh);
    newTd = createTd(book.getTitle());
    newTr.appendChild(newTd);
    newTd = createTd(book.getAuthor());
    newTr.appendChild(newTd);
    newTd = createTd(book.getPages());
    newTr.appendChild(newTd);
    newTd = createTd4Read("read_" + num,book.getRead());
    newTr.appendChild(newTd);
    newTd = createTd4Remove("remove_" + num);
    newTr.appendChild(newTd);
    tbodyElem.appendChild(newTr);
}
function handleTrClick(e){
    var pathArray = Array.from(e.path);
    if(pathArray[0] instanceof HTMLTableCellElement){
        for(var i=0,pathArrayLen = pathArray.length;i<pathArrayLen;i++){
            var tmpStr = pathArray[i].toString();
            if(pathArray[i] instanceof HTMLTableRowElement){
                var tr = document.getElementById(pathArray[i].getAttribute("id"));
                tr.classList.toggle("table-info");
            }
        }
    } 
    var selectedTrs = Array.from(document.querySelectorAll(".table-info"));
    if(selectedTrs.length>0){
        enableSelectedBtns();
    } else {
        disableSelectedBtns();
    }
}
function removeLineFromTable(tbodyElem,trId){
    var tr2Remove = document.getElementById(trId);
    tr2Remove.removeEventListener('click',handleTrClick);
    tbodyElem.removeChild(tr2Remove);
}
function removeBookFromArray(_index){
    booksArray.splice(_index,1);
}
function addTableEventListers(){
    var trs = Array.from(document.querySelectorAll("tr"));
    trs.forEach(function (tr){
        var trId = tr.getAttribute("id");
        if(trId !== null){
            tr.addEventListener("click",handleTrClick);
        }   
    }); 
}
function removeBtnEventListers(className,func){
    var quaryStr = "." + className;
    var trs = Array.from(document.querySelectorAll(quaryStr));
    trs.forEach(function (tr){
        var btnId = tr.getAttribute("id");
        if(btnId !== null){
            tr.removeEventListener("click",func);
        }   
    }); 
}
function splicaeArray(){
    console.table(booksArray);
    removeBookFromArray(1);
    console.table(booksArray);
}
function addEventListers(){
    var btnAdd = document.getElementById("addBook");
    btnAdd.addEventListener("click",addBook);
    var btnMarkRead = document.getElementById("btnMarkAllAsRead");
    btnMarkRead.addEventListener("click",markAllAsRead);
    var btnMarkUnRead = document.getElementById("btnMarkAllAsUnRead");
    btnMarkUnRead.addEventListener("click",markAllAsUnRead);
    var btnRemoveAllBooks = document.getElementById("btnRemoveAllBooks");
    btnRemoveAllBooks.addEventListener("click",removeAllBooks);
    var btnMarkSelectedRead = document.getElementById("btnMarkSelectedAsRead");
    btnMarkSelectedRead.addEventListener("click",markSelectedBooksAsRead);
    var btnMarkSelectedUnRead = document.getElementById("btnMarkSelectedAsUnRead");
    btnMarkSelectedUnRead.addEventListener("click",markSelectedBooksAsUnRead);
    var btnRemoveSelectedBooks = document.getElementById("btnRemoveSelectedBooks");
    btnRemoveSelectedBooks.addEventListener("click",removeSelectedBooks);
}
function markAllAsRead(){
    for(var i=0,len=booksArray.length;i<len;i++){
        booksArray[i].setRead(true);
    }
    reloadTable();
    this.blur();
}
function markAllAsUnRead(){
    for(var i=0,len=booksArray.length;i<len;i++){
        booksArray[i].setRead(false);
    }
    reloadTable();
    this.blur();
}
function removeAllBooks(){
    var len=booksArray.length;
    while(len >0){
        booksArray.pop();
        len=booksArray.length;
    }
    reloadTable();
    this.blur();
}
function reloadTable(){
    var trs = Array.from(document.querySelectorAll("tr"));
    trs.forEach(function (tr){
        var trId = tr.getAttribute("id");
        if(trId !== null){
            removeLineFromTable(tableTBody,trId);
        }    
    }); 
    removeBtnEventListers("btn-sm-font",markReadOrUnRead);
    removeBtnEventListers("btn-remove",removeBook);
    addBooksFromArrayToTable(tableTBody);
    this.blur();
}
function addBooksFromArrayToTable(_tableTBody){
    for(var i=0,booksArrayLen=booksArray.length;i<booksArrayLen;i++){
        addNewLineToTable(_tableTBody,i+1,booksArray[i]);
    }
    addTableEventListers();
}
function addBookToArray(_title,_author,_pages,_read){
    var newBook = new Book(_title,_author,Number.parseInt(_pages,10),_read);
    booksArray.push(newBook);
}
function addBook(){
    var titleElem = document.getElementById("title"),title = titleElem.value;
    var authorElem = document.getElementById("author"),author = authorElem.value;
    var pagesElem = document.getElementById("pages"),pages = pagesElem.value;
    var readRadiosTrueElem = document.getElementById("readRadiosTrue"),read = false;
    if(readRadiosTrueElem.checked){
        read = true;
    }
    addBookToArray(title,author,pages,read);
    titleElem.value = "";
    authorElem.value = "";
    pagesElem.value = "";
    readRadiosTrueElem.checked = true;
    $('#exampleModal').modal('hide');
    reloadTable();
    this.blur();
}
function disableSelectedBtns(){
    var readBtn = document.getElementById("btnMarkSelectedAsRead");
    var unReadBtn = document.getElementById("btnMarkSelectedAsUnRead");
    var removedBtn = document.getElementById("btnRemoveSelectedBooks");
    readBtn.classList.add("invisible");
    unReadBtn.classList.add("invisible");
    removedBtn.classList.add("invisible");
}
function enableSelectedBtns(){
    var readBtn = document.getElementById("btnMarkSelectedAsRead");
    var unReadBtn = document.getElementById("btnMarkSelectedAsUnRead");
    var removedBtn = document.getElementById("btnRemoveSelectedBooks");
    readBtn.classList.remove("invisible");
    unReadBtn.classList.remove("invisible");
    removedBtn.classList.remove("invisible");
}
function markSelectedBooksAsRead(){
    var selectedTrs = Array.from(document.querySelectorAll(".table-info"));
    for(var i=0,len=selectedTrs.length;i<len;i++){
        var index = Number.parseInt(selectedTrs[i].getAttribute("id"),10) - 1;
        booksArray[index].setRead(true);
    }
    disableSelectedBtns();
    reloadTable();
    this.blur();
}
function markSelectedBooksAsUnRead(){
    var selectedTrs = Array.from(document.querySelectorAll(".table-info"));
    for(var i=0,len=selectedTrs.length;i<len;i++){
        var index = Number.parseInt(selectedTrs[i].getAttribute("id"),10) - 1;
        booksArray[index].setRead(false);
    }
    disableSelectedBtns();
    reloadTable();
    this.blur();
}
function removeSelectedBooks(){
    var selectedTrs = Array.from(document.querySelectorAll(".table-info"));
    for(var i=selectedTrs.length -1;i>=0;i--){
        removeBookFromArray(Number.parseInt(selectedTrs[i].getAttribute("id"),10) - 1);
    }
    disableSelectedBtns();
    reloadTable();
    this.blur();
}
var booksArray = [];
addEventListers();
disableSelectedBtns();
var tableTBody = document.getElementById("displayTableTBody");
var testBook = new Book("kuku","Liron",128,true);
var testBook2 = new Book("kuku2","Liron",128,true);
var testBook3 = new Book("kuku3","Liron",128,true);
booksArray.push(testBook);
booksArray.push(testBook2);
booksArray.push(testBook3);
addBooksFromArrayToTable(tableTBody);
