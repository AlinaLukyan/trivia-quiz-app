
var total = 0;
var correct = 0;
var answer, guess = [];


$(document).ready(function () {
	getQuestion();

    $("#pool").on('click', 'li', function() {
        moveLetterTo($(this), "#board ul", true);

        if (isPoolEmpty()) {
            if (guess.join("") === answer.toUpperCase()) {
                alert("That's been correct!");
                correct += 1;
                getQuestion();
            } else {
                alert("Unfortunately, it's wrong.");
            }
        }
    });

    $("#board").on('click', 'li', function() {
        moveLetterTo($(this), "#pool ul", false);
    });
});

function getQuestion() {
    cleanBoard();
    return $.getJSON("http://jservice.io/api/random", response => loadQuestion(response[0]));
}

function loadQuestion(obj) {
    $("#question_id").text(obj.id);
    $("#category").text(obj.category.title);
    $("#question_text").text(obj.question);
    $("#total span").text(total);
    $("#correct span").text(correct);
    answer = obj.answer;
    composeCards(answer);
    console.log(answer);
}

function skipQuestion() {
    total += 1;
    getQuestion();
}

function composeCards(word) {
    shuffleLetters(word).forEach(letter =>
        $("#pool ul").append("<li class=\"letter z-depth-2\">" + letter.toUpperCase() + "</li>")
    );
}

function cleanBoard() {
    guess = [];
    $("#pool ul").html("");
    $("#board ul").html("");
}

function shuffleLetters(answer) {
    return answer.split("").sort(() => 0.5 - Math.random());
}

function isPoolEmpty() {
    return $("#pool ul").text() === "";
}

function moveLetterTo(letter, destination, pushCard) {
    $(destination).append("<li class=\"letter z-depth-2\">" + letter.text() + "</li>");
    letter.remove();

    pushCard ? guess.push(letter.text()) : guess[guess.indexOf(letter.text())] = "";
}