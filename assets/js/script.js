let result;
let questionIndex;
let category = 'music'; // initialize the category variable with the default value
const options = {
    method: 'GET',
    headers: {
        'X-Api-Key': 'xUrHGsh/q8wFJ5UnHkwsUQ==7IbSDTrNYdOAKeqy'
    }
};

const categorySelect = document.querySelector('#category-select');
categorySelect.addEventListener('change', function(event) {
    category = event.target.value;
});

const generateButton = document.querySelector('#generate-button');
generateButton.addEventListener('click', generateQuestion);

function generateQuestion() {
    fetch(`https://api.api-ninjas.com/v1/trivia?category=${category}`, options)
        .then(response => response.json())
        .then(res => {
            result = res;
            console.log(result)
            if(result && result.length > 0) {
                questionIndex = Math.floor(Math.random() * result.length);
                const question = result[questionIndex].question;
                const questionElement = document.querySelector('#question');
                questionElement.innerText = question;
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
}

const form = document.querySelector('#answer-form');
form.addEventListener('submit', checkAnswer);

function checkAnswer(event) {
  event.preventDefault();
  const answerInput = document.querySelector('#answer-input');
  let userAnswer = answerInput.value;
  userAnswer = userAnswer.toLowerCase().trim();
  const correctAnswer = result[questionIndex].answer.toLowerCase().trim();
  const message = document.querySelector('#message');
  if (userAnswer === correctAnswer) {
    message.innerText = 'Correct!';
    answerInput.style.backgroundColor = 'green';
   } else {
        message.innerText = 'Wrong! The correct answer is ' + correctAnswer;
        answerInput.style.backgroundColor = 'red';
    }
    answerInput.value = "";
}