//Ninja trivia API Key.
const ninjaAPIKey = 'JYu2MPGTksY+oXRs5QynHQ==IvWTlwPMWz9NZLpb';

//Ninja trivia query URL.
const queryURL = 'https://api.api-ninjas.com/v1/trivia';

//Ninja trivia category.
const categoryArray = ['','artliterature','language','sciencenature','general','fooddrink','peopleplaces','geography','historyholidays','entertainment','toysgames','music','mathematics','religionmythology','sportsleisure'];

//Total questions to be asked.
totalQuestionNumber = 10;

//DOM Elements
const containerEl = document.querySelector('.container');

init();

//Initial function when the page is loaded.
function init(){
    let questions = getTriviaQuestions();
    
}

//Gets the list of questions from ninja trivia.
function getTriviaQuestions(){

    let questions = [];

    let requestURL = `${queryURL}?category=${categoryArray[0]}&limit=${totalQuestionNumber}`;

    const options = {
        method: 'GET',
        headers: { 'X-Api-Key': ninjaAPIKey},
    };

        fetch(requestURL, options)
	.then(response => response.json())
	.then(data => {
        data.forEach(element => {
            questions.push(element);
        });
    })
	.catch(err => console.error(err));

    return questions;
}