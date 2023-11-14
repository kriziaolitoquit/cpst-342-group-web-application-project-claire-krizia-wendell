bookOfTheMonth("Hidden Potential by Adam Grant");

function bookOfTheMonth(bookName) {
    console.log("The book of the month is " + bookName + ".");
}

function bookSearchFunction(){
    var listOfBooks = ["Hamlet", "GooseBumps", "Rise"];
    var foundBook = "";
     for(var i = 0; i < listOfBooks.length; i++){
        if(book == listOfBooks[i] ){
            foundBook  = listOfBooks[i];
            i = listOfBooks.length;
        }
     }
    return book;
}


function lookingFor(bookTitle){
    console.log("We have " + bookTitle + " in stock.")
}

lookingFor("House of Leaves");
