
const questions = [
  {
    question: "Does peer pressure always have to be negative?",
    answer: false,
    explanation: "Peer pressure can be positive or negative. What matters is the influence."
  },
  {
    question: "Is asking for help a sign of weakness?",
    answer: false,
    explanation: "Asking for help is a sign of courage and self-awareness."
  },
  {
    question: "Can substance abuse affect school performance?",
    answer: true,
    explanation: "Yes. It can affect concentration, memory and learning."
  },
  {
    question: "Is it okay to say NO when friends pressure you?",
    answer: true,
    explanation: "Absolutely! You have the right to make your own decisions."
  },
  {
    question: "Can someone recover from substance addiction?",
    answer: true,
    explanation: "Yes. With appropriate treatment and support, recovery is possible."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  const question = questions[currentQuestion];

  document.getElementById("question").textContent =
    question.question;

  document.getElementById("feedback").textContent = "";

  answered = false;
}

function checkAnswer(choice) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];
  const feedback = document.getElementById("feedback");

  if (choice === question.answer) {
    score++;
    feedback.textContent = "Correct! " + question.explanation;
  } else {
    feedback.textContent = "Not quite. " + question.explanation;
  }

  if (currentQuestion < questions.length - 1) {
    feedback.textContent += " Tap Next Question to continue.";
  } else {
    feedback.textContent +=
      " Quiz complete! Your score: " + score + "/" +
      questions.length + ".";
  }

  updateNextButton();
}

function updateNextButton() {
  let button = document.getElementById("next-question");

  if (!button) {
    button = document.createElement("button");
    button.id = "next-question";
    button.textContent = "Next Question";
    button.onclick = nextQuestion;

    document.getElementById("quiz-container")
      .appendChild(button);
  }

  button.style.display = answered &&
    currentQuestion < questions.length - 1
    ? "inline-block" : "none";
}

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;
  showQuestion();
  updateNextButton();
}

showQuestion();
