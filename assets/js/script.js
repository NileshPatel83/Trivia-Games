let result;
let questions = [];
let category = 'language'; // initialize the category variable with the default value
const options = {
    method: 'GET',
    headers: {
        'X-Api-Key': 'xUrHGsh/q8wFJ5UnHkwsUQ==7IbSDTrNYdOAKeqy'
    }
};

const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
let selectedCategories = [];

categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function(event) {
        if (event.target.checked) {
            selectedCategories.push(event.target.value);
        } else {
            const index = selectedCategories.indexOf(event.target.value);
            if (index > -1) {
                selectedCategories.splice(index, 1);
            }
        }
    });
});

const generateButton = document.querySelector('#generate-button');
generateButton.addEventListener('click', generateQuestion);
function generateQuestion() {
    let allQuestions = [];
    for (let i = 0; i < selectedCategories.length; i++) {
        fetch(`https://api.api-ninjas.com/v1/trivia?category=${selectedCategories[i]}&limit=10`, options)
            .then(response => response.json())
            .then(res => {
                allQuestions = allQuestions.concat(res);
                if (i === selectedCategories.length - 1) {
                    // all API calls have completed
                    if(allQuestions && allQuestions.length > 0) {
                        document.querySelector('#question-container').innerHTML = "";
                        questions = [];
                        for (let i = 0; i < 10; i++) {
                            let questionIndex = Math.floor(Math.random() * allQuestions.length);
                            const question = allQuestions[questionIndex].question;
                            questions.push({question: question, answer: allQuestions[questionIndex].answer});
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
                            allQuestions.splice(questionIndex,1);
                            }
                            
                        }
                    }
                })
                .catch(error => {
                    console.error('Error: ', error);
                });
    }
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
