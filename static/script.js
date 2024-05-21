let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let answerChosen = false;
let amount = 20;
let category;
let difficulty = 'medium'; 
let questionType = 'multiple';

document.getElementById("game-audio").volume = 0.5;
function updatelink() {
    if (category){
    link = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${questionType}`;
    }
    else {
        link = "https://opentdb.com/api.php?amount=20";
    }
}
updatelink();
function updateScore() {
    document.getElementById('score').innerText = score;
}

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

function displayQuestion() {
    answerChosen = false;
    const currentQuestion = questions[currentQuestionIndex];
    
    displayQuestionText(currentQuestion.question);
    displayOptions(currentQuestion);
}

function displayQuestionText(questionText) {
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = questionText;
}

function displayOptions(currentQuestion) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    const allOptions = shuffleOptions([
        currentQuestion.correctAnswer, 
        ...currentQuestion.incorrectAnswers
    ]);

    allOptions.forEach(option => {
        const button = createOptionButton(option, currentQuestion);
        optionsContainer.appendChild(button);
    });
}

function shuffleOptions(options) {
    return options.sort(() => Math.random() - 0.5);
}

function createOptionButton(option, currentQuestion) {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option');
    button.addEventListener('click', () => handleOptionClick(option, currentQuestion, button));
    return button;
}

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

function handleCorrectAnswer(button) {
    score++;
    button.classList.add('correct');
}

function handleWrongAnswer(button, correctAnswer) {
    button.classList.add('wrong');
    showCorrectAnswer(correctAnswer, button);
}

function showCorrectAnswer(correctAnswer, button) {
    const correctAnswerBox = document.createElement('div');
    correctAnswerBox.textContent = `Correct answer: ${correctAnswer}`;
    correctAnswerBox.classList.add('correct-answer-box');
    button.parentNode.insertBefore(correctAnswerBox, button.nextSibling);
}

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

function disableButtons() {
    const buttons = document.querySelectorAll('.option');
    buttons.forEach(button => button.disabled = true);
}


function showFinalScore() {
    alert(`Your final score is: ${score}`);
    document.getElementById('finalScore').innerText = `Final Score: ${score}`;
}
function showFinalScore() {
    document.getElementById('finalScore').innerText = `Final Score: ${score}`;
    setTimeout(() => {
        window.location.href = '/start'; 
    }, 2000);
}

fetchQuestions();
