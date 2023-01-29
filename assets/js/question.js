//Ninja trivia API Key.
const ninjaAPIKey = 'JYu2MPGTksY+oXRs5QynHQ==IvWTlwPMWz9NZLpb';

//Ninja trivia query URL.
const triviaQueryURL = 'https://api.api-ninjas.com/v1/trivia';

//Wikipedia query URL.
const wikipediaQueryURL = 'https://en.wikipedia.org/w/api.php';

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
const hintButtonID = 'hint-button-';
const hintDivID = 'hint-result-';
const moreInfoButtonID = 'more-info-';

//Attribute names
const dataIndex = 'data-index';

//Array of trivia question object which contains question, answer and category.
let triviaQuestions;

init();

//Event listener for div container.
containerEl.addEventListener('click', event => {
    
    //Gets the element that is clicked.
    let targetEl = event.target;

    //If the clicked element is hint button for question, gets wikipedia search results and displays 3 results.
    if (targetEl.id.indexOf(hintButtonID) !== -1){

        //Disables the hint button so that user cannot clicl it again.
        targetEl.disabled = true;

        //Searches wikipedia and displays search results related to questions and/ or answer.
        searchWikipedia(targetEl);

    } else if (targetEl.id.indexOf(moreInfoButtonID) !== -1){

        //First, deletes current wikipedia search results.
        deleteWikiSearch(targetEl);

        //Then re-searches wikipedia for user specified texts.
        //Displays wikipedia results with new searches.
        //displayMoreInfoSearch(hintDivEl);
    }
        
});

async function displayMoreInfoSearch(hintDivEl){
    let wikiSearchResults = await getWikipediaSearchResults(searchString);
    if(typeof(wikiSearchResults) === 'undefined'){
        return;
    }
    displayWikiSearchResults(hintDivEl, wikiSearchResults);

}

//Deletes wikipedia search results for specified question.
function deleteWikiSearch(moreInfoBtnEl){

    //Gets the index of hint button.
    //This is to determine which question's more info button is clicked.
    let index = parseInt(moreInfoBtnEl.getAttribute(dataIndex));

    //Using the index, gets the div element that contains wikipedia search results.
    let resultDivEl = document.getElementById(`${hintDivID}${index}`);

    //Gets all direct child div elements that contains wikipedia results and removes them if found.
    let searchResults = Array.from(resultDivEl.children);
    if(typeof(searchResults) !== 'undefined'){
        searchResults.forEach(child=>{
            child.remove();
        });
    }
}
//Searches wikipedia and gets the results and displays results.
async function searchWikipedia(hintBtnEl){

    //Gets the index of hint button.
    //This is to determine which question's hint button is clicked.
    let index = parseInt(hintBtnEl.getAttribute(dataIndex));

    //Using the index, gets the div element that contains the question elements (question, category, answer textbox and hint button).
    let containerDivEl = containerEl.children[index];

    //Gets wikipedia result for the selected question using index number and search string as question + answer.
    let searchString = `${triviaQuestions[index].question} + ${triviaQuestions[index].answer}`
    let wikiSearchResults = await getWikipediaSearchResults(searchString);

    //Checks if any search result is obtained or not.  
    if(wikiSearchResults.query.search.length === 0){

        //Re-searches wikipedia using search string as answer only.
        searchString = `${triviaQuestions[index].answer}`;
        wikiSearchResults = await getWikipediaSearchResults(searchString);
    }

    //Displays results in browser.
    displayHint(containerDivEl, wikiSearchResults, index);
}

//Displays results in browser.
function displayHint(containerDivEl, wikiSearchResults, index){
    
     //Creates a div element that will contain all searches.
     let resultDivEl = document.createElement('div');
     resultDivEl.id = `${hintDivID}${index}`;

     //Displays search results of wikipedia search results are obtained.
     if(wikiSearchResults.query.search.length > 0){
        displayWikiSearchResults(resultDivEl, wikiSearchResults);
     }

     //Label for answer textbox.
     let textboxLabelEl = document.createElement('label');
     textboxLabelEl.innerHTML = 'Specific Search: ';

     //Textbox for answer.
     let answerTextboxEl = document.createElement('input');
     answerTextboxEl.type = 'text';

    //Creates button element for specific wikipedia search.
    //Creates an attribute called 'data-index'.
    //This index value will be used to determine which more info button is clicked.
    let moreInfoBtnEl = document.createElement('button');
    moreInfoBtnEl.id = `${moreInfoButtonID}${index}`;
    moreInfoBtnEl.setAttribute(dataIndex, index);
    moreInfoBtnEl.innerHTML = 'More Info';

    //Adds search result div element to container div.
    containerDivEl.append(resultDivEl, textboxLabelEl, answerTextboxEl, moreInfoBtnEl);
}

function displayWikiSearchResults(resultDivEl, wikiSearchResults){
    //If total searches from wikipedia is less than 3, sets the length as search length.
    if (wikiSearchResults.query.search.length < wikipediaResultNumber){
        wikipediaResultNumber = wikiSearchResults.query.search.length;
    }

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
}

//Gets wikipedia result for the selected question.
//Search result is obtained using question and asnwer both.
//Returns the search result as an object which contains an object called 'query'.
//'query' object contains array of all search results from wikipedia.
async function getWikipediaSearchResults(searchString){

    let params = {
        action: "query",
        list: "search",
        srsearch: searchString,
        format: "json"
    };

    let requestURL = `${wikipediaQueryURL}?origin=*`;

    Object.keys(params).forEach(function(key){requestURL += "&" + key + "=" + params[key];});

    const response = await fetch(requestURL);

    return response.json();
}

//Initial function when the page is loaded.
async function init(){

    let allQuestions = [];

    //Gets list of categories selected by the user.
    let category = ['language','sciencenature','fooddrink'];

    //Loops thorugh the selected categories to get 10 questions for each category.
    for (let i = 0; i < category.length; i++) {

        //Gets the list of questions from ninja trivia for the specified category.
        let categoryQuestions = await getTriviaQuestions(category[i]);
        if(typeof(categoryQuestions) === 'undefined'){
            return;
        }

        //Adds category quetions to the final list.
        categoryQuestions.forEach(question => {
            allQuestions.push(question);
        });           
    }

    //Gets list of 10 questions randomly from all questions list.
    triviaQuestions = getQuizList(allQuestions);
    
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
    // questionDivEl.classList.add('box');

    //Creates a div for each question that will contain question, category, answer textbox and hint button.
    let innerQuestionDivEl = document.createElement('div');
    
    //Creates question as h2 element.
    let questionEl = document.createElement('h2');
    questionEl.textContent = question;
    questionEl.classList.add('title', 'is-5');

    //Creates a div for answer textbox and label.
    let categoryEl = document.createElement('div');
    categoryEl.textContent = category;

    //Label for answer textbox.
    let textboxLabelEl = document.createElement('label');
    textboxLabelEl.setAttribute('for', `answer-${index}`);

    //Textbox for answer.
    let answerTextboxEl = document.createElement('input');
    answerTextboxEl.type = 'text';
    answerTextboxEl.id = `answer-${index}`;
    answerTextboxEl.value = answer;

    //Hint button to dispaly wikipedia search results.
    //Creates an attribute called 'data-index'.
    //This index value will be used to determine which question hint button is clicked.
    let hintButtonEl = document.createElement('button');
    hintButtonEl.id = `${hintButtonID}${index}`;
    hintButtonEl.setAttribute(dataIndex, index);
    hintButtonEl.innerHTML = 'Hint';

    //Adds question elements to inner div.
    innerQuestionDivEl.append(questionEl, categoryEl, textboxLabelEl, answerTextboxEl, hintButtonEl);

    //Adds inner div to outer div.
    questionDivEl.append(innerQuestionDivEl);

    //Adds outer div to main container div.
    containerEl.append(questionDivEl);
}

//Gets list of 10 questions randomly from all questions list.
function getQuizList(allQuestions){
    
    let quizList = [];

    do{
        
        //Randomly gets the question from all questions array.
        let randomQuiz = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        
        //Tries to find randomly generated question from question list.
        let existingQuestion = quizList.find(extQuiz => extQuiz.question === randomQuiz.question);

        //Checks whether current question is already added to the list or not. Only adds unique questions.
        if(typeof(existingQuestion) === 'undefined'){
            quizList.push(randomQuiz);
        }

    }while(quizList.length < totalQuestionNumber)

    return quizList;
}

//Gets the list of questions from ninja trivia.
async function getTriviaQuestions(category){

    let requestURL = `${triviaQueryURL}?category=${category}&limit=${totalQuestionNumber}`;

    const options = {
        method: 'GET',
        headers: { 'X-Api-Key': ninjaAPIKey},
    };

    const response = await fetch(requestURL, options);

    return response.json();
}


