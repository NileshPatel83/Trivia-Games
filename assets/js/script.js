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

init();

//Initial function when the page is loaded.
function init(){

    //Gets the list of questions from ninja trivia.
    getTriviaQuestions();

}

//Gets the list of questions from ninja trivia.
function getTriviaQuestions(){

    let requestURL = `${queryURL}?category=${categoryArray[0]}&limit=${totalQuestionNumber}`;

    const options = {
        method: 'GET',
        headers: { 'X-Api-Key': ninjaAPIKey},
    };

    fetch(requestURL, options)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.length; i++){
            displayTriviaQuestion(data[i], i);;
        }
      });
}

//Displays the question in browser using container.
function displayTriviaQuestion(triviaQuestion, index){

    const category = `Category: ${triviaQuestion.category}`;
    const question = `${index + 1}. ${triviaQuestion.question}`;
    const answer = triviaQuestion.answer;

    let questionDivEl = document.createElement('div');
    questionDivEl.setAttribute('data-index', index);

    let questionEl = document.createElement('h2');
    questionEl.textContent = question;

    let categoryEl = document.createElement('div');
    categoryEl.textContent = category;

    let textboxLabelEl = document.createElement('label');
    textboxLabelEl.setAttribute('for', `answer-${index}`);
    textboxLabelEl.innerHTML = 'Answer: ';

    let answerTextboxEl = document.createElement('input');
    answerTextboxEl.type = 'text';
    answerTextboxEl.id = `answer-${index}`;

    let submitButtonEl = document.createElement('button');
    submitButtonEl.innerHTML = 'Submit';

    let hintButtonEl = document.createElement('button');
    hintButtonEl.innerHTML = 'Hint';

    questionDivEl.append(questionEl, categoryEl, textboxLabelEl, answerTextboxEl, submitButtonEl, hintButtonEl);

    containerEl.append(questionDivEl);
}