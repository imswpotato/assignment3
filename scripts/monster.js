// Monster Creation

// Page Load Transition
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Page Transition 
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('http')) {
            e.preventDefault();
            document.body.classList.remove('loaded');
            setTimeout(() => {
                window.location.href = href;
            }, 300); // match transition duration
        }
    });
});

// Monster Creation Function from last assignment
// Step 1: Set up the Monster Creation Form Submit Logic.
document.getElementById("monster-form").addEventListener("submit", function (submitEvent) {
    // First check.
    console.log("Submitted");

    // Needed to prevent default behavior, so the page doesn't refresh when we add info. 
    submitEvent.preventDefault();

    /* 
    If we don't use submitEvent.preventDefault(), 
    when the page refreshes, we lose all data in the form and console. 
    */

    // Option 1: The submit event has a reference to the form it is a part of
    console.log(submitEvent);
    let monsterForm = submitEvent.target;

    // Option 2: "this" is also a reference to the form, because we are currently defining the 'submit' logic
    // console.log(this);
    // let monsterForm = this;

    // Either is fine, but let's double check we can access the form elements collection / array
    console.log(monsterForm.elements);

    // Validate the form, if it is valid, add the monster, otherwise alert an error to the user.
    let isValid = validateForm(monsterForm.elements);
    if (isValid) {
        // Create the monster to our collection in memory
        createMonster(monsterForm.elements);
        // Refresh the table and render all the rows
        refreshMonsterTable();
        // Clear/reset form after refresh.
        monsterForm.reset()
    } else {
        // Error message
        alert("Please correct the highlighted errors and try again.");
    }
});

// Step 2: Implement Form Validation.
/*
    validateForm, takes in the form elements:
    - Create the elements.
    - Create array, ensures the inputs are not empty.
*/
function validateForm(formElements) {
    // Assume the form is valid until proven otherwise
    let isValid = true;

    // Clear out any previous errors using loop
    for (let i = 0; i < formElements.length; ++i) {
        formElements[i].classList.remove("error");
    }

    // Name is stored at index "name."
    let name = formElements["name"].value.trim();
    if (name === "") {
        isValid = false;
        // Alert for name error.
        alert("Please name your monster!");
        formElements["name"].classList.add("error");
    }

    // Type is stored at index "type."
    let type = false;
    let typeInputs = document.getElementsByName("type");

    // Run a loop for the radio to check the type of monsters. 
    /* 
    For radio input, it's better to use loop. 
    The for loop goes through each radio button to check if any of them are checked.
    */
    for (let i = 0; i < typeInputs.length; ++i) {
        if (typeInputs[i].checked) {
            type = true;
            // stops the loop early since we only need one checked radio.
            break;
        }
    }

    // If no radio button is checked, type remains false.
    /* 
    The ! operator means “not”, so !type is true when type is false.
    If no radio buttons were selected (type === false), !type becomes true, so the code inside the if runs.
    isValid = false; = The form is invalid, then a warning appears. alert("Please select a monster type."); 
    */
    if (!type) {
        isValid = false;
        // Alert for error type.
        alert("Please select a monster type!");
        for (let i = 0; i < typeInputs.length; ++i) {
            typeInputs[i].classList.add("error");
        }
    }

    // Rarity is stored at index "rarity."
    let rarity = formElements["rarity"].value.trim();
    if (rarity === "") {
        isValid = false;
        // Alert for error rarity.
        alert("Please select a rarity for your monster!");
        formElements["rarity"].classList.add("error");
    }

    return isValid;
}

// Step 3: Monster Creation Functionality.
// Set up array to hold our monsters, prepopulated with one placeholder data.
const monsters = [
    {
        isFavorite: true,
        name: "Matcha",
        type: "Tea",
        rarity: "Super Yummy"
    },
];

// Set up array to hold our monsters.
function createMonster(formElements) {
    // Create a new object to hold our monster info.
    const newMonster = {
        isFavorite: formElements["favorite"].checked,
        name: formElements["name"].value.trim(),
        type: formElements["type"].value.trim(),
        rarity: formElements["rarity"].value.trim(),
    };

    // Add the new monster to our collection.
    monsters.push(newMonster);
}

// Step 4: Display the monster records in the table.
/*
    function refreshMonsterTable, should be called anytime we add or remove a monster:
    - Clears the current table.
    - Re-sorts the monsters.
    - Iterates over the sorted monsters.
    - Adds an HTML row for each monster.
*/

function refreshMonsterTable() {
    // Find the table body we want to add rows to
    const tableBody = document.querySelector("#monster-table tbody");
    // Clear the current table rows
    tableBody.innerHTML = "";

    // Sort the monster based on Name using someArray.sort(customComparator).
    monsters.sort(monsterSortComparator);

    // Iterate over the monsters array to populate the table rows
    for (let i = 0; i < monsters.length; ++i) {
        // Get a reference to the current monster
        let monster = monsters[i];

        // Create a new HTML element to edit, then insert onto the page
        const newRow = document.createElement("tr");

        // Add favoriteText for Favorite texts appear.
        let favoriteText = monster.isFavorite ? "Yes" : "No";

        // Use a string template to populate the HTML of our new row
        newRow.innerHTML = `
            <td>${favoriteText}</td>
            <td>${monster.name}</td>
            <td>${monster.type}</td>
            <td>${monster.rarity}</td>
            <td><button onclick="deleteMonster(${i})">Delete</button></td>
        `;

        // Finally, add the new row to our table body
        tableBody.appendChild(newRow);
    }
}

// Step 5: Implement Deletion Functionality.
function deleteMonster(index) {
    // Like alert(), use confirm() to ask the user for simple yes/no confirmations
    if (confirm("Are you sure you want to delete this monster?")) {
        // Remove the monster from our in memory collection
        monsters.splice(index, 1);
        // Refresh the table UI
        refreshMonsterTable();
    }
}

/*
    function monsterSortComparator to help with sorting monster rows.
    Remember for sorting comparators:
    - Return a negative value if the first object should be first (usually negative 1)
    - Return a positive value if the second object should be first (usually positive 1)
    - Return a zero if the objects should be ranked the same
    Then we can use the builtin someArray.sort(customComparator), instead of writing our own sorting function
*/

// Sorting by Name, alphabetically. 
function monsterSortComparator(monsterA, monsterB) {
    if (monsterA.name > monsterB.name) return 1; 
    if (monsterA.name < monsterB.name) return -1; 
    return 0;
}

// Main logic: Immediately refresh the table with some initial data when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    refreshMonsterTable();
});
