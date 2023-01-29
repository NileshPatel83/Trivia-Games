


// Check for click events on the navbar burger icon to add toggleClass
$(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
});
 
//Ninja trivia API Key.
const ninjaAPIKey = 'JYu2MPGTksY+oXRs5QynHQ==IvWTlwPMWz9NZLpb';

//Ninja trivia query URL.
const triviaQueryURL = 'https://api.api-ninjas.com/v1/trivia';

//Wikipedia query URL.
const wikipediaQueryURL = 'https://en.wikipedia.org/w/api.php';

//Ninja trivia category.
const categoryArray = ['language','sciencenature','geography','entertainment','toysgames','mathematics','religionmythology','sportsleisure'];


//Total questions to be asked.
const totalQuestionNumber = 10;

//Total wikipedia results to display.
let wikipediaResultNumber = 3;

// Button IDs
const startQuizButtonID = "start-quiz-button";

const hintButtonID = "hint-button";

const moreInfoButtonID = "more-info-button";

const submitButtonID = "submit-button";

const dataIndex = "data-index";

// DOM elements
const containerEl = document.querySelector('#container');
// Question object array : question, answer, category
let quizQuestions;

init()


containerEl.addEventListener('click', event => {

    //Gets the element that is clicked.
    let targetEl = event.target;

    
    if (targetEl.id === startQuizButtonID){
        console.log(test);
    
        getQuizQuestions();
        
    }else if(targetEl.id === hintButtonID){
        searchWikipedia(targetEl);
    // wikipedia search when hint button is clicked
    // display the wikipedia search
    }else if (targetEl.id === moreInfoButtonID){

        
        showMoreInfo()
    }

});

async function init (){
    const selectedCategory = ['language', 'sciencenature','geography'];
    quizQuestions = await getQuizQuestions(selectedCategory);
    if (quizQuestions === "undefinded"){
        return;
    }
    processQuizQuestions();
}

function processQuizQuestions(){
    for (let i = 0; i < quizQuestions.length; i++) {
        displayQuizQuestions(quizQuestions[i], i)
    }

    let buttonDiv = document.createElement("div");
    let submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    buttonDiv.append(submitButton);
    containerEl.append(buttonDiv);
}
function displayQuizQuestions(quizQuestion, index){
    const category = `Category: ${quizQuestion.category}`;
    const question = `${index + 1}. ${quizQuestion.question}`;
    const answer = quizQuestion.answer;

    let questionBox = document.createElement("div");

    let innerQuestionBox = document.createElement("div");
    

    let questionDisplay = document.createElement("h2");
    questionDisplay.textContent = question;
    

    let categoryDisplay = document.createElement("div");
    categoryDisplay.textContent = category;

    let textBoxLabel = document.createElement("label");
    textBoxLabel.setAttribute("for", answer-$(index));
    textBoxLabel.innerHTML = "Answer:  ";

    let answerTextBox = document.createElement("input");
    answerTextBox.type = "text";
    answerTextBox.id = `answer-${index}`;
    answerTextBox.value = answer;

    let hintButton = document.createElement("button");
    hintButton.id = hintButtonID;
    hintButton.setAttribute(dataIndex, index);
    hintButton.innerHTML = "Hint";

    innerQuestionBox.append(questionDisplay, categoryDisplay,textBoxLabel, answerTextBox, hintButton);

    questionBox.append(innerQuestionBox);

    containerEl.append(questionBox);

}

async function getQuizQuestions (selectedCategory) {

    let questions= [];

    const options = {
        method: 'GET',
        headers: { 'X-Api-Key': ninjaAPIKey},
    };

    for (let i = 0; i < selectedCategory.length; i++){
        // use API ninja to get the questions
        let requestURL = `${triviaQueryURL}?category=${selectedCategory[i]}&limit=${totalQuestionNumber}`;
        const response = await fetch(requestURL, options);
        questions.push(response.json());
    }

   if (questions.length===0)return null;
   
   questions = generateRandomQuestions

    return response.json();
    // display questions in the browser
    
}

// async function searchWikipedia(hintBtnEl){
//     let index = parseInt(hintBtnEl.getAttribute(dataIndex));

    let containerDivEl = containerEl.children[index];

//     //Gets wikipedia result for the selected question using index number.
//     let wikiSearchResults = await getWikipediaSearchResults(triviaQuestions[index]);
//     if(wikiSearchResults === 'undefined'){
//         return;
//     }
//     displayHint (containerDivEl, wikiSearchResults)
// }

// function displayHint (containerDivEl, wikiSearchResults);

//     if (wikiSearchResults.query.search.length < wikipediaResultNumber){
//         wikipediaResultNumber = wikiSearchResults.query.search.length;

//         let resultDivEl = document.createElement('div');

//      for (let i = 0; i < wikipediaResultNumber; i++) {

//         let searchResult = wikiSearchResults.query.search[i];
// }

// // }

























// progress bar function , for example each category has max question = 100  ---Gary
//need to save questionComplete number in local storage to show progress

// const MAX_QUESTIONS= 50;
// function progress() {
//     questionCorrect = 0;
//     questionCorrect ++;
//     progressText.innerText = `Complete ${questionComplete} of ${MAX_QUESTIONS}`;
//     progressBarFull.style.width = `${(questionComplete/MAX_QUESTIONS) * 100}%`;
// }
