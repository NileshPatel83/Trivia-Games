//Local storage name
const storageKey = 'Trivia-Games';

//ID Names
const levelDivID = 'game-level';
const scoreDivID = 'game-score';

//Constants
const levelDivider = 50;

//DOM Elements
const magicBoxEl = $('#magicBox');

init()

//Click event for start button.
$('#startButton').on('click', generateQueryURL)

function generateQueryURL(){

    // Redirect the user to the "category.html" page and passes storage key name as query.
    //This key name will be used in category.js to retrive and update local storage.
    window.location.replace(`category.html?key=${storageKey}`);
}

function init(){

    //Updates game score.
    updateGameScore(storageKey);

    magicBoxEl.draggable();
}

//Updates game score.
function updateGameScore(storageKey){

    //Gets the local storage for trivia games.
    let gameStorage = getLocalStorage(storageKey);

    //Gets the points remaining to next level.
    let toNextLevel = levelDivider - (gameStorage.totalScore % levelDivider);

    //Gets current level.
    let currentLevel = parseInt(gameStorage.totalScore / levelDivider);

    //Creates div to dispaly current score.
    let scoreDivEl = document.createElement('div');
    scoreDivEl.textContent = `Current Score: ${gameStorage.totalScore}`;
    scoreDivEl.style.display = 'flex';
    scoreDivEl.style.backgroundColor = 'transparent';
    scoreDivEl.className = 'has-text-weight-bold is-size-4 mt-3 mx-3';

    //Creates container div display level.
    let levelDivOuterEl = document.createElement('div');
    levelDivOuterEl.style.display = 'flex';
    levelDivOuterEl.className = 'has-text-weight-bold is-size-4 mt-3 mx-3';
    levelDivOuterEl.style.backgroundColor = 'transparent';

    //Create div to display text 'Level:'.
    let levelDivEl = document.createElement('div');
    levelDivEl.textContent = 'Level:';
    levelDivEl.style.lineHeight = '50px';
    levelDivEl.style.backgroundColor = 'transparent';

    levelDivOuterEl.append(levelDivEl);

    //Adds coin images based on current level.
    addLevelCoins(levelDivOuterEl, currentLevel);

    //Creates div to display remaining points to next elvel.
    let nextLevelInfoDivEl = document.createElement('div');
    nextLevelInfoDivEl.textContent = `(${toNextLevel} points away from Level: ${(currentLevel + 1)})`;
    nextLevelInfoDivEl.style.display = 'flex';
    nextLevelInfoDivEl.style.backgroundColor = 'transparent';
    nextLevelInfoDivEl.className = 'has-text-weight-bold is-size-5 mt-3 mx-3';

    magicBoxEl.append(scoreDivEl, levelDivOuterEl, nextLevelInfoDivEl);
}

//Adds coin images based on current level.
function addLevelCoins(levelDivOuterEl, currentLevel){

    //Loops through current level and adds coin images accordingly.
    for (let i = 0; i < currentLevel; i++) {

        let imageEl = document.createElement('img');
        imageEl.src = 'assets/images/coin.png';
        imageEl.style.height = '40px';
        imageEl.style.marginLeft = '5px';
        imageEl.style.backgroundColor = 'transparent';  

        levelDivOuterEl.append(imageEl);
    }
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