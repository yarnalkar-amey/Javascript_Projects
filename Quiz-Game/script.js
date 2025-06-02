const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

const questionElement = document.getElementById('quiz-question');
const options = [
  document.getElementById('option-1'),
  document.getElementById('option-2'),
  document.getElementById('option-3'),
  document.getElementById('option-4'),
];
const questionNumber = document.getElementById('question-number');
const totalQuestions = document.getElementById('total-question-count');
const scoreElement = document.getElementById('score');
const finalScore = document.getElementById('final-score');
const totalFinalCount = document.getElementById('total-final-count');
const progressBar = document.getElementById('progress-bar');

let currentQuestionIndex = 0;
let score = 0;

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Lisbon"],
    correct: 2
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "J.K. Rowling"],
    correct: 0
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "HTML stands for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "High Text Markup Language", "None of the above"],
    correct: 1
  }
];

totalQuestions.textContent = quizData.length;
totalFinalCount.textContent = quizData.length;

startButton.addEventListener('click', () => {
  startScreen.classList.remove('active');
  quizScreen.classList.add('active');
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
});

restartButton.addEventListener('click', () => {
  resultScreen.classList.remove('active');
  startScreen.classList.add('active');
});

function showQuestion() {
  resetOptions();
  const current = quizData[currentQuestionIndex];
  questionElement.textContent = current.question;
  questionNumber.textContent = currentQuestionIndex + 1;
  scoreElement.textContent = score;
  progressBar.style.width = `${((currentQuestionIndex) / quizData.length) * 100}%`;

  current.options.forEach((opt, idx) => {
    options[idx].textContent = opt;
    options[idx].onclick = () => checkAnswer(idx);
  });
}

function checkAnswer(selectedIndex) {
  const correctIndex = quizData[currentQuestionIndex].correct;

  options.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === correctIndex) {
      btn.classList.add('correct');
    } else if (idx === selectedIndex) {
      btn.classList.add('wrong');
    }
  });

  if (selectedIndex === correctIndex) score++;

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function resetOptions() {
  options.forEach((btn) => {
    btn.classList.remove('correct', 'wrong');
    btn.disabled = false;
  });
}

function showResult() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');
  finalScore.textContent = score;
  progressBar.style.width = '100%';

  const message = document.getElementById("result-message");
  if (score === quizData.length) {
    message.textContent = "Perfect score! You're a quiz master. 🧠";
  } else if (score >= quizData.length / 2) {
    message.textContent = "Nice effort! You did well. 👍";
  } else {
    message.textContent = "Keep trying! You can do better. 💪";
  }
}
