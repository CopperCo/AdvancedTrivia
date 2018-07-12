var correctAns;
var incorrectAns;
var unanswered;
var timer = 10;
var timer2 = 3;
var interval;
var interval2;
var currentQuestion;

var quizQuestions = [
  {
    question: "Britney Spears first song was . . .",
    answers: {
      a: "Toxic",
      b: "Baby One More Time",
      c: "You Drive Me Crazy"
    },
    correctAnswer: "b",
    imagePath: "assets/images/britneyspears.jpg"
  },
  {
    question: 'Which basketball player was in "Space Jam?"',
    answers: {
      a: "Michael Jordan",
      b: "Scotty Pippen",
      c: "Dennis Rodman"
    },
    correctAnswer: "a",
    imagePath: "assets/images/SpaceJam.jpg"
  },
  {
    question: "Mr. Feeny was the teacher in which popular TV show?",
    answers: {
      a: "Ghost Writer",
      b: "Fresh Prince of Bel-Air",
      c: "Saved By The Bell",
      d: "Boy Meets World"
    },
    correctAnswer: "d",
    imagePath: "assets/images/BoyMeetsWorld.jpg"
  },
  {
    question: 'What was Tommys last name in "Rugrats?"',
    answers: {
      a: "Simpson",
      b: "Pickles",
      c: "Finster",
      d: "Jones"
    },
    correctAnswer: "b",
    imagePath: "assets/images/TommyPickles.png"
  },
  {
    question: 'Who wrote the book series "Goosebumps?"',
    answers: {
      a: "Dr. Seuss",
      b: "R.L. Stine",
      c: "Hayley K.",
      d: "Stevie Wonder"
    },
    correctAnswer: "b",
    imagePath: "assets/images/Goosebumps.jpg"
  },
  {
    question:
      "Which 90s TV show features characters with the name Tommy, Zack, Kimberly, Billy, and Trini?",
    answers: {
      a: "Ghost Writer",
      b: "The Mighty Morphin Power Rangers",
      c: "Saved By The Bell",
      d: "Boy Meets World"
    },
    correctAnswer: "b",
    imagePath: "assets/images/powerrangers.jpeg"
  },
  {
    question:
      "Which Pixar-Disney movie was the first feature-length animated film to be completely computer generated?",
    answers: {
      a: "A Bug's Life",
      b: "Finding Nemo",
      c: "Up",
      d: "Toy Story"
    },
    correctAnswer: "d",
    imagePath: "assets/images/ToyStory.jpg"
  },
  {
    question: "What was the top grossing movie of 1990?",
    answers: {
      a: "Home Alone",
      b: "Clueless",
      c: "Fight Club",
      d: "The Lion King"
    },
    correctAnswer: "a",
    imagePath: "assets/images/HomeAlone.jpg"
  },
  {
    question:
      "Popularized during the early 1990s, this game used milk cap discs made of cardboard and slammers?",
    answers: {
      a: "Bogs",
      b: "Mogs",
      c: "Pogs",
      d: "Zogs"
    },
    correctAnswer: "c",
    imagePath: "assets/images/Pogs.png"
  },
  {
    question:
      "What was the name of the handheld digital pet which was created in the 90s and started a craze among children?",
    answers: {
      a: "Happy Pet",
      b: "Digital Monster",
      c: "Pet Club",
      d: "Tamagotchi"
    },
    correctAnswer: "d",
    imagePath: "assets/images/Tamagotchi.png"
  }
];

function setupVar() {
  correctAns = 0;
  incorrectAns = 0;
  unanswered = 0;
  currentQuestion = 0;
}

function startGame() {
  setupQuestion(currentQuestion);
  $(".timer").show();
}

function testAnswer(q) {
  clearInterval(interval);
  $(".buttons").text("");
  if (q == "") {
    // timer ran out
    $(".question").html(
      "<h3> Whoops you ran out of time </h3>" +
        "<h4>The correct answer was: " +
        quizQuestions[currentQuestion].answers[
          quizQuestions[currentQuestion].correctAnswer
        ] +
        "</h4>" +
        "<img src=" +
        quizQuestions[currentQuestion].imagePath +
        ">"
    );
    unanswered++;
  } else if (q == quizQuestions[currentQuestion].correctAnswer) {
    // correct
    $(".question").html(
      "<h3> WOO HOO!! You're Correct </h3>" +
        "<img src=" +
        quizQuestions[currentQuestion].imagePath +
        ">"
    );
    correctAns++;
  } else {
    // nope
    $(".question").html(
      "<h3> Better luck on the next question! </h3>" +
        "<h4>The correct answer was: " +
        quizQuestions[currentQuestion].answers[
          quizQuestions[currentQuestion].correctAnswer
        ] +
        "</h4>" +
        "<img src=" +
        quizQuestions[currentQuestion].imagePath +
        ">"
    );
    incorrectAns++;
  }
  timer2 = 3;
  interval2 = setInterval(function() {
    timer2--;
    if (timer2 == 0) {
      currentQuestion++;
      clearInterval(interval2);
      setupQuestion();
    }
  }, 1000);
}

function setupQuestion() {
  timer = 10;
  if (currentQuestion < quizQuestions.length) {
    $(".timer").text("Seconds remaining: " + timer);
    $(".question").text(quizQuestions[currentQuestion].question);
    for (var key in quizQuestions[currentQuestion].answers) {
      $(".buttons").append(
        "<div><button class='quizOptions btn btn-outline-secondary' id='" +
          key +
          "'>" +
          quizQuestions[currentQuestion].answers[key] +
          "</button></div>"
      );
    }
    $(".quizOptions").on("click", function() {
      testAnswer(this.id);
    });
    interval = setInterval(function() {
      timer--;
      $(".timer").text("Seconds remaining: " + timer);
      if (timer === 0) {
        clearInterval(interval);
        testAnswer("");
      }
    }, 1000);
  } else {
    $(".timer").hide();
    $(".question").html(
      "<h3> Let's see how you did: </h3>" +
        "<p>Correct Answers: " +
        correctAns +
        "</p>" +
        "<p>Incorrect Answers: " +
        incorrectAns +
        "</p>" +
        "<p>Unanswered: " +
        unanswered +
        "</p>" +
        '<button class="playAgain btn btn-outline-dark"> Wanna Play Again</button>'
    );
  }
  $(".playAgain").on("click", function() {
    setupVar();
    startGame();
  });
}

$(document).ready(function() {
  $(".start").on("click", function() {
    setupVar();
    startGame();
    $(".start").hide();
  });
});
