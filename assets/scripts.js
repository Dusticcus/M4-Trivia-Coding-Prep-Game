var timerNumber = 100000;
var newNumber;

var backgroundTimer = 2;
var backgroundTimerReduced = backgroundTimer;

var countdown = document.getElementById("countdown");
var gameArea = document.getElementById("gameArea");
var questionRightOrWrongArea = document.getElementById("questionRightOrWrong")


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

var theQuestion = 1;



// Start Game
var startGame = document.getElementById("startGame");
startGame.addEventListener("click", startGameEXE);

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
            questionRightOrWrongArea.innerHTML = "";
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
        questionRightOrWrongArea.insertAdjacentHTML('beforeend', "CORRECT!");

        // console.log(theQuestion);

        rightWrongBackgroundInterval();

    } else {
        // alert("BOOOOOOOOOOO");
        // console.log(typeof this.textContent);
        // theQuestion = question2;

        questionRightOrWrongArea.style.backgroundColor = "red";
        questionRightOrWrongArea.insertAdjacentHTML('beforeend', "Incorrect!");

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
        countdown.innerHTML = newNumber;
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









