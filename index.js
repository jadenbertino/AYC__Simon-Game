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

const STEPCHOICES = ["#green", "#red,", "#yellow", "#blue"];

// BUTTON ANIMATIONS + SOUND EFFECT

const GREENSOUND = new Audio("./sounds/green.mp3");
const REDSOUND = new Audio("./sounds/red.mp3");
const YELLOWSOUND = new Audio("./sounds/yellow.mp3");
const BLUESOUND = new Audio("./sounds/blue.mp3");
const WRONGSOUND = new Audio("./sounds/wrong.mp3");

function animateButton(btnID) {

  // visual
  $(btnID).addClass("pressed");

  // audio
  switch(btnID) {

    case "#green":
      GREENSOUND.play();
      break;
    case "#red":
      REDSOUND.play();
      break;
    case "#yellow":
      YELLOWSOUND.play();
      break;
    case "#blue":
      BLUESOUND.play();
      break;
  }

  // reset visual (after 100ms delay)
  setTimeout(function() {
    $(btnID).removeClass("pressed");
  }, 100);
}

$("#green").click(function() {
  animateButton("#green")
});
$("#red").click(function() {
  animateButton("#red")
});
$("#blue").click(function() {
  animateButton("#blue")
});
$("#yellow").click(function() {
  animateButton("#yellow")
});

// Header Display

function gameOver() {
  $("#header").text('Game over! Press any key to restart.');
}

function displayLevel() {
  let currentLevel = computerSteps.length + 1;
  $("#header").text(`Level ${currentLevel}`); 
}

// Start Game

$(document).click(newStep); // click anywhere to start
let computerSteps = [];

function newStep() {
  let index = Math.floor(Math.random()*4);
  let newStep = STEPCHOICES[index];
  computerSteps.push(newStep);
  return newStep;
}

