var timerNumber = 35;
var newNumber;
var countdown = document.getElementById("countdown");

var backgroundTimer = 2;
var backgroundTimerReduced = backgroundTimer;
var questionRightOrWrongArea = document.getElementById("questionRightOrWrong");

var score = 0;
var collectiveScore = score;
var score = document.getElementById("score");

var gameArea = document.getElementById("gameArea");

// Used to determine which question is selected - will be iterated after answering
var theQuestion = 1;

// Start Game
var startGame = document.getElementById("startGame");
startGame.addEventListener("click", startGameEXE);

function resetNumbers() {
    score = 0;
    collectiveScore = 0;
    theQuestion = 1;
}

function rewriteLanding() {
    questionRightOrWrongArea.innerHTML = "";
    gameArea.innerHTML = "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit.<br>Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p><br><button id='startGame1'>Start Game</button>";
    var startGame1 = document.getElementById("startGame1");
    startGame1.addEventListener("click", startGameEXE);
}



// LOCAL STORAGE -------------------
// Check if local storage is populated and if not push some generic high scores to the high score array
// and set beenHereBefore to YES
if (localStorage.getItem("beenHereBefore") === null) {
    localStorage.setItem('beenHereBefore', 'yes');
    var genUsers = ["Krusty", "Dusty", "Rusty"];
    var genHighScores = [10, 5, 0];
    localStorage.setItem('usersArray', JSON.stringify(genUsers));
    localStorage.setItem('highScoreArray', JSON.stringify(genHighScores));
} else {
    // alert("been here before yep");
    // Get local storage highScoreArray
    var highScoreArray = JSON.parse(localStorage.getItem('highScoreArray'));
    console.log("HSA: " + highScoreArray[0]);
    var userArray = JSON.parse(localStorage.getItem('usersArray'));
}
// ---------------------------------------------

// QUESTIONS------------
var question1 = {
    question: "Which of these will provide the object keys and values?",
    answerOne: ["Object.entries()", "Object.values()", "Object.keys()", "alert(obj)"],
    correctAnswer: "Object.entries()"
}

var question2 = {
    question: "In JavaScripthe built in method to make a URL request is:",
    answerOne: ["ajax", "fetch", "api", "get"],
    correctAnswer: "fetch"
}

var question3 = {
    question: "Data added to an HTML element that isn't read by the DOM is a data-*?",
    answerOne: ["attribute", "variable", "extension", "function"],
    correctAnswer: "attribute"
}

var question4 = {
    question: "How would you access the first index of an array?",
    answerOne: [":0", "{0}", "[0]", "0"],
    correctAnswer: "[0]"
}

var question5 = {
    question: "The built in browser method to show the user a message is called with:",
    answerOne: ["modal()", "console.log()", "prompt()", "alert()"],
    correctAnswer: "alert()"
}

var question6 = {
    question: "The built in browser method to gather user input is called with:",
    answerOne: ["input()", "console.log()", "prompt()", "alert()"],
    correctAnswer: "prompt()"
}

var question7 = {
    question: "Which of these declares a variable?",
    answerOne: ["create", "dec", "new variable", "var"],
    correctAnswer: "var"
}

var question8 = {
    question: "Curly Braces/{} around data would imply it is what type?",
    answerOne: ["object", "variable", "array", "htmlCollection"],
    correctAnswer: "object"
}

var question9 = {
    question: "Text in a variable is know as _ data.",
    answerOne: ["alpha", "string", "text", "readable"],
    correctAnswer: "string"
}

var question10 = {
    question: "What is the file extension for a javascript file?",
    answerOne: [".script", ".javascript", ".javaScript", ".js"],
    correctAnswer: ".js"
}
// ---------------------

// Go back to landing page
function backtoStart() {
    resetNumbers();
    rewriteLanding();
}

// click event handler for high scores
function writeHighScores() {
    gameArea.innerHTML = '';

    resetNumbers();
    timerNumber = 155;

    // highScoreArray = highScoreArray.sort();
    console.log(highScoreArray);
    for (let i = 0; i < highScoreArray.length; i++) {
        gameArea.insertAdjacentHTML('beforeend', "<p>" + highScoreArray[i] + ": " + userArray[i] + "</p>");
    };
    questionRightOrWrong.innerHTML = '<button id="goBack">Go Back</button>';
    // alert("game");
    var goBack = document.getElementById("goBack");
    goBack.addEventListener("click", backtoStart);


}

var viewHighScores = document.getElementById("viewHighScores");
viewHighScores.addEventListener("click", writeHighScores);

// Write questions to gameArea
function writeQuestions() {

    if (theQuestion == 1) {
        theQuestion = question1;
        console.log("Q# : 1");
    } else if (theQuestion == question1) {
        theQuestion = question2;
        console.log("Q# : 2");
    } else if (theQuestion == question2) {
        theQuestion = question3;
        console.log("Q# : 3");
    } else if (theQuestion == question3) {
        theQuestion = question4;
        console.log("Q# : 4");
    } else if (theQuestion == question4) {
        theQuestion = question5;
        console.log("Q# : 5");
    } else if (theQuestion == question5) {
        theQuestion = question6;
        console.log("Q# : 4");
    } else if (theQuestion == question6) {
        theQuestion = question7;
        console.log("Q# : 4");
    } else if (theQuestion == question7) {
        theQuestion = question8;
        console.log("Q# : 4");
    } else if (theQuestion == question8) {
        theQuestion = question9;
        console.log("Q# : 4");
    } else if (theQuestion == question9) {
        theQuestion = question10;
        console.log("Q# : 4");
    } else {
        theQuestion = question1;
    }
    gameArea.innerHTML = "";
    gameArea.innerHTML = "<h1>" + theQuestion.question + "</h1>" + "<br>";

    // Iterate through available answers and push to DOM
    for (var i = 0; i < theQuestion.answerOne.length; i++) {
        var loopedAnswers = "<button class='answerButton" + "'>" + theQuestion.answerOne[i] + "</button>";
        gameArea.insertAdjacentHTML('beforeend', loopedAnswers);
        console.log(loopedAnswers);
    };
    document.querySelectorAll(".answerButton").forEach(function (element) {
        element.addEventListener("click", rightOrWrong);
    });

}

function rightOrWrong() {
    var checkSelection = this.textContent;
    console.log(checkSelection);

    // alert(checkSelection);

    const backgroundInterval = setInterval(rightWrongBackgroundInterval, 1000);
    function rightWrongBackgroundInterval() {
        backgroundTimerReduced--;
        if (backgroundTimerReduced == 0) {
            // alert("times up");
            stopBackgroundEffectTimer();
            questionRightOrWrongArea.style.backgroundColor = "";
            questionRightOrWrongArea.innerHTML = collectiveScore;
            backgroundTimerReduced = 2;
            if (newNumber > 0) {
                writeQuestions();
            } else {
                questionRightOrWrongArea.style.backgroundColor = "";
                questionRightOrWrongArea.innerHTML = "Final Score: " + collectiveScore;
            }
        }
    }
    function stopBackgroundEffectTimer() {
        clearInterval(backgroundInterval);
    }

    if (checkSelection == theQuestion.correctAnswer) {
        // alert("!!!!!yas!!!!");
        // console.log(typeof this.textContent);
        // theQuestion = question2;

        questionRightOrWrongArea.style.backgroundColor = "green";
        console.log("SCORE: " + collectiveScore);
        // console.log(theQuestion);
        // timerNumber += 5;
        collectiveScore += 10;
        rightWrongBackgroundInterval();

    } else {
        // alert("BOOOOOOOOOOO");
        // console.log(typeof this.textContent);
        // theQuestion = question2;

        questionRightOrWrongArea.style.backgroundColor = "red";
        timerNumber -= 20;
        // collectiveScore -= 5;
        console.log("SCORE: " + collectiveScore);

        rightWrongBackgroundInterval();
    }

}

function startGameEXE() {
    // RESETS
    timerNumber = 35;
    score = 0;
    collectiveScore = 0;
    // Clear gameArea and push first question to DOM
    writeQuestions();

    const myInterval = setInterval(intervalQuestionTimer, 1000);
    // Timer Logic ---------------------------------
    function intervalQuestionTimer() {

        timerNumber--;
        newNumber = timerNumber;

        // ✅ Change (replace) the text of the element
        countdown.innerHTML = "Time:" + timerNumber;
        if (timerNumber > 150) {
            stopTimer();
            countdown.innerHTML = "Time:" + "Game Ended";
        }
        // console.log(timerNumber);


        if (timerNumber < 0) {
            questionRightOrWrongArea.style.background = "none";
            questionRightOrWrongArea.innerHTML = "Final Score: " + collectiveScore;

            // console.log("NUMBER: " + timerNumber);
            stopTimer();
            // gameArea.innerHTML = '';
            newHighScore();
            countdown.innerHTML = 'Time: 0';
            // gameArea.style.backgroundColor = "black"
        }
    }
    function stopTimer() {
        clearInterval(myInterval);

    };
    // End Timer Logic------------------------------


};




//get current user array
var userArray = JSON.parse(localStorage.getItem('usersArray'));

// get current score array
var highScoreArray = JSON.parse(localStorage.getItem('highScoreArray'));


// Write new high score to local storage
function newHighScore() {
    if (collectiveScore > highScoreArray[0]) {
        // alert("new high score");
        // Add into high score array index 0
        highScoreArray.unshift(collectiveScore);
        // Remove 3rd index
        highScoreArray.pop();
        // Add the username array index 0
        userArray.unshift("First Place");
        // Remove new/last user array index
        userArray.pop();

        console.log(collectiveScore);
        console.log(highScoreArray);

        // Set local stored scores and users
        localStorage.setItem('highScoreArray', JSON.stringify(highScoreArray));
        localStorage.setItem('usersArray', JSON.stringify(userArray));

        gameArea.innerHTML = "NEW HIGH SCORE!<br>" + "ADD YOUR NAME!" + "<form><input type='text' id='highScoreName' onkeydown='return' (event.keyCode!=13);'></form><br>" + "<button id='addName'>Add Name</button>";
        writeNewHighScoreName();
        resetNumbers();
    } else if (collectiveScore > highScoreArray[1]) {

        // alert("new high score");

        highScoreArray[2] = highScoreArray[1];
        highScoreArray[1] = collectiveScore;

        userArray[2] = userArray[1];
        userArray[1] = "Second Place";

        console.log(collectiveScore);
        console.log(highScoreArray);

        localStorage.setItem('highScoreArray', JSON.stringify(highScoreArray));
        localStorage.setItem('usersArray', JSON.stringify(userArray));

        gameArea.innerHTML = "NEW HIGH SCORE!<br>" + "ADD YOUR NAME!" + "<form><input type='text' id='highScoreName' onkeydown='return' (event.keyCode!=13);'></form><br>" + "<button id='addName'>Add Name</button>";
        writeNewHighScoreName();

        score = 0;
    } else if (collectiveScore > highScoreArray[2]) {

        // alert("new high score");
        highScoreArray.pop();
        highScoreArray[2] = collectiveScore;


        userArray.pop();
        userArray[2] = "Third Place";

        console.log(collectiveScore);
        console.log(highScoreArray);

        localStorage.setItem('highScoreArray', JSON.stringify(highScoreArray));
        localStorage.setItem('usersArray', JSON.stringify(userArray));

        gameArea.innerHTML = "NEW HIGH SCORE!<br>" + "ADD YOUR NAME!" + "<form><input type='text' id='highScoreName' onkeydown='return' (event.keyCode!=13);'></form><br>" + "<button id='addName'>Add Name</button>";
        writeNewHighScoreName();
        resetNumbers();
    } else {
        backtoStart();
    }
}

function writeNewHighScoreName() {
    var highScoreInput = document.getElementById("highScoreName");
    highScoreInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {

            event.preventDefault();
            return false;
        }
    });

    addName.addEventListener("click", function () {
        var newName = document.getElementById("highScoreName").value;
        console.log(newName);
        var addName = document.getElementById("addName");

        if (userArray[0] == "First Place") {
            userArray[0] = newName;
        } else if (userArray[0] == "Second Place") {
            userArray[1] = newName;
        } else {
            userArray[2] = newName;
        }
        localStorage.setItem('usersArray', JSON.stringify(userArray));
        // Cancel the default action, if needed
        // event.preventDefault();
        // Trigger the button element with a click

        writeHighScores();
    });

}







