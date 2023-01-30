//Local storage name
const storageKey = 'Trivia-Games';

let storage = {
    selectedCategories:[],
    categoryNames:[],
    totalScore:0,
    level:0
}

// Check for click events on the navbar burger icon to add toggleClass
$(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
});

const categoryCheckboxes = document.querySelectorAll('.category-checkbox');

//Event listener for checkboxes.
categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function(event) {

        //Gets the parent label element for checkbox that is clicked.
        let labelEl = event.target.parentElement;

        //Gets 'h2' element from label element.
        //Value of this h2 element will be used to display category name in question.html.
        let categoryHeadingEl = labelEl.querySelector('h2');

        if (event.target.checked) {

            //push the value to the selectedCategories array
            storage.selectedCategories.push(event.target.value);

            //Adds category name.
            storage.categoryNames.push(categoryHeadingEl.innerText);
        } else {
            const index = selectedCategories.indexOf(event.target.value);
            if (index > -1) {

                //Removes the category and its name.
                storage.selectedCategories.splice(index, 1);
                storage.categoryNames.splice(index, 1);
            }
        }
    });
});

const generateButton = document.querySelector('#saveButton');
generateButton.addEventListener('click', function() {
    // Save the selected categories in local storage
    localStorage.setItem(storageKey, JSON.stringify(storage));

    // Redirect the user to the "questions.html" page and passes storage ket name as query.
    //This key name will be used in question.js to retrive and update local storage.
    window.location.replace(`questions.html?key=${storageKey}`);
});

if (localStorage.getItem(storageKey)) {

    // get the value from local storage and puts it into an array
    const extStorage = JSON.parse(localStorage.getItem(storageKey));

    // loop through each category checkbox
    categoryCheckboxes.forEach(checkbox => {

        //Gets the parent label element for checkbox that is clicked.
        let labelEl = checkbox.parentElement;

        //Gets 'h2' element from label element.
        //Value of this h2 element will be used to display category name in question.html.
        let categoryHeadingEl = labelEl.querySelector('h2');

        // check if the checkbox value is in the storedCategories array
        if (extStorage.selectedCategories.indexOf(checkbox.value) !== -1) {
            
            // check the checkbox if it's in the storedCategories array
            checkbox.checked = true;

            // push the value to the selectedCategories array
            storage.selectedCategories.push(checkbox.value);

            //Adds category name.
            storage.categoryNames.push(categoryHeadingEl.innerText);
        }
    });
}
