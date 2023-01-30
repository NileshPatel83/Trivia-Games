//Local storage name
const storageKey = 'Trivia-Games';

//DOM Elements
const magicBoxEl = document.querySelector('#magicBox');

init()

function init(){

    //Gets the local storage for trivia games.
    let gameStorage = getLocalStorage(storageKey);


}

//Gets the local storage for trivia games.
function getLocalStorage(storageKey){

    let gameStorage = [];

    //Gets the schedule storage and converts it into an array of objects.
    let storage = localStorage.getItem(storageKey);   
    if(storage !== null){
        gameStorage = JSON.parse(storage);
    }
  
    //Returns the storage.
    return gameStorage;
}