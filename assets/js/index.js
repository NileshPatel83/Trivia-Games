//Local storage name
const storageKey = 'Trivia-Games';

//ID Names
const levelDivID = 'game-level';
const scoreDivID = 'game-score';

//DOM Elements
const magicBoxEl = document.getElementById('magicBox');

init()

function init(){

    //Gets the local storage for trivia games.
    let gameStorage = getLocalStorage(storageKey);

    updateGameScore(gameStorage);
}

function updateGameScore(gameStorage){

    let scoreDivEl = document.createElement('div');
    scoreDivEl.textContent = `Score: ${gameStorage.totalScore}`;
    scoreDivEl.className = 'has-text-weight-bold is-size-4 mt-3';

    let level = parseInt(gameStorage.level);

    let levelDivOuterEl = document.createElement('div');
    levelDivOuterEl.style.display = 'flex';
    levelDivOuterEl.className = 'has-text-weight-bold is-size-4 mt-3';

    let levelDivEl = document.createElement('div');
    levelDivEl.textContent = 'Level:';
    levelDivEl.style.lineHeight = '50px';

    let imageEl = document.createElement('img');
    imageEl.src = 'assets/images/coin.png';
    //imageEl.setAttribute('height', '50px');
    imageEl.style.height = '50px';

    levelDivOuterEl.append(levelDivEl,imageEl);


    magicBoxEl.append(scoreDivEl, levelDivOuterEl);
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