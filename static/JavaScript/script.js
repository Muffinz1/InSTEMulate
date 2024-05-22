/**
 * adjusting the global variables for the game
 * score: for score
 * currentQuestionIndex: for index
 * questions: array for carrying the questions fetched
 * answerChosen: a flag to indicate if the answer is chosen or not
 * category: questions category from api "if none then it's random category"
 * difficulty: questions difficulty
 * questionType : for whether it's true or false or choices
 */
let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let answerChosen = false;
let amount = 20;
let category;
let difficulty = 'medium'; 
let questionType = 'multiple';
// adjust the music volume
document.getElementById("game-audio").volume = 0.5;
// function to update the link for the api
function updatelink() {
    if (category){
    link = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${questionType}`;
    }
    else {
        link = "https://opentdb.com/api.php?amount=20";
    }
}
updatelink();
// function for score update
function updateScore() {
    document.getElementById('score').innerText = score;
}
// fetching the questions from the api then mapping them for better usable format
function fetchQuestions() {
    fetch(link)
        .then(response => response.json())
        .then(data => {
            questions = data.results.map(question => ({
                question: question.question,
                correctAnswer: question.correct_answer,
                incorrectAnswers: question.incorrect_answers
            }));
            displayQuestion();
        })
        .catch(error => console.error('Error fetching questions:', error));
}
// function for displaying the questions according to there index
function displayQuestion() {
    answerChosen = false;
    const currentQuestion = questions[currentQuestionIndex];
    
    displayQuestionText(currentQuestion.question);
    displayOptions(currentQuestion);
}
// displaying the questions text
function displayQuestionText(questionText) {
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = questionText;
}
// function to add the option answers in the container
function displayOptions(currentQuestion) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = ''; // Clear any existing options
// shuffling the options
    const allOptions = shuffleOptions([
        currentQuestion.correctAnswer, 
        ...currentQuestion.incorrectAnswers
    ]);

    allOptions.forEach(option => {
        const button = createOptionButton(option, currentQuestion);
        optionsContainer.appendChild(button);
    });
}
// the function that shuffles the option
function shuffleOptions(options) {
    return options.sort(() => Math.random() - 0.5);
}
// function to be adding the buttons
function createOptionButton(option, currentQuestion) {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option');
    button.addEventListener('click', () => handleOptionClick(option, currentQuestion, button));
    return button;
}
// function that handle the event of click
function handleOptionClick(option, currentQuestion, button) {
    if (!answerChosen) {
        answerChosen = true;
        if (option === currentQuestion.correctAnswer) {
            handleCorrectAnswer(button);
        } else {
            handleWrongAnswer(button, currentQuestion.correctAnswer);
        }
        updateScore();
        disableButtons();
        proceedToNextQuestion();
    }
}
// function that aligns a green effect to the button clicked if it has the correct answer
function handleCorrectAnswer(button) {
    score++;
    button.classList.add('correct');
}
// function that aligns a red effect to the button clicked if it has the wrong answer
function handleWrongAnswer(button, correctAnswer) {
    button.classList.add('wrong');
    showCorrectAnswer(correctAnswer, button);
}
// if the button clicked was wrong this function will show the correct answer beneath it
function showCorrectAnswer(correctAnswer, button) {
    const correctAnswerBox = document.createElement('div');
    correctAnswerBox.textContent = `Correct answer: ${correctAnswer}`;
    correctAnswerBox.classList.add('correct-answer-box');
    button.parentNode.insertBefore(correctAnswerBox, button.nextSibling);
}
// function to swap questions after the answer been chosen with a delay
function proceedToNextQuestion() {
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showFinalScore();
        }
    }, 2000);
}
// disabling buttons for better game experience when the answer was chosen
function disableButtons() {
    const buttons = document.querySelectorAll('.option');
    buttons.forEach(button => button.disabled = true);
}

// displaying the final score after last question
function showFinalScore() {
    document.getElementById('finalScore').innerText = `Final Score: ${score}`;
    setTimeout(() => {
        window.location.href = '/start'; 
    }, 2000);
}
// starting the fetch
fetchQuestions();
