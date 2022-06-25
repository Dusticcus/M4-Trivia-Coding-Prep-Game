var timerNumber = 90;
var newNumber;
var countdown = document.getElementById("countdown");

var backgroundTimer = 2;
var backgroundTimerReduced = backgroundTimer;
var questionRightOrWrongArea = document.getElementById("questionRightOrWrong");

var score = 0;
var collectiveScore = score;
var score = document.getElementById("score");

var gameArea = document.getElementById("gameArea");


var theQuestion = 1;



// LOCAL STORAGE -------------------


if (localStorage.getItem("beenHereBefore") === null) {
    localStorage.setItem('beenHereBefore', 'yes');
    var genHighScores = ["Dusty : 50", "Rusty : 40", "Krusty : 30"];
    localStorage.setItem('highScoreArray', JSON.stringify(genHighScores));

}

if (localStorage.getItem("beenHereBefore")) {
    var highScoreArray = JSON.parse(localStorage.getItem('highScoreArray'));
}
// ---------------------------------------------




// QUESTIONS------------
var question1 = {
    question: "aaaaaaaaaaaaaaaaaaaaaa",
    answerOne: ["a", "b", "c", "d"],
    correctAnswer: "a"
}

var question2 = {
    question: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    answerOne: ["a", "b", "c", "d"],
    correctAnswer: "b"
}

var question3 = {
    question: "cccccccccccccccccccccccccc",
    answerOne: ["a", "b", "c", "d"],
    correctAnswer: "c"
}

var question4 = {
    question: "ddddddddddddddddddddddddddddd",
    answerOne: ["a", "b", "c", "d"],
    correctAnswer: "d"
}
// ---------------------

// Start Game
var startGame = document.getElementById("startGame");
startGame.addEventListener("click", startGameEXE);

// click event handler for high scores
function writeHighScores() {
    gameArea.innerHTML = '';
    console.log(highScoreArray);

    for (let i = 0; i < highScoreArray.length; i++) {

        gameArea.insertAdjacentHTML('beforeend', "<p>" + highScoreArray[i] + "</p>");
    }




    ;
    alert("game");
}
var viewHighScores = document.getElementById("viewHighScores");
viewHighScores.addEventListener("click", writeHighScores);

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

    // alert(checkSelection);

    const backgroundInterval = setInterval(rightWrongBackgroundInterval, 1000);
    function rightWrongBackgroundInterval() {
        backgroundTimerReduced--;
        if (backgroundTimerReduced == 0) {
            // alert("times up");
            stopBackgroundEffectTimer();

            gameArea.innerHTML = "";
            questionRightOrWrongArea.style.backgroundColor = "white"
            questionRightOrWrongArea.innerHTML = collectiveScore;;
            backgroundTimerReduced = 2;
            writeQuestions();
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
        timerNumber -= 10;
        collectiveScore -= 5;
        console.log("SCORE: " + collectiveScore);

        rightWrongBackgroundInterval();
    }

}

function startGameEXE() {
    // alert("start game");

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
        if (newNumber == 0) {
            console.log("NUMBER: " + timerNumber);
            stopTimer();
            countdown.innerHTML = 'Game Over, Man. Game Over.';
            gameArea.innerHTML = "Time is up!";
            gameArea.style.backgroundColor = "black"
        }
    }
    function stopTimer() {
        clearInterval(myInterval);
    }
    // End Timer Logic------------------------------
    ;
};









