var timerNumber = 5;
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
    question: "What gives you the right?",
    answerOne: ["a", "b", "c", "d"],
    correctAnswer: "b"
}

var question3 = {
    question: "How dare you?",
    answerOne: ["a", "b", "c", "d"],
    correctAnswer: "c"
}

var question4 = {
    question: "Do you have a passion for HR?",
    answerOne: ["a", "b", "c", "d"],
    correctAnswer: "d"
}
// ---------------------

// Go back to landing page
function backtoStart() {
    timerNumber = 0;
    score = 0;
    questionRightOrWrongArea.innerHTML = "";
    gameArea.innerHTML = "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit.<br>Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p><br><button id='startGame1'>Start Game</button>";
    var startGame1 = document.getElementById("startGame1");
    startGame1.addEventListener("click", startGameEXE);
}

// click event handler for high scores
function writeHighScores() {
    gameArea.innerHTML = '';
    timerNumber = 30;
    theQuestion = 1;
    score = 0;
    // highScoreArray = highScoreArray.sort();
    console.log(highScoreArray);
    for (let i = 0; i < highScoreArray.length; i++) {

        gameArea.insertAdjacentHTML('beforeend', "<p>" + highScoreArray[i] + ": " + userArray[i] + "</p>");
        questionRightOrWrong.innerHTML = '<button id="goBack">Go Back</button>';
        var goBack = document.getElementById("goBack");
        goBack.addEventListener("click", backtoStart);
    };
    // alert("game");
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

            questionRightOrWrongArea.style.backgroundColor = "white"
            questionRightOrWrongArea.innerHTML = collectiveScore;;
            backgroundTimerReduced = 2;
            if (newNumber > 0) {
                writeQuestions();
            } else {

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
        timerNumber += 5;
        collectiveScore += 10;
        rightWrongBackgroundInterval();

    } else {
        // alert("BOOOOOOOOOOO");
        // console.log(typeof this.textContent);
        // theQuestion = question2;

        questionRightOrWrongArea.style.backgroundColor = "red";
        timerNumber -= 20;
        collectiveScore -= 5;
        console.log("SCORE: " + collectiveScore);

        rightWrongBackgroundInterval();
    }

}

function startGameEXE() {
    // alert("start game");

    // RESETS
    timerNumber = 90;

    // Clear gameArea and push first question to DOM
    writeQuestions();

    const myInterval = setInterval(intervalQuestionTimer, 1000);

    // Timer Logic ---------------------------------
    function intervalQuestionTimer() {

        timerNumber--;
        newNumber = timerNumber;
        console.log(timerNumber);
        console.log(newNumber);
        // ✅ Change (replace) the text of the element
        countdown.innerHTML = "Time|" + newNumber;
        if (newNumber < 0) {
            console.log("NUMBER: " + timerNumber);
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

        gameArea.innerHTML = "NEW HIGH SCORE!<br>" + "ADD YOUR NAME!" + "<form><input id='highScoreName'></form><br>" + "<button id='addName'>Add Name</button>";
        writeNewHighScoreName();

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

        gameArea.innerHTML = "NEW HIGH SCORE!<br>" + "ADD YOUR NAME!" + "<form><input id='highScoreName'></form><br>" + "<button id='addName'>Add Name</button>";
        writeNewHighScoreName();


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

        gameArea.innerHTML = "NEW HIGH SCORE!<br>" + "ADD YOUR NAME!" + "<form><input id='highScoreName'></form><br>" + "<button id='addName'>Add Name</button>";
        writeNewHighScoreName();


    } else {
        backtoStart();

    }
}

function writeNewHighScoreName() {

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






