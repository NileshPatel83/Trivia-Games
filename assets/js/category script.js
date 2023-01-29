


// Check for click events on the navbar burger icon to add toggleClass
$(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
});
 




let result;
let questions = [];
let category = 'music'; // initialize the category variable with the default value
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
generateButton.addEventListener('click', function() {
    // Save the selected categories in local storage
    localStorage.setItem('categories', JSON.stringify(selectedCategories));



    // Redirect the user to the "questions.html" page
    window.location.href = 'questions.html';
});



if (localStorage.getItem('categories')) {
    // get the value from local storage and puts it into an array
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    // loop through each category checkbox
    categoryCheckboxes.forEach(checkbox => {
        // check if the checkbox value is in the storedCategories array
        if (storedCategories.indexOf(checkbox.value) !== -1) {
            // check the checkbox if it's in the storedCategories array
            checkbox.checked = true;
            // push the value to the selectedCategories array
            selectedCategories.push(checkbox.value);
        }
    });
}
















// progress bar function , for example each category has max question = 100  ---Gary
//need to save questionComplete number in local storage to show progress

// const MAX_QUESTIONS= 50;
// function progress() {
//     questionCorrect = 0;
//     questionCorrect ++;
//     progressText.innerText = `Complete ${questionComplete} of ${MAX_QUESTIONS}`;
//     progressBarFull.style.width = `${(questionComplete/MAX_QUESTIONS) * 100}%`;
// }
