// Declare a variable for the start button
const $startButton = document.querySelector("#start");
const $timerBox = document.querySelector("#timerBox");
const $orderedList = document.createElement("ol");
let testTime = 80;

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
    // Load the first question
    questionOne();
}

// Define questionOne
function questionOne() {
    console.log("Asking question one");
}