/* TODO
https://londonappbrewery.github.io/Simon-Game/
- initialize game (press a key to start)
- wait for game start (user key press)

- generate new step
- display it (button animation + sound)
- add to list

- wait for user click
- user click -> button animation + sound
- check if they got it correct

- if correct, then loop again
- if wrong, then show game over screen (red flash, press any key to restart)
*/

const COLORCHOICES = ["green", "red", "yellow", "blue"];

// DEFINE BUTTON ANIMATIONS + SOUND EFFECT

const GREENSOUND = new Audio("./sounds/green.mp3");
const REDSOUND = new Audio("./sounds/red.mp3");
const YELLOWSOUND = new Audio("./sounds/yellow.mp3");
const BLUESOUND = new Audio("./sounds/blue.mp3");
const WRONGSOUND = new Audio("./sounds/wrong.mp3");

function animateButton(btnColor) {

  // visual
  let btnID = `#${btnColor}`;
  $(btnID).addClass("pressed");
  setTimeout(function() {
    $(btnID).removeClass("pressed");
  }, 100);

  // audio
  switch(btnColor) {
    case "green":
      GREENSOUND.play();
      break;
    case "red":
      REDSOUND.play();
      break;
    case "yellow":
      YELLOWSOUND.play();
      break;
    case "blue":
      BLUESOUND.play();
      break;
  }
}

// --- game logic ---
// let computerSequence = [];
let computerSequence = [];
let playerSequence = [];

function newLevel() {
  // reset player sequence
  playerSequence = [];

  // choose a random color
  let index = Math.floor(Math.random()*4);
  let newStep = COLORCHOICES[index];

  // push color to computer sequence
  computerSequence.push(newStep);

  // display button press
  setTimeout(function() {
    animateButton(newStep);
  }, 1000);

  // update header
  $("#header").text(`Level ${computerSequence.length}`); 

}

function gameOver() {
  computerSequence = [];
  playerSequence = [];

  $("#header").text('Game over! Click anywhere to restart.');
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

// Game continues on each click
$(document).click(function(event) {
  let userClick = event.target.id;

  if (computerSequence.length == 0) { 
    // first click just changes screen, not a valid guess.
    newLevel();

  } else if (COLORCHOICES.includes(userClick)) {
    // all other clicks are valid guesses
    let color = userClick;

    // animate button click
    animateButton(color)
  
    // add button choice to player sequence
    playerSequence.push(color);
  
    // check choice against computer sequence

    let index = playerSequence.length - 1;
    if (playerSequence[index] !== computerSequence[index]) {
      // if they lost -- reset sequences + display game over screen
      gameOver();
    } else if (playerSequence.length == computerSequence.length) {
      // if they completed the level
      newLevel();
    } // if they survived for now, then nothing happens
  }
});

/*
// USER CLICK - animate, update array, check if lost
$(".btn").click(function(event) {
  let color = event.target.id;

  // animate player's button clicks
  animateButton(color)

  // add button choice to player sequence
  playerSequence.push(color);

  // check if choice is correct
  let index = playerSequence.length - 1;
  if (playerSequence[index] !== computerSequence[index]) {
    // lost
    console.log('lost');
    computerSequence = [];
    playerSequence = [];
  } else {
    newLevel();
  }
});
*/
/* 
$(document).click(function() { // Start Game On Click
  let computerSteps = [];
  let gameOver = false;

  for (let i = 0; i<10; i++) {   //while (!(gameOver)) { // TODO: change to a while loop later, actual game loop
    let step = newStep(computerSteps);
    $("#header").text(`Level ${computerSteps.length}`); 
    animateButton(step);
    
    // wait for button click
    let playerChoice = "";
    while (!(COLORCHOICES.includes(playerChoice))) {
      $(document).click(function(event) {
        playerChoice = event.target.id;
      });
    }

    // check if button clicked is correct
    if (playerChoice !== step && COLORCHOICES.includes(playerChoice)) {
      gameOver = true;
    } 




    // game over
    //   $("#header").text('Game over! Press any key to restart.');

  }
});
*/ 

// Game setup

// GAME LOGIC

/* start game
- click anywhere starts the loop below

/* game loop
- new step
- display level
- button trackers
- check user click
- correct = loop again
- wrong = show game over header + restart loop from 0
*/


