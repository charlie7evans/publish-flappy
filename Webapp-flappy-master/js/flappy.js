// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

  game.load.image("playerImg", "../assets/flappy-cropped.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock", "../assets/pipe_orange.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    game.stage.setBackgroundColor("#32CD32");
    labelScore = game.add.text(0, 0, score.toString());
    player = game.add.sprite(50, 50, "playerImg");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 400;
    game.add.text(50, 0, "Hello!", {font: "30px Comic Sans", fill: " #0000FF"});
    game.add.text(600, 0 , "Flappy Bird!", {font: "30px Comic Sans", fill: " #0000FF"});
    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(
     pipeInterval,
     generatePipe
    );

    // game.input
    //     .keyboard.addKey(Phaser.Keyboard.RIGHT)
    //     .onDown.add(moveRight);
    // game.input
    //     .keyboard.addKey(Phaser.Keyboard.LEFT)
    //     .onDown.add(moveLeft);
    // game.input
    //     .keyboard.addKey(Phaser.Keyboard.DOWN)
    //     .onDown.add(moveDown);
    // game.input
    //     .keyboard.addKey(Phaser.Keyboard.UP)
    //     .onDown.add(moveUp);
    generatePipe();
}
function generatePipe(){
  var gapStart = game.rnd.integerInRange (1,5)
  for(var count=0; count < 8; count = count + 1){
    if(count !=gapStart && count !=gapStart + 1){
      addPipeBlock(800, count *50);
    }
  }
  changeScore();
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade.overlap(
      player,
      pipes,
      gameOver);
}

function gameOver(){
 registerScore(score);
 score = 0;
 game.state.restart();
}

function addPipeBlock(x, y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);

  game.physics.arcade.enable(block);
  block.body.velocity.x = -200
}

function moveRight() {
  player.x = player.x + 50;
}
function moveLeft(){
  player.x = player.x - 50;
}
function moveDown(){
  player.y = player.y + 50;
}
function moveUp(){
  player.y = player.y - 50;
}
function spaceHandler() {
  changeScore();
  game.sound.play("score");
}

function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
}
function playerJump(){
  player.body.velocity.y = -200;
  game.sound.play("score");
}
