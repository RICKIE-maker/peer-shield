
// PEER SHIELD - Interactive Features

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const navigation = document.getElementById("navigation");

menuBtn.addEventListener("click", () => {
  navigation.classList.toggle("active");
});

// Close menu after selecting a link
document.querySelectorAll("#navigation a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("active");
  });
});

// Quiz questions
const questions = [
  {
    question: "Can peer pressure influence a person's decisions?",
    answers: ["Yes", "No"],
    correct: 0,
    explanation: "Correct! Peer pressure can influence behaviour and decisions."
  },
  {
    question: "Is nicotine addictive?",
    answers: ["Yes", "No"],
    correct: 0,
    explanation: "Correct! Nicotine is an addictive substance."
  },
  {
    question: "Is asking for help a sign of weakness?",
    answers: ["Yes", "No"],
    correct: 1,
    explanation: "Correct! Seeking help shows courage and self-awareness."
  },
  {
    question: "Can substance misuse affect mental health?",
    answers: ["Yes", "No"],
    correct: 0,
    explanation: "Correct! Substance misuse can affect mental wellbeing."
  },
  {
    question: "Is walking away from harmful pressure acceptable?",
    answers: ["Yes", "No"],
    correct: 0,
    explanation: "Correct! Protecting your wellbeing is important."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  const q = questions[currentQuestion];

  document.getElementById("question").textContent =
    `Question ${currentQuestion + 1}: ${q.question}`;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(index));
    answers.appendChild(button);
  });

  document.getElementById("feedback").textContent = "";
  document.getElementById("score").textContent =
    `Score: ${score}/${questions.length}`;

  answered = false;
}

function checkAnswer(choice) {
  if (answered) return;

  answered = true;

  const q = questions[currentQuestion];
  const correct = choice === q.correct;

  if (correct) score++;

  document.getElementById("feedback").textContent =
    (correct ? "✓ " : "✗ ") + q.explanation;

  document.querySelectorAll("#answers button").forEach(button => {
    button.disabled = true;
  });

  document.getElementById("score").textContent =
    `Score: ${score}/${questions.length}`;
}

function nextQuestion() {
  if (!answered) {
    document.getElementById("feedback").textContent =
      "Please answer the question first.";
    return;
  }

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    document.getElementById("question").textContent =
      "Quiz completed!";

    document.getElementById("answers").innerHTML = "";

    document.getElementById("feedback").textContent =
      `You scored ${score} out of ${questions.length}. ${
        score === questions.length
          ? "Excellent work!"
          : "Keep learning and try again!"
      }`;

    document.getElementById("score").textContent =
      "Thank you for participating!";

    const nextBtn = document.querySelector(
      "#quiz > button.btn"
    );

    nextBtn.textContent = "RESTART QUIZ";
    nextBtn.onclick = restartQuiz;
    return;
  }

  showQuestion();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;

  const nextBtn = document.querySelector(
    "#quiz > button.btn"
  );

  nextBtn.textContent = "NEXT QUESTION";
  nextBtn.onclick = nextQuestion;

  showQuestion();
}

// Help form - prototype demonstration only
document.getElementById("helpForm").addEventListener(
  "submit",
  function(event) {
    event.preventDefault();

    document.getElementById("formMessage").textContent =
      "Thank you for reaching out. This demonstration does not send or store your message. Please contact a trusted support service for real assistance.";

    this.reset();
  }
);

// Start quiz
showQuestion();
