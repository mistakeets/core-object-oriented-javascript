var Enemy = function() {
  this.sprite = 'images/enemy-bug.png'

  this.xRange = [-150, 600]
  this.potentialY = [60, 140, 220]
  this.speedRange = [150, 600]

  this.reset()
}

Enemy.prototype.reset = function() {
  var startPosition = this.xRange[0]
  this.x = startPosition
  this.y = this.getRandomY()
  this.speed = this.getRandomSpeed()
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {

  // Multiply any movement by the dt parameter
  // This will ensure the game runs at the same speed for
  // all computers.

  var maxPosition = this.xRange[1]
  this.x += this.speed * dt

  if (this.x > maxPosition) {
    this.reset()
  }
}

Enemy.prototype.getRandomY = function() {
  return this.potentialY[Math.floor(Math.random() * this.potentialY.length)]
}

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Enemy.prototype.getRandomSpeed = function() {
  var minSpeed = this.speedRange[0]
  var maxSpeed = this.speedRange[1]

  return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed
}

var Player = function() {
  this.sprite = 'images/char-boy.png'

  this.xRange = [-2, 402]
  this.yRange = [-20, 380]
  this.reset()

}

Player.prototype.update = function(dt) {
  this.checkCollisions()
}

Player.prototype.checkCollisions = function() {
  if (this.y == -20) {
    this.reset()
  } else if (this.y >= 60 && this.y <= 220) {
    var self = this
    allEnemies.forEach(function(enemy) {
      if (enemy.y == self.y) {
        if (enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
          self.reset()
        }
      }
    })
  }
}

Player.prototype.reset = function() {
  this.x = 200
  this.y = 380
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
}

Player.prototype.handleInput = function(keyPress) {
  if (keyPress === 'left') {
    this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
  } else if (keyPress === 'right') {
    this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
  } else if (keyPress === 'up') {
    this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
  } else if (keyPress === 'down') {
    this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
  }
}

var allEnemies = []
for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy())
}

var player = new Player()

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  }

  player.handleInput(allowedKeys[e.keyCode])
})