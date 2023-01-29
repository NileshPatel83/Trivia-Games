


// Check for click events on the navbar burger icon to add toggleClass
$(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
});
 

window.onload = function() {
    // Get the selected categories from the first page
    let selectedCategories = JSON.parse(localStorage.getItem("selectedCategories"));

    // Get the questions from local storage
    let allQuestions = JSON.parse(localStorage.getItem("questions"));

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
