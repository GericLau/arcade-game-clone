var wonTimes = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // declare initialize function
    this.initialize();
};

// define initialize function to set the default location and speed
Enemy.prototype.initialize = function() {
    // set x equal -101 so ememies begin off the screen
    this.x = -101;
    // use random to set which row the ememies show
    this.y = (Math.floor(Math.random() * 3) + 1) * 80 - 15;
    this.speed = (Math.floor(Math.random() * 3) + 1) * 80 + 15;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 606){
        this.x += this.speed * dt;
    } else {
        // use initialize function to set the ememies
        // to the left of the canvas
        this.initialize();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    // declare a initialize function
    this.initialize();
};

Player.prototype.initialize = function() {
    // define location variables x and y
    // set the default location
    this.x = 202;
    this.y = 405;
};

// Update the Player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    // relocate the player when reach the river
    if(this.y < 77) {
        wonTimes++;
        this.initialize();
        alert("You won!");
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if(wonTimes > 0){
        // erase the old record by fill white rectangle
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,150,30);
        // write the won times on the top
        ctx.font = "16px Comic Sans MS";
        ctx.fillStyle = "black";
        ctx.fillText("Game won: " + wonTimes, 0, 30);
    }
};

Player.prototype.handleInput = function(key) {
    // change the player location
    // player can't go off screen
    switch(key) {
        case "left":
            this.x -= (this.x >= 101 ? 101 : 0);
            break;
        case "up":
            this.y -= (this.y >= 72 ? 82 : 0);
            break;
        case "right":
            this.x += (this.x < 404 ? 101 : 0);
            break;
        case "down":
            this.y += (this.y <= 325 ? 82 : 0);
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; allEnemies.length < 3; i++){
    var bug = new Enemy();
    allEnemies.push(bug);
}

var player = new Player();

// Handle Collisions
function checkCollisions() {
    for(var j = 0; j < allEnemies.length; j++){
        // the location of player minus ememy location
        // when the collision happen the player on the default location
        if(Math.abs(player.x - allEnemies[j].x) < 80 && Math.abs(player.y - allEnemies[j].y) < 50){
            player.initialize();
        }
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
