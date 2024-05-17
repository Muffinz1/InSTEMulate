let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let answerChosen = false;
let amount = 20;
let category = 31;
let difficulty = 'medium'; 
let questionType = 'multiple';
function updatelink() {
    link = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${questionType}`;
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
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = currentQuestion.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    const allOptions = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers];

    allOptions.sort(() => Math.random() - 0.5);

    allOptions.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', function() {
            if (!answerChosen) {
                answerChosen = true;
                if (option === currentQuestion.correctAnswer) {
                    score++;
                    this.classList.add('correct');
                    setTimeout(() => {
                        currentQuestionIndex++;
                        if (currentQuestionIndex < questions.length) {
                            displayQuestion();
                        } else {
                            showFinalScore();
                        }
                    }, 2000);
                } else {
                    this.classList.add('wrong');
                    const correctAnswerBox = document.createElement('div');
                    correctAnswerBox.textContent = `Correct answer: ${currentQuestion.correctAnswer}`;
                    correctAnswerBox.classList.add('correct-answer-box');
                    this.parentNode.insertBefore(correctAnswerBox, this.nextSibling);
                    setTimeout(() => {
                        currentQuestionIndex++;
                        if (currentQuestionIndex < questions.length) {
                            displayQuestion();
                        } else {
                            showFinalScore();
                        }
                    }, 2000);
                }
                updateScore();
                disableButtons();
            }
        });
        optionsContainer.appendChild(button);
    });
}

function disableButtons() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.disabled = true;
    });
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
