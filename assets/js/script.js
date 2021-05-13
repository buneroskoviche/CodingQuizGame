// Declare a variable for the start button
const $startButton = document.querySelector("#start");
const $title = document.querySelector("h1");
const $subtitle = document.querySelector("h2");
const $section = document.querySelector("section");
const $timerBox = document.querySelector("#timerBox");
const $choices = document.querySelector("#choices");

let testTime = 80;


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

// When you click the "Start" button, run the startGame function and load the first question
$startButton.addEventListener("click", startGame);

// Add a click listener to the option buttons
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
            console.log("Wrong!");}
        // Go through a series of checks to see what question we are on, then load the next question
        if (qNumber == 1) {
            askQuestion(questionTwo);
        } else if (qNumber == 2) {
            askQuestion(questionThree);
        } else if (qNumber == 3) {
            askQuestion(questionFour)
        } else {
            endGame();
        }
    };
});


// Define the startGame function
function startGame() {
    // Start a countdown using setInterval
    countdown = setInterval(() => {
        // Every loop, subtract 1 from testTime
        testTime--;
        // Change the timer text on screen to match the current time
        $timerBox.textContent = testTime;
        // Check if the time is 0, if so, end the countdown
        if(testTime === 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
    // Clear the subtitle
    $subtitle.remove();
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

// Define the endGame function
function endGame() {
    console.log("It's over!!!")
}