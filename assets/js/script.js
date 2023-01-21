//Ninja trivia API Key.
const ninjaAPIKey = 'JYu2MPGTksY+oXRs5QynHQ==IvWTlwPMWz9NZLpb';

//Ninja trivia query URL.
const queryURL = 'https://api.api-ninjas.com/v1/trivia';

//Ninja trivia category.
const categoryArray = ['','artliterature','language','sciencenature','general','fooddrink','peopleplaces','geography','historyholidays','entertainment','toysgames','music','mathematics','religionmythology','sportsleisure'];

//Total questions to be asked.
totalQuestionNumber = 10;

//DOM Elements
const containerEl = document.querySelector('#container');

//Class names
const submitButtonClass = 'submit-button';

//ID names
const startQuizButtonID = 'start-quiz-button';
const hintButtonID = 'hint-button';

//Attribute names
const dataIndex = 'data-index';

//Array of trivia question object which contains question, answer and category.
let triviaQuestions;

init();

containerEl.addEventListener('click', event => {

    let targetEl = event.target;

    if (targetEl.id === hintButtonID){
        dispalyHint(targetEl);
    }
});

function dispalyHint(hintBtnEl){
;

    let index = parseInt(hintBtnEl.getAttribute(dataIndex));

    let containerDivEl = containerEl.children[index];

    let wikiSearchResults = getWikipediaSearchResults(triviaQuestions[index]);
}






//Initial function when the page is loaded.
async function init(){

    //Gets the list of questions from ninja trivia.
    triviaQuestions = await getTriviaQuestions();
    if(triviaQuestions === 'undefined'){
        return;
    }
    
    //Processes trivia questions.
    processTriviaQuestions();
}

//Processes trivia questions.
function processTriviaQuestions(){
    
    //Loops through all trivial questions one by one and dispaly them in browser.
    for (let i = 0; i < triviaQuestions.length; i++) {
        displayTriviaQuestion(triviaQuestions[i], i)
    }

    //Creates a div a submit button.
    let buttonDivEl = document.createElement('div');

    //Creates a submit button with id and class.
    let submitButtonEl = document.createElement('button');
    submitButtonEl.innerHTML = 'Submit';
    submitButtonEl.id = submitButtonClass;
    submitButtonEl.classList.add(submitButtonClass);
    buttonDivEl.append(submitButtonEl);

    containerEl.append(buttonDivEl);
}

//Displays the question in browser using container.
function displayTriviaQuestion(triviaQuestion, index){

    const category = `Category: ${triviaQuestion.category}`;
    const question = `${index + 1}. ${triviaQuestion.question}`;
    const answer = triviaQuestion.answer;

    //Creates a div for each question with data-index.
    //Data index will be used to check answers.
    let questionDivEl = document.createElement('div');
    
    //Creates question as h2 element.
    let questionEl = document.createElement('h2');
    questionEl.textContent = question;

    //Creates a div for answer textbox and label.
    let categoryEl = document.createElement('div');
    categoryEl.textContent = category;

    //Label for answer textbox.
    let textboxLabelEl = document.createElement('label');
    textboxLabelEl.setAttribute('for', `answer-${index}`);
    textboxLabelEl.innerHTML = 'Answer: ';

    //Textbox for answer.
    let answerTextboxEl = document.createElement('input');
    answerTextboxEl.type = 'text';
    answerTextboxEl.id = `answer-${index}`;
    answerTextboxEl.value = answer;

    //Hint button to dispaly wikipedia search results.
    let hintButtonEl = document.createElement('button');
    hintButtonEl.id = hintButtonID;
    hintButtonEl.setAttribute(dataIndex, index);
    hintButtonEl.innerHTML = 'Hint';

    questionDivEl.append(questionEl, categoryEl, textboxLabelEl, answerTextboxEl, hintButtonEl);

    containerEl.append(questionDivEl);
}

//Gets the list of questions from ninja trivia.
async function getTriviaQuestions(){

    let requestURL = `${queryURL}?category=${categoryArray[0]}&limit=${totalQuestionNumber}`;

    const options = {
        method: 'GET',
        headers: { 'X-Api-Key': ninjaAPIKey},
    };

    const response = await fetch(requestURL, options);

    return response.json();
}