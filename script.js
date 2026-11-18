const questions = [
  {category:"WEB BASICS",question:"Which language is used to structure the content of a web page?",options:["Python","HTML","Java","C++"],answer:1,explanation:"HTML (HyperText Markup Language) defines the structure and content of web pages."},
  {category:"PROGRAMMING",question:"Which company originally developed the Java programming language?",options:["Microsoft","Google","Sun Microsystems","Apple"],answer:2,explanation:"Java was created at Sun Microsystems and first released in 1995."},
  {category:"COMPUTER FUNDAMENTALS",question:"What does CPU stand for?",options:["Central Processing Unit","Computer Personal Unit","Central Program Utility","Control Processing User"],answer:0,explanation:"The CPU, or Central Processing Unit, executes instructions and processes data."},
  {category:"DATA STRUCTURES",question:"Which data structure follows the FIFO principle?",options:["Stack","Queue","Tree","Graph"],answer:1,explanation:"A queue follows First In, First Out: the earliest inserted item is removed first."},
  {category:"JAVA",question:"Which symbol begins a single-line comment in Java?",options:["<!--"," # ","//","**"],answer:2,explanation:"In Java, // starts a single-line comment. /* ... */ is used for block comments."},
  {category:"DATABASES",question:"Which of these is a relational database management system?",options:["MySQL","HTML","CSS","Photoshop"],answer:0,explanation:"MySQL is a relational database management system (RDBMS) that stores data in tables."},
  {category:"COMPUTER FUNDAMENTALS",question:"What is the full form of RAM?",options:["Read Access Memory","Random Access Memory","Run Access Module","Read Active Module"],answer:1,explanation:"RAM stands for Random Access Memory, the computer's short-term working memory."},
  {category:"WEB DESIGN",question:"Which CSS property changes the text color of an element?",options:["background","font-size","color","border"],answer:2,explanation:"The CSS color property sets the foreground color of an element's text."},
  {category:"JAVA",question:"Which Java loop checks its condition after executing the loop body?",options:["for","while","do-while","enhanced for"],answer:2,explanation:"A do-while loop checks its condition after the body, so it runs at least once."},
  {category:"OPERATING SYSTEMS",question:"Which of the following is an operating system?",options:["Linux","MySQL","JavaScript","HTML"],answer:0,explanation:"Linux is an open-source operating system kernel used in many distributions."}
];

let current = 0;
let score = 0;
let locked = false;

const $ = id => document.getElementById(id);
const intro = $("intro"), quiz = $("quiz"), results = $("results");

$("start-btn").addEventListener("click", () => {
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  renderQuestion();
});

function renderQuestion() {
  locked = false;
  const item = questions[current];
  $("question-count").textContent = `QUESTION ${String(current + 1).padStart(2,"0")} / ${questions.length}`;
  $("progress-percent").textContent = `${Math.round((current + 1) / questions.length * 100)}%`;
  $("progress-fill").style.width = `${(current + 1) / questions.length * 100}%`;
  $("score").textContent = score;
  $("category").textContent = item.category;
  $("question-text").textContent = item.question;
  $("answered-note").textContent = "Choose one answer to continue.";
  $("feedback").className = "feedback hidden";
  $("next-btn").disabled = true;
  $("next-btn").innerHTML = current === questions.length - 1 ? "View results <span>→</span>" : "Next question <span>→</span>";
  const answers = $("answers");
  answers.innerHTML = "";
  item.options.forEach((option,index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.innerHTML = `<span class="letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    answers.appendChild(button);
  });
}

function chooseAnswer(selected) {
  if (locked) return;
  locked = true;
  const item = questions[current];
  const buttons = [...$("answers").children];
  buttons.forEach(button => button.disabled = true);
  const feedback = $("feedback");
  if (selected === item.answer) {
    score++;
    buttons[selected].classList.add("correct");
    feedback.textContent = `That's right! ${item.explanation}`;
    feedback.className = "feedback good";
  } else {
    buttons[selected].classList.add("wrong");
    buttons[item.answer].classList.add("correct");
    feedback.textContent = `Not quite. ${item.explanation}`;
    feedback.className = "feedback bad";
  }
  $("score").textContent = score;
  $("answered-note").textContent = "Answer saved. Ready when you are.";
  $("next-btn").disabled = false;
}

$("next-btn").addEventListener("click", () => {
  if (!locked) return;
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quiz.classList.add("hidden");
  results.classList.remove("hidden");
  const percent = Math.round(score / questions.length * 100);
  $("final-score").textContent = score;
  $("correct-count").textContent = score;
  $("wrong-count").textContent = questions.length - score;
  $("percent-score").textContent = `${percent}%`;
  $("result-fill").style.width = `${percent}%`;
  if (score >= 8) {
    $("result-icon").textContent = "🏆";
    $("result-title").textContent = "Outstanding work!";
    $("result-copy").textContent = "You have a strong grasp of these fundamentals.";
  } else if (score >= 5) {
    $("result-icon").textContent = "🎉";
    $("result-title").textContent = "Good effort!";
    $("result-copy").textContent = "You're building a solid foundation. Keep going!";
  } else {
    $("result-icon").textContent = "🌱";
    $("result-title").textContent = "Keep learning!";
    $("result-copy").textContent = "Every attempt helps you improve. Give it another try!";
  }
}

$("restart-btn").addEventListener("click", () => {
  current = 0;
  score = 0;
  results.classList.add("hidden");
  quiz.classList.remove("hidden");
  renderQuestion();
});
