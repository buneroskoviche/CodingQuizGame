// Declare a variable for the start button
const $startButton = document.querySelector("#start");
const $title = document.querySelector("h1");
const $subtitle = document.querySelector("h2");
const $section = document.querySelector("section");
const $timerBox = document.querySelector("#timerBox");
const $choices = document.querySelector("#choices");

let testTime = 80;


const questionOne = [ "Which of the following is NOT a Javascript data type?",
    {option: "Boolean", value: false},
    {option: "Number", value: false},
    {option: "Calculation", value: true},
    {option: "String", value: false} ];

// When you click the "Start" button, run the playGame function
$startButton.addEventListener("click", playGame);


// Define the playGame function
function playGame() {
    // Start a countdown using setInterval
    countdown = setInterval(() => {
        // Every loop, subtract 1 from testTime
        testTime--;
        // Change the timer text on screen to match the current time
        $timerBox.textContent = testTime;
        // Check if the time is 0, if so, end the countdown
        if(testTime === 0) {
            clearInterval(countdown);
        }
    }, 1000);
    // Clear the subtitle
    $subtitle.remove();
    // Remove the Start button
    $startButton.remove();
    // Load the first question
    askQuestion(questionOne);
}

// Define askQuestion to generate a question and a list of answers, then validate the option chosen
function askQuestion(array) { 
    // Put the question text in the h1 slot
    $title.textContent = array[0];
    // Create a loop to go through the question array, minus the first option
    for (i = 1; i < array.length; i++) {
        // Declare a variable to create a button
        let button = document.createElement("button");
        // Take the 'option' text out of the object and apply it to a button
        button.textContent = array[i].option;
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
};
