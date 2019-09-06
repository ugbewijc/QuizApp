/*
  JS for Quiz App
  John Ugbewi
*/
let currentQuestionIndex = 0;
let validAnswer;
let scores = 0;

const questionNumElm = document.getElementById('question-number');
const questionElm = document.getElementById('question');
const buttonElm = document.getElementById('buttons');
const buttonChildren = document.getElementById('buttons').children;
const skipButton = document.getElementById('skip');
const scoresElm = document.getElementById('scores');
const resultElm = document.getElementById('result');

const optionsElm = document.querySelector('.options');
const optionsChildren = document.querySelector('.options').children;
const opt1Elm = document.getElementById('opt1');
const opt2Elm = document.getElementById('opt2');
const opt3Elm = document.getElementById('opt3');
const opt4Elm = document.getElementById('opt4');

const questionsArray = []; // Question Array

/* Array containing all Question */
const questionBank = [
  {
    ques: 'You work on a Javascript project. How do you prompt users with messages and at the same time requesting user inputs?',
    opt1: 'Alert()',
    opt2: 'Display()',
    opt3: 'Prompt()',
    opt4: 'Confirm()',
    correctAnswer: 'opt3'
  },
  {
    ques: 'Which of the following function of Array object reverses the order of the elements of an array?',
    opt1: 'reverse()',
    opt2: 'push()',
    opt3: 'reduceRight()',
    opt4: 'reduce()',
    correctAnswer: 'opt1'
  },
  {
    ques: 'What statement supplies the value of a function?',
    opt1: 'continue',
    opt2: 'return',
    opt3: 'cancel',
    opt4: 'valueOf',
    correctAnswer: 'opt2'
  },
  {
    ques: 'How do you find the number with the highest value of x and y?',
    opt1: 'Math.max(x, y)',
    opt2: 'top(x, y)',
    opt3: 'ceil(x, y)',
    opt4: 'Math.ceil(x, y)',
    correctAnswer: 'opt1'
  },
  {
    ques: 'Inside which HTML element do we put the JavaScript?',
    opt1: '<javascript>',
    opt2: '<js>',
    opt3: '<scripting>',
    opt4: '<script>',
    correctAnswer: 'opt4'
  },
  {
    ques: 'How does a FOR loop start?',
    opt1: 'for (i = 0; i <= 5)',
    opt2: 'for (i = 0; i <= 5; i++)',
    opt3: 'for i = 1 to 5',
    opt4: 'for (i <= 5; i++)',
    correctAnswer: 'opt2'
  },
  {
    ques: 'How do you create a function in JavaScript?',
    opt1: 'function = myFunction()',
    opt2: 'function: myFunction()',
    opt3: 'function myFunction()',
    opt4: 'function - myFunction()',
    correctAnswer: 'opt3'
  },
  {
    ques: 'How to write an IF statement in JavaScript?',
    opt1: 'if i = 5',
    opt2: 'if i == 5 then',
    opt3: 'if i = 5 then',
    opt4: 'if (i == 5)',
    correctAnswer: 'opt4'
  }
];

/* generate random numbers */
const getRandomInt = maxNumber => Math.floor(Math.random() * Math.floor(maxNumber));

/* remove duplicate index from array */
const removeDuplicatesFromArray = expectedArray => expectedArray.filter((v, i) => expectedArray.indexOf(v) === i);

/* fetch Question from the question bank to question array */
const fetchQuestions = () => {
  let tempQuestionArray = []; // hold questions index
  do {
    // get random value and push to question array
    tempQuestionArray.push(getRandomInt(questionBank.length));
    tempQuestionArray = removeDuplicatesFromArray(tempQuestionArray); // remove duplicate index
  } while (tempQuestionArray.length < 5);

  tempQuestionArray.forEach((item) => {
    // push questions from the question bank to question array
    // console.log(questionBank[item]);
    questionsArray.push(questionBank[item]);
  });
};

/* Display Questions */
const displayQuestions = () => {
  const {
    ques, opt1, opt2, opt3, opt4, correctAnswer
  } = questionsArray[currentQuestionIndex];
  questionNumElm.textContent = `question ${currentQuestionIndex + 1}`;
  questionElm.textContent = ques;
  opt1Elm.textContent = opt1;
  opt2Elm.textContent = opt2;
  opt3Elm.textContent = opt3;
  opt4Elm.textContent = opt4;
  validAnswer = correctAnswer;
};

/* Disable options buttons */
const disableButtons = () => {
  let counter = 0;
  do {
    // console.log(optionsChildren[counter]);
    optionsChildren[counter].disabled = true;
    counter += 1;
    // console.log(optionsChildren.length);
    // console.log(`disabled button ${counter}`);
  } while (counter < optionsChildren.length);
};

/* Enable Options Button */
const resetButtons = () => {
  let counter = 0;
  do {
    // optionsChildren[counter].removeAttribute('disabled ');
    optionsChildren[counter].disabled = false;
    // optionsChildren[counter].classList.remove('in-correct');
    optionsChildren[counter].removeAttribute('class');
    counter += 1;
  } while (counter < optionsChildren.length);
};
/* validate answer */
const validateAnswer = answer => (validAnswer === answer);

/* create border for correct/in-correct option */
const markOption = (field, isValid) => {
  if (isValid) {
    scores += 1;
    scoresElm.textContent = `${scores} / ${questionsArray.length}`;
    field.classList.add('correct');
  } else {
    field.classList.add('in-correct');
  }
};

/* Option Button Listener */
optionsElm.addEventListener('click', (event) => {
  disableButtons();
  if (event.target.tagName === 'BUTTON') {
    const validator = validateAnswer(event.target.id);
    markOption(event.target, validator);
  }
});

/* Listener for skip button */
skipButton.addEventListener('click', () => {
  if (currentQuestionIndex < 4) {
    currentQuestionIndex += 1;
    displayQuestions();
    resetButtons();
  } else {
    // skipButton.setAttribute('disabled', '');
    skipButton.disabled = true;
    resultElm.textContent = `You scored: ${scores} out of ${questionsArray.length}`;
  }
});

const startQuiz = () => {
  fetchQuestions();
  displayQuestions();
};

startQuiz();
