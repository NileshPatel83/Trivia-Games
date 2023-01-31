//DOM Elements
const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
const generateButton = document.querySelector('#saveButton');

// Check for click events on the navbar burger icon to add toggleClass
$(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
});

//Event listener for checkboxes.
categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function(event) {

        if (event.target.checked) {

            //Gets the parent label element for checkbox that is clicked.
            let labelEl = event.target.parentElement;

            //Gets 'h2' element from label element.
            //Value of this h2 element will be used to display category name in question.html.
            let categoryHeadingEl = labelEl.querySelector('h2');

            //push the value to the selectedCategories array
            storage.selectedCategories.push(event.target.value);

            //Adds category name.
            storage.categoryNames.push(categoryHeadingEl.innerText);

        } else {
            const index = storage.selectedCategories.indexOf(event.target.value);
            if (index > -1) {

                //Removes the category and its name.
                storage.selectedCategories.splice(index, 1);
                storage.categoryNames.splice(index, 1);
            }
        }
    });
});

generateButton.addEventListener('click', function() {

    //Exists the event listener if no category is selected.
    //Question page will not be displayed.
    if(storage.selectedCategories.length === 0){
        return;
    }

    //Save the selected categories in local storage
    localStorage.setItem(storageKey, JSON.stringify(storage));

    //Redirect the user to the "questions.html" page and passes storage key name as query.
    //This key name will be used in question.js to retrive and update local storage.
    window.location.replace('questions.html');
});

init();

function init() {

    // get the value from local storage and puts it into an array
    storage = JSON.parse(localStorage.getItem(storageKey));

    // loop through each category checkbox
    categoryCheckboxes.forEach(checkbox => {

        // check if the checkbox value is in the storedCategories array
        if (storage.selectedCategories.indexOf(checkbox.value) !== -1) {
            
            // check the checkbox if it's in the storedCategories array
            checkbox.checked = true;
        }
    });
}