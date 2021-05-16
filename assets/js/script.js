// Declare a variables
const $startButton = document.querySelector("#start");
const $title = document.querySelector("h1");
const $subtitle = document.querySelector("h2");
const $section = document.querySelector("section");
const $timerBox = document.querySelector("#timerBox");
const $choices = document.querySelector("#choices");
const $saveData = document.createElement("form");
const wrongSFX = document.querySelector("#wrongSFX")
let nameInput = document.createElement("input");
let highscoresArray = [];
let testTime;

const questionOne = [ "Which of the following is NOT a Javascript data type?", 1,
    {option: "Boolean", value: false},
    {option: "Number", value: false},
    {option: "Calculation", value: true},
    {option: "String", value: false} ];

const questionTwo = [ "What data type is NaN?", 2,
    {option: "Number", value: true},
    {option: "String", value: false},
    {option: "Undefined", value: false},
    {option: "Null", value: false}
]

const questionThree = [ "If i = 50, which operation will return false?", 3,
    {option: "i < 100", value: false},
    {option: "i >= 50", value: false},
    {option: "i / 2", value: false},
    {option: "i === '50'", value: true}
]

const questionFour = [ "What needs to be called in order to exit a function?", 4,
    {option: "'Exit'", value: false},
    {option: "'Return'", value: true},
    {option: "'Leave'", value: false},
    {option: "Nothing", value: false}
]

const questionFive = [ "How do you define an object?", 5,
    {option: "{Curly brackets}", value: true},
    {option: "[Square brackets]", value: false},
    {option: "<Alligators>", value: false},
    {option: "(Parentheses)", value: false}
]

// Get the saved highscores from local storage
let getHighscores = JSON.parse(localStorage.getItem('highscores'));
if (getHighscores !== null && getHighscores !== undefined) {
    for (i = 0; i < 10; i++) {
        // If any entries are empty, stop the loop
        if (getHighscores[i] === undefined) {
            break;
        }
        highscoresArray.push(getHighscores[i]);
    };
    console.log(highscoresArray);
} else {
    // Put in an empty entry if there aren't any scores
    highscoresArray.push({name: "", score: 0});
};

// Create ordered list elements to be used for displaying the high scores, and a container for them
const playerNames = document.createElement("ol");
playerNames.setAttribute("class", "playerNames");
const playerScores = document.createElement("ol");
playerScores.setAttribute("class", "playerScores");
const scoreBox = document.createElement("div");
scoreBox.setAttribute("class", "scoreBox")

// Create a form and elements where there user can type in their name and save their score
$saveData.setAttribute("class", "saveData");
// Create a text input for the form
nameInput.setAttribute("type", "text");
nameInput.setAttribute("class", "name");
nameInput.setAttribute("placeholder", "Your name here");
// Create a button that will save the score
let buttonInput = document.createElement("input");
buttonInput.setAttribute("type", "button");
buttonInput.setAttribute("value", "Save");
// Stop the enter key from resetting the page
nameInput.addEventListener('keydown', function(key) {
    if (key.key === "Enter") {
        key.preventDefault();
    }});
// Add a function to the 'save' button
buttonInput.addEventListener("click", function(event) {
    // Stop the page from refreshing
    event.preventDefault();
    // Save the score
    saveScore();
    // Clear the score input
    nameInput.value = "";
    // Display the list of high scores
    displayHighscores();
});

// Create a button that will reset the game
let resetButton = document.createElement("button");
resetButton.textContent = "Replay";
// Set the function of the button to replay the game to clear out the list and restart
resetButton.addEventListener("click", function() {
    resetButton.remove();
    playerNames.innerHTML = "";
    playerScores.innerHTML = "";
    scoreBox.innerHTML = "";
    scoreBox.remove();
    startGame();
});

// When you click the "Start" button, run the startGame function and load the first question
$startButton.addEventListener("click", startGame);

// Add a click listener to the choices list for the buttons that will generate
$choices.addEventListener('click', function(clicked) {
    // Assign a variable to what was clicked
    let element = clicked.target;
    // Assign a variable to the 'data-q' value of the button
    let qNumber = element.getAttribute('data-q');
    // If what was clicked was a button ...
    if (element.matches("button") === true) {
        // If the button does not have a class of 'correct'
        if (element.getAttribute("class") !== 'correct') {
            // Remove 10 seconds from the timer
            testTime = testTime - 10;
            wrongSFX.play();
        }
        // Go through a series of checks to see what question we are on, then load the next question
        if (qNumber == 1) {
            askQuestion(questionTwo);
        } else if (qNumber == 2) {
            askQuestion(questionThree);
        } else if (qNumber == 3) {
            askQuestion(questionFour);
        } else if (qNumber == 4) {
            askQuestion(questionFive);
        } else {
            endGame();
        }
    };
});

// Define the function that starts the game
function startGame() {
    // Reset the countdown timer
    testTime = 60;
    // Start a countdown using setInterval
    countdown = setInterval(() => {
        // Every loop, subtract 1 from testTime
        testTime--;
        // Change the timer text on screen to match the current time
        $timerBox.textContent = testTime;
        // Check if the time is 0, if so...
        if(testTime === 0) {
            // Run the function that ends the game
            endGame();
        }
    }, 1000);
    // Clear the subtitle
    $subtitle.textContent = "";
    // Remove the Start button
    $startButton.remove();
    // Load the first question
    askQuestion(questionOne);
}

// Define askQuestion to load the question and generate a list of answers
function askQuestion(array) { 
    // Remove the last list of choices
    $choices.innerHTML = "";
    // Put the question text in the h1 slot
    $title.textContent = array[0];
    // Create a loop to go through the question array, minus the first option
    for (i = 2; i < array.length; i++) {
        // Declare a variable to create a button
        let button = document.createElement("button");
        // Take the 'option' text out of the object and apply it to a button
        button.textContent = array[i].option;
        // Give each button a data tag equal to the question number using the second item in the array
        button.setAttribute('data-q', array[1])
        // If the 'value' field is true, give the 'correct' class tag to the button
        if (array[i].value) {
            button.setAttribute('class', 'correct')
        }
        // Declare a variable to create a list item
        let li = document.createElement("li");
        // Put the button in a list item
        li.appendChild(button);
        // Put the list item into the ordered list
        $choices.appendChild(li);
    };
    return;
};

// Define the function that ends the game
function endGame() {
    // Stop the timer
    clearInterval(countdown);
    // Clear the timer at the top right
    $timerBox.textContent = "";
    // Change the title text
    $title.textContent = "Game Over!";
    // Clear the buttons out of the ordered list
    $choices.innerHTML = "";
    // Add text back into the subtitle
    $subtitle.textContent = `You scored ${testTime} points.`
    // Use an if statement to see if you made it on the high score board
    if (testTime >= highscoresArray[highscoresArray.length - 1].score
        || highscoresArray.length >= 1
        && testTime > 0) {
        // Add the text field to the form
        $saveData.appendChild(nameInput);
        // Add the button to the form
        $saveData.appendChild(buttonInput);
        // Add the form under the subtitle
        $section.appendChild($saveData);
    } else {
        // Add the Replay button to the section instead
        $section.appendChild(resetButton);
    }
    return;
}

// Define a function that will save the users score and name
function saveScore() {
    // Create an object containing the name entered and score
    let scoreSaved = {
        name: nameInput.value,
        score: testTime,
    };
    // Use a loop to compare the new score to all the saved scores, then splice it into the right place
    for (i = 0; i < highscoresArray.length; i++) {
        if (scoreSaved.score >= highscoresArray[i].score) {
            highscoresArray.splice(i, 0, scoreSaved);
            break;
        // If the score is the lowest, push it into the end of the array
        } else if (scoreSaved.score < highscoresArray[highscoresArray.length - 1].score) {
            highscoresArray.push(scoreSaved);
            break;
        }
    }
    // If the highscore list has more than 10 entries, or the last item has 0 points...
    if (highscoresArray.length > 10 || highscoresArray[highscoresArray.length - 1].score === 0) {
        // Remove the last item
        highscoresArray.pop();
    };
    // Save the highscores array to local storage
    localStorage.setItem('highscores', JSON.stringify(highscoresArray));
    return;
}

// Define a function that will retrieve and display the highscore list
function displayHighscores() {
    // Get the new high scores array
    let newScores = JSON.parse(localStorage.getItem('highscores'));
    // Remove the text from the title
    $title.textContent = "";
    // Change the text of the subtitle
    $subtitle.textContent = "High scores"
    // Remove the form
    $saveData.remove();
    // Use a loop to add the top 10 scores/names to the respective list
    for (i = 0; i < 10; i++) {
        let nameEntry = document.createElement("li");
        if (newScores[i] !== undefined) {
            nameEntry.textContent = newScores[i].name;
        } else {
            nameEntry.textContent = "";
        }
        playerNames.appendChild(nameEntry);
        let scoreEntry = document.createElement("li");
        if (newScores[i] !== undefined) {
            scoreEntry.textContent = newScores[i].score;
        } else {
            scoreEntry.textContent = "";
        }
        playerScores.appendChild(scoreEntry);
    }
    // Add the lists to the scoreBox and the scoreBox to the page
    scoreBox.appendChild(playerNames);
    scoreBox.appendChild(playerScores);
    $section.appendChild(scoreBox);
    // Add the Replay button to the section
    $section.appendChild(resetButton);
    return;
}