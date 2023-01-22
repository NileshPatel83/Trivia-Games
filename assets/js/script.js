//Ninja trivia API Key.
const ninjaAPIKey = 'JYu2MPGTksY+oXRs5QynHQ==IvWTlwPMWz9NZLpb';

//Ninja trivia query URL.
const triviaQueryURL = 'https://api.api-ninjas.com/v1/trivia';

//Wikipedia query URL.
const wikipediaQueryURL = 'https://en.wikipedia.org/w/api.php';

//Ninja trivia category.
const categoryArray = ['','artliterature','language','sciencenature','general','fooddrink','peopleplaces','geography','historyholidays','entertainment','toysgames','music','mathematics','religionmythology','sportsleisure'];

//Total questions to be asked.
const totalQuestionNumber = 10;

//Total wikipedia results to display.
let wikipediaResultNumber = 3;

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

//Event listener for div container.
containerEl.addEventListener('click', event => {

    //Gets the element that is clicked.
    let targetEl = event.target;

    //If the clicked element is hint button for question, gets wikipedia search results and
    //displays 3 results.
    if (targetEl.id === hintButtonID){
        searchWikipedia(targetEl);
    }
});

//Searches wikipedia and gets the results and displays results.
async function searchWikipedia(hintBtnEl){

    //Gets the index of hint button.
    //This is to determine which question's hint button is clicked.
    let index = parseInt(hintBtnEl.getAttribute(dataIndex));

    //Using the index, gets the div element that contains the question elements (question, category, answer textbox and hint button).
    let containerDivEl = containerEl.children[index];

    //Gets wikipedia result for the selected question using index number.
    let wikiSearchResults = await getWikipediaSearchResults(triviaQuestions[index]);
    if(wikiSearchResults === 'undefined'){
        return;
    }

    //Displays results in browser.
    displayHint(containerDivEl, wikiSearchResults);
}

//Displays results in browser.
function displayHint(containerDivEl, wikiSearchResults){

    //If total searches from wikipedia is less than 3, sets the length as search length.
    if (wikiSearchResults.query.search.length < wikipediaResultNumber){
        wikipediaResultNumber = wikiSearchResults.query.search.length;
    }

    //Creates a div element that will contain all searches.
    let resultDivEl = document.createElement('div');

    //Loop through wikipedia searches.
    for (let i = 0; i < wikipediaResultNumber; i++) {

        //Gets the seach data.
        let searchResult = wikiSearchResults.query.search[i];

        //Creates a div element that will contains wikipedia seach title and snippet.
        let innerResultDivEl = document.createElement('div');

        //Creates question as h2 element to display wikipedia search title.
        let titleEl = document.createElement('h2');
        titleEl.textContent = searchResult.title;

        //Creates a paragraph element to display wikipedia snippet.
        //First gets the parapgrapg inner HTML as search snippet and then
        //Resets it using paragraph textcontent.
        //This is to remove all HTML tags contained in search snippet received from wikipedia.
        let paraEl = document.createElement('p');
        paraEl.innerHTML = searchResult.snippet;
        paraEl.innerHTML = `${paraEl.textContent}...`;

        //Adds title and snippet to inner div elememnt.
        innerResultDivEl.append(titleEl, paraEl);

        //Adds the inner div element to seach result div element.
        resultDivEl.append(innerResultDivEl);
    }

    //Adds search result div element to container div.
    containerDivEl.append(resultDivEl);
}

//Gets wikipedia result for the selected question.
//Search result is obtained using question and asnwer both.
//Returns the search result as an object which contains an object called 'query'.
//'query' object contains array of all search results from wikipedia.
async function getWikipediaSearchResults(triviaQuestion){

    let params = {
        action: "query",
        list: "search",
        srsearch: `${triviaQuestion.question} + ${triviaQuestion.answer}`,
        format: "json"
    };

    let requestURL = `${wikipediaQueryURL}?origin=*`;

    Object.keys(params).forEach(function(key){requestURL += "&" + key + "=" + params[key];});

    const response = await fetch(requestURL);

    return response.json();
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

    //Creates a div that will contain question and wikipedia search results.
    let questionDivEl = document.createElement('div');

    //Creates a div for each question that will contain question, category, answer textbox and hint button.
    let innerQuestionDivEl = document.createElement('div');
    
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
    //Creates an attribute called 'data-index'.
    //This index value will be used to determine which question hint button is clicked.
    let hintButtonEl = document.createElement('button');
    hintButtonEl.id = hintButtonID;
    hintButtonEl.setAttribute(dataIndex, index);
    hintButtonEl.innerHTML = 'Hint';

    //Adds question elements to inner div.
    innerQuestionDivEl.append(questionEl, categoryEl, textboxLabelEl, answerTextboxEl, hintButtonEl);

    //Adds inner div to outer div.
    questionDivEl.append(innerQuestionDivEl);

    //Adds outer div to main container div.
    containerEl.append(questionDivEl);
}

//Gets the list of questions from ninja trivia.
async function getTriviaQuestions(){

    let requestURL = `${triviaQueryURL}?category=${categoryArray[0]}&limit=${totalQuestionNumber}`;

    const options = {
        method: 'GET',
        headers: { 'X-Api-Key': ninjaAPIKey},
    };

    const response = await fetch(requestURL, options);

    return response.json();
}