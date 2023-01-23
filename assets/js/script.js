let result;
let questions = [];
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
    fetch(`https://api.api-ninjas.com/v1/trivia?category=${category}&limit=10`, options)
        .then(response => response.json())
        .then(res => {
            result = res;
            if(result && result.length > 0) {
                document.querySelector('#question-container').innerHTML = "";
                questions = [];
                for (let i = 0; i < 10; i++) {
                    let questionIndex = Math.floor(Math.random() * result.length);
                    const question = result[questionIndex].question;
                    questions.push({question: question, answer: result[questionIndex].answer});
                    console.log(questions); // to see console log
                    const questionElement = document.createElement('p');
                    questionElement.innerText = question;
                    // Create new input element
                    const answerInput = document.createElement('input');
                    answerInput.type = 'text';
                    answerInput.id = 'answer-input' + i;
                    questionElement.appendChild(answerInput);
                    // Create new submit button
                    const submitButton = document.createElement('button');
                    submitButton.innerText = "Submit";
                    submitButton.addEventListener('click', function() {
                        checkAnswer(i);
                    });

                    questionElement.appendChild(submitButton);
                    document.querySelector('#question-container').appendChild(questionElement);
                    result.splice(questionIndex,1);
                    }
                    }
                    })
                    .catch(error => {
                    console.error('Error: ', error);
                    });
                    }
                    
            function checkAnswer(index) {
             const answerInput = document.getElementById('answer-input'+index);
             let userAnswer = answerInput.value;
                userAnswer = userAnswer.toLowerCase().trim();
                const correctAnswer = questions[index].answer.toLowerCase().trim();
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